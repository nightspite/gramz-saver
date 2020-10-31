/* eslint-disable no-undef */
require('isomorphic-fetch');

const url = `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":"528817151","first":50}`;

const cache = {
  lastFetch: 0,
  posts: [],
};

function slimUpPosts(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge) =>
    edge.node.edge_sidecar_to_children
      ? {
          image: edge.node.display_url,
          thumbnail: edge.node.thumbnail_src,
          isVideo: edge.node.is_video,
          video: edge.node.video_url,
          url: `https://instagram.com/p/${edge.node.shortcode}`,
          id: edge.node.id,

          sideImages: edge.node.edge_sidecar_to_children.edges.map((edged) => ({
            image: edged.node.display_url,
            thumbnail: edge.node.thumbnail_src,
            isVideo: edged.node.is_video,
          })),
        }
      : {
          image: edge.node.display_url,
          thumbnail: edge.node.thumbnail_src,
          isVideo: edge.node.is_video,
          video: edge.node.video_url,
          url: `https://instagram.com/p/${edge.node.shortcode}`,
          id: edge.node.id,
        },
  );
}

async function getPosts() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }
  const data = await fetch(url).then((res) => res.json());
  const posts = slimUpPosts(data);

  cache.lastFetch = Date.now();
  cache.posts = posts;
  return posts;
}

exports.handler = async (event, context, callback) => {
  const posts = await getPosts();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(posts),
  });
};
