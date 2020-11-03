/* eslint-disable no-undef */
require('isomorphic-fetch');

const url = `https://www.instagram.com/nightspite/?__a=1`;

const cache = {
  lastFetch: 0,
  posts: [],
};

const slimUpProfile = (response) => {
  return {
    userId: response.graphql.user.id,
    username: response.graphql.user.username,
    name: response.graphql.user.full_name,
    bio: response.graphql.user.biography,
    thumbnail: response.graphql.user.profile_pic_url,
    image: response.graphql.user.profile_pic_url_hd,
    following: response.graphql.user.edge_follow.count,
    followers: response.graphql.user.edge_followed_by.count,
  };
};

async function getPosts() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }
  const data = await fetch(url).then((res) => res.json());
  const posts = slimUpProfile(data);
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return posts;
}
exports.handler = async (event, context, callback) => {
  const posts = await getPosts();
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  });
};
