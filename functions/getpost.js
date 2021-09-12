import { fetch } from 'isomorphic-fetch';

const cache = {
  lastFetch: 0,
  post: [],
  shortcode: '',
};

const slimUpPost = (response) =>
  response.graphql.shortcode_media.edge_sidecar_to_children
    ? {
        postUrl: `https://instagram.com/p/${response.graphql.shortcode_media.shortcode}`,
        postId: response.graphql.shortcode_media.id,
        postShortcode: response.graphql.shortcode_media.shortcode,

        sideImages: response.graphql.shortcode_media.edge_sidecar_to_children.edges.map(
          (edge) => ({
            thumbnail: edge.node.display_resources[0].src,
            width: edge.node.display_resources[0].config_width,
            height: edge.node.display_resources[0].config_height,
            isVideo: edge.node.is_video,
            video: edge.node.video_url,
            image: edge.node.display_url,
          }),
        ),
      }
    : {
        thumbnail: response.graphql.shortcode_media.display_resources[0].src,
        width:
          response.graphql.shortcode_media.display_resources[0].config_width,
        height:
          response.graphql.shortcode_media.display_resources[0].config_height,
        isVideo: response.graphql.shortcode_media.is_video,
        video: response.graphql.shortcode_media.video_url,
        image: response.graphql.shortcode_media.display_url,
        postUrl: `https://instagram.com/p/${response.graphql.shortcode_media.shortcode}`,
        postId: response.graphql.shortcode_media.id,
        postShortcode: response.graphql.shortcode_media.shortcode,
      };

async function getPost(shortcode) {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000 && shortcode === cache.shortcode) {
    return cache.post;
  }

  const data = await fetch(
    `https://instagram.com/p/${shortcode}/?__a=1`,
  ).then((response) => response.json());

  const post = slimUpPost(data);
  cache.lastFetch = Date.now();
  cache.post = post;
  return cache.post;
}

exports.handler = async (event, context, callback) => {
  const post = await getPost(event.queryStringParameters.shortcode);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
};
