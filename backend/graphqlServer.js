// graphqlServer.js

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const getUserDataById = async (userId) => {
  try {
    const gqlQuery = `
      query GetUserById($userId: Int!) {
        userById(user_id: $userId) {
          user_email
          user_handle
          user_first_name
          user_last_name
          user_header
          user_subheader
          user_image
          user_theme
          items {
            item_id
            item_style
            item_text
            item_thumbnail
            item_url
            item_order
          }
        }
      }
    `;

    const { data } = await server.executeOperation({
      query: gqlQuery,
      variables: { userId }
    });

    return data?.userById;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const getUserDataByEmail = async (userEmail) => {
  try {
    const gqlQuery = `
      query GetUserByEmail($userEmail: String!) {
        userByEmail(user_email: $userEmail) {
          user_id
          user_email
          user_handle
          user_first_name
          user_last_name
          user_header
          user_subheader
          user_image
          user_theme
          items {
            item_id
            item_style
            item_text
            item_thumbnail
            item_url
            item_order
          }
        }
      }
    `;

    const { data } = await server.executeOperation({
      query: gqlQuery,
      variables: { userEmail }
    });

    return data?.userByEmail;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const getUserDataByHandle = async (userHandle) => {
  try {
    const gqlQuery = `
      query GetUserByHandle($userHandle: String!) {
        userByHandle(user_handle: $userHandle) {
          user_handle
          user_header
          user_subheader
          user_image
          user_theme
          items {
            item_style
            item_text
            item_thumbnail
            item_url
            item_order
          }
        }
      }
    `;

    const { data } = await server.executeOperation({
      query: gqlQuery,
      variables: { userHandle }
    });

    return data?.userByHandle;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const updateUser = async (params) => {
  try {
    const gqlMutation = `
      mutation UpdateUser($params: UserInput!) {
        updateUser(params: $params) {
          user_header
          user_subheader
          user_image
          user_theme
        }
      }
    `;

    const { data } = await server.executeOperation({
      query: gqlMutation,
      variables: { params }
    });

    return data?.updateUser;
  } catch (error) {
    console.error('Error Updating User:', error);
    return null;
  }
}

const addItem = async (params) => {
  try {
    const gqlMutation = `
      mutation AddItem($params: ItemInput!) {
        addItem(params: $params) {
          item_id
          item_style
          item_text
          item_thumbnail
          item_url
          item_order
        }
      }
    `;

    const { data } = await server.executeOperation({
      query: gqlMutation,
      variables: { params }
    });

    return data?.addItem;
  } catch (error) {
    console.error('Error Creating Item:', error);
    return null;
  }
};

const updateItem = async (params) => {
  try {
    const gqlMutation = `
      mutation UpdateItem($params: ItemInput!) {
        updateItem(params: $params) {
          item_id
          item_style
          item_text
          item_thumbnail
          item_url
          item_order
        }
      }
    `;

    const { data } = await server.executeOperation({
      query: gqlMutation,
      variables: { params }
    });

    return data?.updateItem;
  } catch (error) {
    console.error('Error Updating Item:', error);
    return null;
  }
};

const deleteItem = async (params) => {
  try {
    const gqlMutation = `
      mutation RemoveItem($params: ItemInput!) {
        removeItem(params: $params) {
          item_id
          item_style
          item_text
          item_thumbnail
          item_url
          item_order
        }
      }
    `;

    const { data } = await server.executeOperation({
      query: gqlMutation,
      variables: { params }
    });

    return data?.removeItem;
  } catch (error) {
    console.error('Error Deleting Item:', error);
    return null;
  }
}

module.exports = {
  server,
  getUserDataById,
  getUserDataByEmail,
  getUserDataByHandle,
  updateUser,
  addItem,
  updateItem,
  deleteItem
};
