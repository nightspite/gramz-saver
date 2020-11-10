/* eslint-disable no-undef */
require('isomorphic-fetch');

const cache = {
  lastFetch: 0,
  stories: [],
  id: '',
};

const slimUpStories = (response) => {
  return {
    highlights: response.data.user.edge_highlight_reels.edges.map((edge) => ({
      hightlightId: edge.node.id,
      thumbnail: edge.node.cover_media_cropped_thumbnail.url,
      title: edge.node.title,
    })),
  };
};

async function getStories(userId) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && userId === cache.id) {
    return cache.stories;
  }

  const data = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=aec5501414615eca36a9acf075655b1e&variables={"user_id": "953293389","include_highlight_reels": true, "first":50}`,
    {
      headers: {
        cookie: `sessionid=${process.env.INSTAGRAM_COOKIE}`,
      },
    },
  ).then((response) => response.json());

  const stories = slimUpStories(data);
  cache.lastFetch = Date.now();
  cache.stories = stories;
  return cache.stories;
}

exports.handler = async (event, context, callback) => {
  const stories = await getStories(event.queryStringParameters.user);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stories),
  });
};
