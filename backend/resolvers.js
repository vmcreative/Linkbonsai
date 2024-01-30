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

    userByEmail: async (_, { user_email }) => {
      try {
        const { rows } = await pool.query(queries.getUserByEmail, [user_email]);
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

    updateUser: async (_, { params }) => {
      try {
        const { rows } = await pool.query(queries.updateUser, [
          params.user_header,
          params.user_subheader,
          params.user_image,
          params.user_theme,
          params.user_id,
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

    addItem: async (_, { params }) => {
      try {
        const startingOrder = 0;
        const targetOrder = 1;

        await pool.query(queries.updateItemsOrder, [
          startingOrder,
          targetOrder,
          params.user_id,
        ]);
        await pool.query(queries.addItem, [
          params.item_url,
          "classic",
          targetOrder,
          params.user_id,
        ]);
        const { rows } = await pool.query(queries.getItemsByUser, [params.user_id]);
        return rows;
      } catch (error) {
        return error;
      }
    },

    updateItem: async (_, { params }) => {
      try {
        const startingOrder = params.item_position;
        const targetOrder = params.item_order;
        await pool.query(queries.updateItemsOrder, [
          startingOrder,
          targetOrder,
          params.user_id
        ]);
        await pool.query(queries.updateItem, [
          params.item_url,
          params.item_thumbnail,
          params.item_text,
          params.item_style,
          params.item_id,
        ]);
        const { rows } = await pool.query(queries.getItemsByUser, [params.user_id]);
        return rows;
      } catch (error) {
        throw error;
      }
    },
    removeItem: async (_, { params }) => {
      try {
        const startingOrder = params.item_order;
        const targetOrder = 0;

        await pool.query(queries.removeItem, [params.item_id]);

        await pool.query(queries.updateItemsOrder, [
          startingOrder,
          targetOrder,
          params.user_id,
        ]);

        const { rows } = await pool.query(queries.getItemsByUser, [params.user_id]);
        return rows;
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
