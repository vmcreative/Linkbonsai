// backend/queries.js

const getUsers = 'SELECT * FROM users';
const getUserById = 'SELECT * FROM users WHERE user_id = $1';
const getUserByHandle = 'SELECT * FROM users WHERE user_handle = $1';

const getItems = 'SELECT * FROM items';
const getItemById = 'SELECT * FROM items WHERE item_id = $1';

const checkEmailExists = 'SELECT * FROM users WHERE user_email = $1';
const checkHandleExists = 'SELECT * FROM users WHERE user_handle = $1';

const addUser = 'INSERT INTO users (user_email, user_handle, user_first_name, user_last_name, user_header, user_subheader, user_image, user_theme) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const updateUser = `
  UPDATE users
  SET
    user_email = $1,
    user_handle = $2,
    user_first_name = $3,
    user_last_name = $4,
    user_header = $5,
    user_subheader = $6,
    user_image = $7,
    user_theme = $8
  WHERE user_id = $9
  RETURNING *
`;

const removeUser = 'DELETE FROM users WHERE user_id = $1 RETURNING *';

const getItemsByUser = 'SELECT * FROM items WHERE user_id = $1';

const addItem = 'INSERT INTO items (item_url, item_thumbnail, item_text, item_style, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

const updateItem = `
  UPDATE items
  SET
    item_url = $1,
    item_thumbnail = $2,
    item_text = $3,
    item_style = $4
  WHERE item_id = $5
  RETURNING *
`;

const removeItem = 'DELETE FROM items WHERE item_id = $1 RETURNING *';

const removeItemByUser = 'DELETE FROM items WHERE user_id = $1';

module.exports = {
  getUsers,
  getUserById,
  getUserByHandle,
  getItems,
  getItemById,
  checkEmailExists,
  checkHandleExists,
  addUser,
  updateUser,
  removeUser,
  getItemsByUser,
  getItemById,
  addItem,
  updateItem,
  removeItem,
  removeItemByUser,
};
