import { fetch } from 'isomorphic-fetch';

const cache = {
  lastFetch: 0,
  profile: [],
  username: '',
};

const slimUpProfile = (response) => ({
  userId: response.graphql.user.id,
  fullName: response.graphql.user.full_name,
  username: response.graphql.user.username,
  name: response.graphql.user.full_name,
  bio: response.graphql.user.biography,
  thumbnail: response.graphql.user.profile_pic_url,
  image: response.graphql.user.profile_pic_url_hd,
  following: response.graphql.user.edge_follow.count,
  followers: response.graphql.user.edge_followed_by.count,
  highlights: response.graphql.user.highlight_reel_count,
  externalUrl: response.graphql.user.external_url,
  isPrivate: response.graphql.user.id_private,
  numberOfPosts: response.graphql.user.edge_owner_to_timeline_media.count,
});

async function getProfile(username) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && username === cache.username) {
    return cache.profile;
  }

  const data = await fetch(
    `https://instagram.com/${username}/?__a=1`,
  ).then((response) => response.json());

  const profile = slimUpProfile(data);
  cache.lastFetch = Date.now();
  cache.profile = profile;
  return cache.profile;
}

exports.handler = async (event, context, callback) => {
  const profile = await getProfile(event.queryStringParameters.username);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
};
