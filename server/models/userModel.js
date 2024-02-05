const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.password === this.confirmPassword;
    },
    message: "Password and confirmed password should be same",
  },
  createdAt: Date,
  id: String,
});

//User model creation
const User = mongoose.model("User", userSchema);

module.exports = User ;
