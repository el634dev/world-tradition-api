require('dotenv').config();
const User = require("../models/user");
const jwt = require('jsonwebtoken');

function generateJWT(user) {
   const token = jwt.sign({ _id: user.id }, process.env.SECRET, { expiresIn: 60*60});

   return token;
}

module.exports = (app) => {
   // TODO: Implement authentication controller.
   
  }
