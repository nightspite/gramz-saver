const getUserId = `https://www.instagram.com/${username}/?__a=1`;

const getPost = `https://www.instagram.com/p/${shortcode}/?__a=1`;
// edge_sidecar_to_children.edges.map(edge => edge.node.is_video == true) -> video_url
// else -> edge_sidecar_to_children.edges.map(edge => edge.node.display_resources LAST
// to show small version -> edge_sidecar_to_children.edges.map(edge => edge.node.display_url
// or edge_sidecar_to_children.edges.map(edge => edge.node.display_resources FIRST

const getPosts = `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":"${userId}","first":30} `;

const getStories =
'https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables=%7B%22reel_ids%22%3A%5B%22528817151%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%2C%22stories_video_dash_manifest%22%3Afalse%7D';

https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":["528817151"],"tag_names":[],"location_ids":[],"highlight_reel_ids":[],"precomposed_overlay":false,"show_story_viewer_list":true,"story_viewer_fetch_count":50,"story_viewer_cursor":"","stories_video_dash_manifest":false}
