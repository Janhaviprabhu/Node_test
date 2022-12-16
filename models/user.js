const { model } = require("mongoose");

const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, unique: true },
});
const UserModel = model("users", UserSchema);

module.exports = UserModel;
