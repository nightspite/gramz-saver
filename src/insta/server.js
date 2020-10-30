const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  // console.log(response);
  return response;
});

// fetch(
//   'https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables=%7B%22reel_ids%22%3A%5B%22528817151%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%2C%22stories_video_dash_manifest%22%3Afalse%7D',
//   {
//     headers: {
//       accept: '*/*',
//       'accept-language': 'en-US,en;q=0.9,pl;q=0.8,de;q=0.7',
//       'sec-fetch-dest': 'empty',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'same-origin',
//       'x-csrftoken': '1nAFSkWbvyq3NOgFzUURoMcSkxCkXXWa',
//       'x-ig-app-id': '936619743392459',
//       'x-ig-www-claim': 'hmac.AR2rRV-MyhQKDZ_BV-S4zf1nwrkRYYQr719b4_ZxYAYXgBCU',
//       'x-requested-with': 'XMLHttpRequest',
//     },
//     referrer: 'https://www.instagram.com/stories/nasa/',
//     referrerPolicy: 'strict-origin-when-cross-origin',
//     body: null,
//     method: 'GET',
//     mode: 'cors',
//     credentials: 'include',
//   },
// );

// fetch(
//   'https://www.instagram.com/graphql/query/?query_hash=c9c56db64beb4c9dea2d17740d0259d9&variables=%7B%22reel_ids%22%3A%5B%22528817151%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%2C%22stories_video_dash_manifest%22%3Afalse%7D',
//   {
//     headers: {
//       accept: '*/*',
//       'accept-language': 'en-US,en;q=0.9,pl;q=0.8,de;q=0.7',
//       'sec-fetch-dest': 'empty',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'same-origin',
//       'x-csrftoken': '1nAFSkWbvyq3NOgFzUURoMcSkxCkXXWa',
//       'x-ig-app-id': '936619743392459',
//       'x-ig-www-claim': 'hmac.AR2rRV-MyhQKDZ_BV-S4zf1nwrkRYYQr719b4_ZxYAYXgBCU',
//       'x-requested-with': 'XMLHttpRequest',
//     },
//     referrer: 'https://www.instagram.com/stories/nasa/',
//     referrerPolicy: 'strict-origin-when-cross-origin',
//     body: null,
//     method: 'GET',
//     mode: 'cors',
//     credentials: 'include',
//   },
// );
