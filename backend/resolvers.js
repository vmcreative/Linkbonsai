// backend/resolvers.js
const pool = require('./db');
const queries = require('./queries');

const resolvers = {
  Query: {
    users: async () => {
      try {
        const { rows } = await pool.query(queries.getUsers);
        return rows;
      } catch (error) {
        throw error;
      }
    },
    userById: async (_, { user_id }) => {
      try {
        const { rows } = await pool.query(queries.getUserById, [user_id]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
    userByHandle: async (_, { user_handle }) => {
      try {
        const { rows } = await pool.query(queries.getUserByHandle, [user_handle]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
    items: async () => {
      try {
        const { rows } = await pool.query(queries.getItems);
        return rows;
      } catch (error) {
        throw error;
      }
    },
    item: async (_, { item_id }) => {
      try {
        const { rows } = await pool.query(queries.getItemById, [item_id]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (_, { user }) => {
      try {
        const { rows } = await pool.query(queries.addUser, [
          user.user_email,
          user.user_handle,
          user.user_first_name,
          user.user_last_name,
        ]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (_, { user_id, changes }) => {
      try {
        const { rows } = await pool.query(queries.updateUser, [
          changes.user_email,
          changes.user_handle,
          changes.user_first_name,
          changes.user_last_name,
          changes.user_header,
          changes.user_subheader,
          changes.user_image,
          changes.user_theme,
          user_id,
        ]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
    removeUser: async (_, { user_id }) => {
      try {
        const { rows } = await pool.query(queries.removeUser, [user_id]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
    addItem: async (_, { item }) => {
      try {
        const { rows } = await pool.query(queries.addItem, [
          item.item_url,
          item.item_thumbnail,
          item.item_text,
          item.item_style,
          item.user_id,
        ]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
    updateItem: async (_, { item_id, changes }) => {
      try {
        const { rows } = await pool.query(queries.updateItem, [
          changes.item_url,
          changes.item_thumbnail,
          changes.item_text,
          changes.item_style,
          item_id,
        ]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
    removeItem: async (_, { item_id }) => {
      try {
        const { rows } = await pool.query(queries.removeItem, [item_id]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
  },
  User: {
    items: async (user) => {
      try {
        const { rows } = await pool.query(queries.getItemsByUser, [user.user_id]);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  },
};

module.exports = resolvers;
