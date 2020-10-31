// import React, { useState, useEffect } from 'react';

// const url = 'https://www.instagram.com/graphql/query/?query_hash=56a7068fea504063273cc2120ffd54f3&variables={"id": "528817151","first":12}';

// function useGramz() {
//   const [gramz, setGramz] = useState([]);

//   useEffect(() => {
//     console.log('fetchnig the gramz');
//     fetch(url)
//       .then((data) => data.json())
//       .then(({ data }) => {
//         console.log('back!');

//         const thumbs = data.user.edge_owner_to_timeline_media.edges.map(
//           (edge) => ({
//             url: edge.node.thumbnail_src,
//             caption: edge.node.edge_media_to_caption?.edges[0]?.node?.text,
//             id: edge.id,
//           }),
//         );
//       });
//   });
// }
