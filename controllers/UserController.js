const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const hashPasswords = require('../pwhash/hashPasswords');


const User = require('../models/User');


const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Email' }] });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    const secret = dotenv.config().parsed.JWT_SECRET;
    jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.cookie('access-token', token);
      res.json({ token })
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const GetUser = async (req, res) => {
  try {
    // Check for a user with the request user id which is included in the token
    const user = await User.getUserByID(req.user.id);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const userWithoutPw = {
      id: user.id,
      email: user.email
    }
    // Send back the user
    res.json(userWithoutPw);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const ChangeUserPassword = async (req, res) => {
  try {
    const user = await User.getUserByID(req.user.id);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Not found' }] });
    }

    const newPassword = req.body.password;
    if (!newPassword) {
      return res.status(400).json({ errors: [{ msg: 'No password in body' }] });
    }

    const hashedPassword = await hashPasswords(newPassword);

    await User.updateUserPassword(user.id, hashedPassword);

    res.json('User pw updated');

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = { LoginUser, GetUser, ChangeUserPassword };