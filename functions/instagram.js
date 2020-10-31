/* eslint-disable no-undef */
/* eslint-disable func-names */
require('isomorphic-fetch');

const url =
  'https://www.instagram.com/graphql/query/?query_hash=56a7068fea504063273cc2120ffd54f3&variables={"id": "528817151","first":12}';

async function getPosts() {
  const data = await fetch(url).then((res) => res.json());
  console.log(data);
  return data;
}

function slimUpPosts(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge) => ({
    thumbnail: edge.node.thumbnail_src,
    url: `https://instagram.com/p/${edge.note.edge_media_to_caption.shortcode}`,
    caption: edge.node.edge_media_to_caption.edges[0].node.text,
    id: edge.id,
  }));
}

exports.hanlder = async function (event, context, callback) {
  const posts = await getPosts();
  const slimPosts = await slimUpPosts();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(posts),
  });
  console.log(posts);
  console.log(slimPosts);
};
