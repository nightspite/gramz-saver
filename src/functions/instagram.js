/* eslint-disable import/prefer-default-export */
// import React, { userState, useEffect } from 'react';

// export function getPosts() {
//   fetch('https://www.instagram.com/emrata/?__a=1')
//     .then((response) => response.json())
//     .then((data) => {
//       const profilePic = data.graphql.user.profile_pic_url_hd;
//       const profilePosts = data.graphql.user.edge_owner_to_timeline_media.edges.map(
//         (e) => e.node.display_url,
//       );
//       console.log(profilePic);
//       console.log(profilePosts);

//       // const img = document.querySelector(".profile-pic");
//       // img.src = profile_pic;
//     });
// }

// const url = `https://www.instagram.com/graphql/query/?query_hash=56a7068fea504063273cc2120ffd54f3&variables={"id": "528817151","first":12}`;

// https://www.instagram.com/graphql/query/?query_id=17851374694183129&id=%3C528817151%3E&first=1000&after=%3Cend_cursor%3E

// https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables=%7B%22reel_ids%22%3A%5B%22528817151%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%2C%22stories_video_dash_manifest%22%3Afalse%7D
