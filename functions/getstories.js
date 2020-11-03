/* eslint-disable no-undef */
require('isomorphic-fetch');

const url = `https://www.instagram.com/p/CHAZ26ihoyP/?__a=1`;

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
      video: item.video_resources.pop(),
    })),
  };
};

async function getStories() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }
  const data = await fetch(url).then((res) => res.json());
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
