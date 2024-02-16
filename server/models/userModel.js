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
  address: {
    type: String,
    required: true,
  },
  token: String,
  otpExpiry: Date,
});

// /** pre hooks */
// userSchema.pre("save",function(){
//   this.confirmPassword = undefined;
// })

//User model creation
const User = mongoose.model("User", userSchema);

module.exports = User ;
