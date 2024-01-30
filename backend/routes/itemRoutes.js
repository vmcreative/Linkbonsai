// backend/routes/itemRoutes.js

const express = require('express');
const { addItem, updateItem, deleteItem } = require('../graphqlServer');
const { sanitizeParams, signItemId, verifyToken, verifyItemId } = require('../utils');
const router = express.Router();

router.post('/', verifyToken(), async (req, res) => {
  const params = {
    ...sanitizeParams(req.body),
    user_id: req.user.user_id,
  };

  try {
    const items = await addItem(params);
    if (!items) {
      return res.status(500).json({ message: 'Failed To Create Item' });
    };

    const response = items.map((item) => {
      const encodedItemId = signItemId(item.item_id);
      console.log('id:', item.item_id, 'encoded:', encodedItemId);
      return { ...item, item_id: encodedItemId };
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/', verifyToken(), async (req, res) => {
  try {
    const decodedId = verifyItemId(req.body.item_id);

    const params = {
      ...sanitizeParams(req.body),
      item_id: decodedId.item_id,
      user_id: req.user.user_id,
    };

    const items = await updateItem(params);
    if (!items) {
      return res.status(500).json({ message: 'Failed To Update Item' });
    };

    const response = items.map((item) => {
      const encodedItemId = signItemId(item.item_id);
      console.log('id:', item.item_id, 'encoded:', encodedItemId);
      return { ...item, item_id: encodedItemId };
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error('Error updating item:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/', verifyToken(), async (req, res) => {
  try {
    const decodedId = verifyItemId(req.body.item_id);

    const params = {
      ...sanitizeParams(req.body),
      user_id: req.user.user_id,
      item_id: decodedId.item_id,
    };

    const items = await deleteItem(params);
    if (!items) {
      return res.status(500).json({ message: 'Failed To Delete Item' });
    };

    const response = items.map((item) => {
      const encodedItemId = signItemId(item.item_id);
      console.log('id:', item.item_id, 'encoded:', encodedItemId);
      return { ...item, item_id: encodedItemId };
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
