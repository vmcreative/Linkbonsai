// backend/utils.js

const jwt = require('jsonwebtoken');
const sqlstring = require('sqlstring');
const secretKey = process.env.JWT_SECRET_KEY;

const sanitizeParams = (params) => {
  if (!params) return null;

  const sanitizedParams = {};

  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      if (typeof value === 'string') {
        sanitizedParams[key] = sqlstring.escape(value).slice(1, -1);
      } else if (Number.isInteger(value)) {
        sanitizedParams[key] = value;
      } else {
        sanitizedParams[key] = sqlstring.escape(value);
      }
    }
  }

  return sanitizedParams;
};

const signToken = (payload, options) => {
  return jwt.sign(payload, secretKey, options);
};

const signItemId = (itemId) => {
  return jwt.sign({ item_id: itemId }, secretKey);
};

const verifyToken = () => {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.user = decodedToken;
      req.userId = decodedToken.user_id;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid Session Token' });
    }
  };
};

const verifyItemId = (itemId) => {
  try {
    return jwt.verify(itemId, secretKey);
  } catch (error) {
    throw new Error('Invalid Item ID');
  }
};

module.exports = { sanitizeParams, signToken, signItemId, verifyToken, verifyItemId };