/* eslint-disable no-undef */
require('isomorphic-fetch');

const url = `https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":["953293389"],"highlight_reel_ids":[],"precomposed_overlay":false}`;

const cache = {
  lastFetch: 0,
  stories: [],
};

function slimUpStories(response) {
  return response;
}

async function getStories() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.stories;
  }
  const data = await fetch(url, {
    credentials: 'include',
  }).then((res) => res.json());
  const stories = slimUpStories(data);

  cache.lastFetch = Date.now();
  cache.stories = stories;
  return stories;
}

exports.handler = async (event, context, callback) => {
  const stories = await getStories();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(stories),
  });
};
