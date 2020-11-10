/* eslint-disable no-undef */
require('isomorphic-fetch');

const cache = {
  lastFetch: 0,
  stories: [],
  id: '',
};

const slimUpStories = (response) => {
  return {
    hightlightId: response.data.reels_media[0].id,
    hightlights: response.data.reels_media[0].items.map((item) =>
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
  };
};

async function getStories(hightlightId) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && hightlightId === cache.id) {
    return cache.stories;
  }

  const data = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":[],"highlight_reel_ids":[17878410298609593],"precomposed_overlay":false}`,
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
