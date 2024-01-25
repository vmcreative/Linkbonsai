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
    # Add more fields as needed
  }

  type Item {
    item_id: Int
    item_url: String
    item_thumbnail: String
    item_text: String
    item_style: StyleType
    user_id: Int
    # Add more fields as needed
  }

  # Define Query types for fetching data
  type Query {
    users: [User]
    userById(user_id: Int!): User
    userByHandle(user_handle: String!): User
    items: [Item]
    item(item_id: Int!): Item
  }

  # Define Mutation types for CRUD operations
  type Mutation {
    addUser(user: UserInput!): User
    updateUser(user_id: Int!, changes: UserInput!): User
    removeUser(user_id: Int!): User
    addItem(item: ItemInput!): Item
    updateItem(item_id: Int!, changes: ItemInput!): Item
    removeItem(item_id: Int!): Item
  }

  # Define input types for mutations
  input UserInput {
    user_email: String
    user_handle: String
    user_first_name: String
    user_last_name: String
    user_header: String
    user_subheader: String
    user_image: String
    user_theme: ThemeType
    # Add more fields as needed
  }

  input ItemInput {
    item_url: String
    item_thumbnail: String
    item_text: String
    item_style: StyleType
    user_id: Int
    # Add more fields as needed
  }
`;

module.exports = typeDefs;
