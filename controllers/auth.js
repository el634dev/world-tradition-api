require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Create token
function generateJWT(user) {
  const token = jwt.sign(
    { _id: user.id },
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  );

  return token;
}

module.exports = (app) => {
  // Sign Up (POST)
  app.post('/signup', async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400);
      }

      if (req.body.password.length < 10) {
        return res.status(400).json({ error: 'Password must be at least ten characters.'});
      }

      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // ------------------
  // Login (POST)
  app.post('/login', (req, res, next) => {
    // look up user with email
    models.User.findOne({ where: { email: req.body.email } }).then((user) => {
      // compare passwords
      // eslint-disable-next-line consistent-return
        user.comparePassword(req.body.password, (err, isMatch) => {
        // if not match send back to login
          if (!isMatch) {
            return res.redirect('/login');
          }
          // if there is a match generate JWT
          const userJWT = generateJWT(user);
          // save jwt as cookie
          res.cookie('userJWT', userJWT);

          res.redirect('/');
        })
          .catch((err) => {
          // if user is not found return to login
            console.log(err);
            return res.redirect('/login');
          });
      });
  });

  // ------------------
  // Logout
  app.get('/logout', (req, res, next) => {
    res.clearCookie('userJWT');

    return res.redirect('/');
  });
};
