/* eslint-disable no-undef */
require('isomorphic-fetch');

const url = `https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":[1823164043],"highlight_reel_ids":[],"precomposed_overlay":false}`;

const cache = {
  lastFetch: 0,
  posts: [],
};

const slimUpStories = (response) => {
  return {
    userId: response.data.reels_media[0].user.id,
    profilePic: response.data.reels_media[0].user.profile_pic_url,
    username: response.data.reels_media[0].user.username,
    items: response.data.reels_media[0].items.map((item) => ({
      storyId: item.id,
      thumbnail: item.display_resources[0].src,
      isVideo: item.is_video,
      image: item.display_url,
      video: item.video_resources[item.video_resources.length - 1].src, // problem here
    })),
  };
  // return response;
};

async function getStories() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }

  const data = await fetch(url, {
    headers: {
      cookie: `sessionid=${process.env.INSTAGRAM_COOKIE}`,
    },
  }).then((res) => res.json());
  const posts = slimUpStories(data);
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return posts;
}
exports.handler = async (event, context, callback) => {
  const posts = await getStories();
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  });
};
