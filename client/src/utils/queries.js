import { gql } from '@apollo/client';

// export const QUERY_BOOKS = gql`
//   query books($username: String) {
//     books(username: $username) {
//       _id
//       authors
//       description
//       image
//       optionCount
//       options {
//         _id
//        optionBody
//         username
//        createdAt
//       }
//     }
//   }
// `;

// export const QUERY_BOOK = gql`
//   query book($id: ID!) {
//     book(_id: $id) {
//       _id
//       authors
//       description
//       image
//       optionCount
//       options {
//         _id
//         optionBody
//         username
//        createdAt
//       }
//     }
//   }
// `;

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       optionCount
//       options {
//         _id
//         username
//       }
//       books {
//         _id
//         authors
//         description
//         image
//         optionCount
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      books {
        _id
        authors: []        
        description
        image
        title
        link
      users {
        _id
        username
      }
    }
  }
`;

