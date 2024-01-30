// backend/queries.js

const getUsers = 'SELECT * FROM users';
const getUserById = 'SELECT * FROM users WHERE user_id = $1';
const getUserByHandle = 'SELECT * FROM users WHERE user_handle = $1';
const getUserByEmail = 'SELECT * FROM users WHERE user_email = $1';

const getItems = 'SELECT * FROM items';
const getItemsByUser = 'SELECT * FROM items WHERE user_id = $1';
const getItemById = 'SELECT * FROM items WHERE item_id = $1';

const checkEmailExists = 'SELECT * FROM users WHERE user_email = $1';
const checkHandleExists = 'SELECT * FROM users WHERE user_handle = $1';

const addUser = `
  INSERT INTO users
  (user_email, user_handle, user_first_name, user_last_name, user_header, user_subheader, user_image, user_theme)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *`;

const updateUser = `
  UPDATE users
  SET
    user_header = $1,
    user_subheader = $2,
    user_image = $3,
    user_theme = $4
  WHERE user_id = $5
  RETURNING *`;

const removeUser = 'DELETE FROM users WHERE user_id = $1 RETURNING *';

// $1 = startingOrder, $2 = targetOrder, $3 = user_id,
const updateItemsOrder = `
  UPDATE items
  SET item_order =
    CASE
      WHEN $1::integer = 0 AND $2::integer > 0 AND item_order::integer >= $2::integer THEN item_order + 1
      WHEN $1::integer > 0 AND $2::integer = 0 AND item_order::integer > $1::integer THEN item_order - 1
      WHEN $1::integer > 0 AND $2::integer > 0 AND $1::integer < $2::integer AND item_order::integer > $1::integer AND item_order::integer <= $2::integer THEN item_order - 1
      WHEN $1::integer > 0 AND $2::integer > 0 AND $1::integer > $2::integer AND item_order::integer >= $2::integer AND item_order::integer < $1::integer THEN item_order + 1
      WHEN $1::integer > 0 AND $2::integer > 0 AND item_order::integer = $1::integer THEN $2::integer
      ELSE item_order
    END
  WHERE user_id = $3;
`;

const addItem = `
  INSERT INTO items (item_url, item_style, item_order, user_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;

const updateItem = `
  UPDATE items
  SET
    item_url = $1,
    item_thumbnail = $2,
    item_text = $3,
    item_style = $4
  WHERE item_id = $5
  RETURNING *`;

const removeItem = 'DELETE FROM items WHERE item_id = $1 RETURNING *';

const removeItemByUser = 'DELETE FROM items WHERE user_id = $1';

module.exports = {
  getUsers,
  getUserById,
  getUserByHandle,
  getUserByEmail,
  getItems,
  getItemById,
  checkEmailExists,
  checkHandleExists,
  addUser,
  updateUser,
  removeUser,
  getItemsByUser,
  getItemById,
  updateItemsOrder,
  addItem,
  updateItem,
  removeItem,
  removeItemByUser,
};
