const slimUpStories = (response) => {
  return response.data.reels_media[0].items.map((item) => ({
    storyId: item.id,
    thumbnail: item.display_resources[0].src,
    isVideo: item.is_video,
    image: item.display_url,
    video: item.video_resources.pop(),
  }));
};

export default slimUpStories;
