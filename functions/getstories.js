require('isomorphic-fetch');

const cache = {
  lastFetch: 0,
  stories: [],
  userId: '',
};

const slimUpStories = (response) => ({
  userId: response.data.reels_media[0].user.id,
  profilePic: response.data.reels_media[0].user.profile_pic_url,
  username: response.data.reels_media[0].user.username,
  items: response.data.reels_media[0].items.map((item) =>
    item.is_video
      ? {
          storyId: item.id,
          thumbnail: item.display_resources[0].src,
          isVideo: item.is_video,
          video: item.video_resources[0].src,
        }
      : {
          storyId: item.id,
          thumbnail: item.display_resources[0].src,
          isVideo: item.is_video,
          image: item.display_url,
        },
  ),
});

async function getStories(userId) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && userId === cache.userId) {
    return cache.stories;
  }

  const data = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":[${userId}],"highlight_reel_ids":[],"precomposed_overlay":false}`,
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
  const stories = await getStories(event.queryStringParameters.userId);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stories),
  });
};
