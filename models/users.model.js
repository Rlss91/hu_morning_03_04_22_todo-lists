const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  randomRecoveryNumber: { type: String },
  dateRecoveryNumber: { type: Date },
});

const Users = mongoose.model("Users", usersSchema);

const selectUserByEmail = (email) => {
  return Users.find({ email });
};

const insertUser = (firstname, lastname, email, password, phone) => {
  const user = new Users({
    firstname,
    lastname,
    email,
    password,
    phone,
  });
  return user.save();
};

const updateRecoveryParams = (
  email,
  randomRecoveryNumber,
  dateRecoveryNumber
) => {
  return Users.updateOne(
    { email },
    {
      randomRecoveryNumber,
      dateRecoveryNumber,
    }
  );
};

const updatePassword = (email, password) => {
  return Users.updateOne(
    { email },
    { password, randomRecoveryNumber: null, dateRecoveryNumber: null }
  );
};

module.exports = {
  selectUserByEmail,
  insertUser,
  updateRecoveryParams,
  updatePassword,
};
