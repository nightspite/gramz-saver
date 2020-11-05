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

export default slimUpPost;
