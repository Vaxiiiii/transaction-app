const { loginUser, createUser } = require('../services/authService');
const { generateToken } = require('../utils/tokenUtils');

exports.login = async (req, res) => {
  try {
    const user = await loginUser(req.body.username, req.body.password);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};