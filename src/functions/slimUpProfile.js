const slimUpProfile = (response) => {
  return {
    userId: response.graphql.user.id,
    username: response.graphql.user.username,
    name: response.graphql.user.full_name,
    bio: response.graphql.user.biography,
    thumbnail: response.graphql.user.profile_pic_url,
    image: response.graphql.user.profile_pic_url_hd,
    following: response.graphql.user.edge_follow.count,
    followers: response.graphql.user.edge_followed_by.count,
  };
};

export default slimUpProfile;
