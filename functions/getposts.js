import { fetch } from 'isomorphic-fetch';

const cache = {
  lastFetch: 0,
  posts: [],
  id: '',
};

const slimUpPosts = (response) =>
  response.data.user.edge_owner_to_timeline_media.edges.map((edge) =>
    edge.node.edge_sidecar_to_children
      ? {
          thumbnail: edge.node.thumbnail_src,
          postId: edge.node.id,
          postShortcode: edge.node.shortcode,
          sideImages: true,
        }
      : {
          thumbnail: edge.node.thumbnail_src,
          postId: edge.node.id,
          postShortcode: edge.node.shortcode,
          sideImages: false,
        },
  );

async function getPosts(userId) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && userId === cache.id) {
    return cache.posts;
  }

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
