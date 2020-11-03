/* eslint-disable no-undef */
require('isomorphic-fetch');

const url = `https://www.instagram.com/p/CHAZ26ihoyP/?__a=1`;

const cache = {
  lastFetch: 0,
  posts: [],
};

const slimUpPost = (response) => {
  return response.graphql.shortcode_media.edge_sidecar_to_children
    ? {
        postUrl: `https://instagram.com/p/${response.graphql.shortcode_media.shortcode}`,
        postId: response.graphql.shortcode_media.id,
        postShortcode: response.graphql.shortcode_media.shortcode,

        sideImages: response.graphql.shortcode_media.edge_sidecar_to_children.edges.map(
          (edge) => ({
            thumbnail: edge.node.display_resources[0].src,
            isVideo: edge.node.is_video,
            video: edge.node.video_url,
            image: edge.node.display_url,
          }),
        ),
      }
    : {
        thumbnail: response.graphql.shortcode_media.display_resources[0].src,
        isVideo: response.graphql.shortcode_media.is_video,
        video: response.graphql.shortcode_media.video_url,
        image: response.graphql.shortcode_media.display_url,
        postUrl: `https://instagram.com/p/${response.graphql.shortcode_media.shortcode}`,
        postId: response.graphql.shortcode_media.id,
        postShortcode: response.graphql.shortcode_media.shortcode,
      };
};

async function getPost() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }
  const data = await fetch(url).then((res) => res.json());
  const posts = slimUpPost(data);
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return posts;
}
exports.handler = async (event, context, callback) => {
  const posts = await getPost();
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  });
};
