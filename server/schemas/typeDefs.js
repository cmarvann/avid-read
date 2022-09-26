const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [book]
    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Books]
    book(_id: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedBook(
      authors[]
      description
      title
      bookId 
      image
      link): [Books]
      User {
        username: String
  }

  type removeBook {
    _id: ID
    User {
      username: String
  }


`;

module.exports = typeDefs;
