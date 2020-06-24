const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email:"string",
   password:"string"
});

const User = mongoose.model('user', userSchema);

module.exports = {
    User
}