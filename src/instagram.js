export function getPosts() {
  fetch("https://www.instagram.com/emrata/?__a=1")
    .then((response) => response.json())
    .then((data) => {
      const profile_pic = data.graphql.user.profile_pic_url_hd;
      const profile_posts = data.graphql.user.edge_owner_to_timeline_media.edges.map(
        (e) => e.node.display_url
      );
      console.log(profile_pic);
      console.log(profile_posts);

      // const img = document.querySelector(".profile-pic");
      // img.src = profile_pic;
    });
}
