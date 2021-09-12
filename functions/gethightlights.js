import { fetch } from 'isomorphic-fetch';

const cache = {
  lastFetch: 0,
  hightlights: [],
  id: '',
};

const slimUpHightlights = (response) => ({
  username: response.data.reels_media[0].owner.username,
  hightlightId: response.data.reels_media[0].id,
  items: response.data.reels_media[0].items.map((item) =>
    item.is_video
      ? {
          thumbnail: item.display_resources[0].src,
          isVideo: item.is_video,
          video: item.video_resources[0].src,
        }
      : {
          thumbnail: item.display_resources[0].src,
          isVideo: item.is_video,
          image: item.display_url,
        },
  ),
});

async function getHightlights(hightlightId) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && hightlightId === cache.id) {
    return cache.hightlights;
  }

  const data = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":[],"highlight_reel_ids":[${hightlightId}],"precomposed_overlay":false}`,
    {
      headers: {
        cookie: `sessionid=${process.env.INSTAGRAM_COOKIE}`,
      },
    },
  ).then((response) => response.json());

  const hightlights = slimUpHightlights(data);
  cache.lastFetch = Date.now();
  cache.hightlights = hightlights;
  return cache.hightlights;
}

exports.handler = async (event, context, callback) => {
  const hightlights = await getHightlights(
    event.queryStringParameters.hightlight,
  );
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hightlights),
  });
};
