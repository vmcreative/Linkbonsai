// backend/schemas.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum ThemeType {
    light
    dark
  }

  enum StyleType {
    classic
    featured
  }

  type User {
    user_id: Int
    user_email: String
    user_handle: String
    user_first_name: String
    user_last_name: String
    user_header: String
    user_subheader: String
    user_image: String
    user_theme: ThemeType
    items: [Item]
  }

  type Item {
    item_id: Int
    item_url: String
    item_thumbnail: String
    item_text: String
    item_style: StyleType
    item_order: Int
    user_id: Int
  }

  # Define Query types for fetching data
  type Query {
    users: [User]
    userById(user_id: Int!): User
    userByHandle(user_handle: String!): User
    userByEmail(user_email: String!): User
    items: [Item]
    item(item_id: Int!): Item
  }

  # Define Mutation types for CRUD operations
  type Mutation {
    addUser(user: UserInput!): User
    updateUser(params: UserInput!): User
    removeUser(user_id: Int!): User
    addItem(params: ItemInput!): [Item]
    updateItem(params: ItemInput!): [Item]
    removeItem(params: ItemInput!): [Item]
  }

  # Define input types for mutations
  input UserInput {
    user_id: Int
    user_email: String
    user_handle: String
    user_first_name: String
    user_last_name: String
    user_header: String
    user_subheader: String
    user_image: String
    user_theme: ThemeType
  }

  input ItemInput {
    item_id: Int
    item_url: String
    item_thumbnail: String
    item_text: String
    item_style: StyleType
    item_position: Int
    item_order: Int
    user_id: Int
  }
`;

module.exports = typeDefs;
