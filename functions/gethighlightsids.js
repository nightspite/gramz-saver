require('isomorphic-fetch');

const cache = {
  lastFetch: 0,
  highlights: [],
  id: '',
};

const slimUpHighlightsIds = (response) => ({
  items: response.data.user.edge_highlight_reels.edges.map((edge) => ({
    hightlightId: edge.node.id,
    thumbnail: edge.node.cover_media_cropped_thumbnail.url,
    title: edge.node.title,
  })),
});

async function getHighlightsIds(userId, number) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && userId === cache.id) {
    return cache.hightlights;
  }

  const data = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=aec5501414615eca36a9acf075655b1e&variables={"user_id": ${userId},"include_highlight_reels": true, "first":${number}}`,
    {
      headers: {
        cookie: `sessionid=${process.env.INSTAGRAM_COOKIE}`,
      },
    },
  ).then((response) => response.json());

  const highlights = slimUpHighlightsIds(data);
  cache.lastFetch = Date.now();
  cache.highlights = highlights;
  return cache.highlights;
}

exports.handler = async (event, context, callback) => {
  const highlights = await getHighlightsIds(
    event.queryStringParameters.user,
    event.queryStringParameters.number,
  );
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(highlights),
  });
};
