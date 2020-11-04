const slimUpStories = (response) => {
  // return {
  //   userId: response.data.reels_media[0].user.id,
  //   profilePic: response.data.reels_media[0].user.profile_pic_url,
  //   username: response.data.reels_media[0].user.username,
  //   items: response.data.reels_media[0].items.map((item) => ({
  //     storyId: item.id,
  //     thumbnail: item.display_resources[0].src,
  //     isVideo: item.is_video,
  //     image: item.display_url,
  //     video: item.video_resources.pop(),
  //   })),
  // };
  return { response };
};

export default slimUpStories;
