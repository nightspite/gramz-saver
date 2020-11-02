const slimUpPost = (response) => {
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

export default slimUpPost;
