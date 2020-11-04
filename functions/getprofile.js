/* eslint-disable no-undef */
require('isomorphic-fetch');

const cache = {
  lastFetch: 0,
  profile: [],
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

async function getProfile(username) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000) {
    return cache.profile;
  }

  const data = await fetch(`https://instagram.com/${username}/?__a=1`, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
      Accept: 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());

  const profile = slimUpProfile(data);
  cache.lastFetch = Date.now();
  cache.profile = profile;
  return cache.profile;
}

exports.handler = async (event, context, callback) => {
  const profile = await getProfile(event.queryStringParameters.user);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
};
