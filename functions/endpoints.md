userID and profile picture
https://www.instagram.com/${username}/?__a=1`;

single post
https://www.instagram.com/p/${shortcode}/?__a=1`;
// edge_sidecar_to_children.edges.map(edge => edge.node.is_video == true) -> video_url
// else -> edge_sidecar_to_children.edges.map(edge => edge.node.display_resources LAST
// to show small version -> edge_sidecar_to_children.edges.map(edge => edge.node.display_url
// or edge_sidecar_to_children.edges.map(edge => edge.node.display_resources FIRST

posts
https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":"953293389","first":50}

stories
https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":["953293389"],"highlight_reel_ids":[],"precomposed_overlay":false}

highlights ids
https://www.instagram.com/graphql/query/?query_hash=aec5501414615eca36a9acf075655b1e&variables={"user_id": "953293389","include_highlight_reels": true, "first":50}

highlights
https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables={"reel_ids":[],"highlight_reel_ids":[],"precomposed_overlay":false}
