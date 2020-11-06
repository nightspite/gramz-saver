const slimUpProfile = (response) => {
  return {
    userId: response.graphql.user.id,
    fullName: response.graphql.user.full_name,
    username: response.graphql.user.username,
    name: response.graphql.user.full_name,
    bio: response.graphql.user.biography,
    thumbnail: response.graphql.user.profile_pic_url,
    image: response.graphql.user.profile_pic_url_hd,
    following: response.graphql.user.edge_follow.count,
    followers: response.graphql.user.edge_followed_by.count,
    highlights: response.graphql.user.highlight_reel_count,
    externalUrl: response.graphql.user.external_url,
    isPrivate: response.graphql.user.id_private,
    numberOfPosts: response.graphql.user.edge_owner_to_timeline_media.count,
  };
};

export default slimUpProfile;
