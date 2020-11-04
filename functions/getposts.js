/* eslint-disable no-undef */
require('isomorphic-fetch');

const cache = {
  lastFetch: 0,
  posts: [],
};

const slimUpPosts = (response) => {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge) =>
    edge.node.edge_sidecar_to_children
      ? {
          thumbnail: edge.node.thumbnail_src,
          isVideo: edge.node.is_video,
          video: edge.node.video_url,
          image: edge.node.display_url,
          postUrl: `https://instagram.com/p/${edge.node.shortcode}`,
          postId: edge.node.id,
          postShortcode: edge.node.shortcode,

          sideImages: edge.node.edge_sidecar_to_children.edges.map((edged) => ({
            thumbnail: edged.node.display_resources[0].src,
            isVideo: edged.node.is_video,
            video: edged.node.video_url,
            image: edged.node.display_url,
          })),
        }
      : {
          thumbnail: edge.node.thumbnail_src,
          isVideo: edge.node.is_video,
          video: edge.node.video_url,
          image: edge.node.display_url,
          postUrl: `https://instagram.com/p/${edge.node.shortcode}`,
          postId: edge.node.id,
          postShortcode: edge.node.shortcode,
        },
  );
};

async function getPosts(username) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000) {
    return cache.posts;
  }

  const user = await fetch(`https://instagram.com/${username}/?__a=1`, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
      Accept: 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());

  const userId = user.graphql.user.id;

  const data = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":${userId},"first":50}`,
  ).then((response) => response.json());

  const posts = slimUpPosts(data);
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return cache.posts;
}

exports.handler = async (event, context, callback) => {
  const posts = await getPosts(event.queryStringParameters.user);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  });
};
