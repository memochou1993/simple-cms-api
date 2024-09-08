import { auth } from '../firebase/index.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization).replace('Bearer ', '');
    await auth.verifyIdToken(token);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

export default authMiddleware;
