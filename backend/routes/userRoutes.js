// backend/routes/userRoutes.js

const express = require('express');
const { getUserDataById, getUserDataByEmail, getUserDataByHandle, updateUser } = require('../graphqlServer');
const { sanitizeParams, signToken, signItemId, verifyToken } = require('../utils');
const router = express.Router();

const dummyEmail = process.env.DUMMY_EMAIL;
const dummyPass = process.env.DUMMY_PASS;

router.post('/login', async (req, res) => {
  const { email, password } = sanitizeParams(req.body) || {};
  console.log('req', req.body, dummyEmail, dummyPass);

  if (email === dummyEmail && password === dummyPass) {
    try {
      let userData = await getUserDataByEmail(email);
      if (!userData) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = signToken({ user_id: userData.user_id }, { expiresIn: '1h' });

      userData = { ...userData, user_id: token };

      const encodedItems = userData.items.map((item) => {
        const encodedItemId = signItemId(item.item_id);

        return {
          ...item,
          item_id: encodedItemId,
        };
      });

      userData.items = encodedItems;

      return res.status(200).json({ token, userData });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(401).json({ message: 'Authentication failed' });
  }
});

router.get('/handle/:userHandle', async (req, res) => {
  const userHandle = sanitizeParams(req.params).userHandle;
  try {
    const userData = await getUserDataByHandle(userHandle);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/id', verifyToken(), async (req, res) => {
  try {
    const userData = await getUserDataById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const encodedItems = userData.items.map((item) => {
      const encodedItemId = signItemId(item.item_id);

      return {
        ...item,
        item_id: encodedItemId,
      };
    });

    userData.items = encodedItems;
    console.log('userData', userData);
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/', verifyToken(), async (req, res) => {
  const params = {
    ...sanitizeParams(req.body),
    user_id: req.userId,
  };

  try {
    const user = await updateUser(params);
    if (!user) {
      return res.status(500).json({ message: 'Failed To Update User' });
    }
    return res.status(201).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
