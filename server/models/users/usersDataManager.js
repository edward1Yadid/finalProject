const { User } = require("../../schema/userschemaMoongose");
const config = require("config");
const DB = config.get("DB");
const lodash = require("lodash");
const {
  generateTaokenToUser,
  comparePasswords,
} = require("../../auth/generateToken");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) {
        return console.log("User already registered");
      }
      user = new User(normalizedUser);
      user = await user.save(user);
      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve("user created not in mongodb");
  }
};

const loginUser = async (user) => {
  const { email, password } = user;

  if (DB === "MONGODB") {
    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return Promise.reject(new Error("Invalid email or password"));
      }

      const isPasswordValid = comparePasswords(password, foundUser.password);
      if (!isPasswordValid) {
        return Promise.reject(new Error("Invalid email or password"));
      }
      const token = generateTaokenToUser(foundUser);
      return Promise.resolve(token);
    } catch (error) {
      console.error("Database Error:", error.message);
      return Promise.reject(new Error("Login failed due to database error"));
    }
  } else {
    return Promise.reject(new Error("Database not supported"));
  }
};



exports.registerUser = registerUser;
exports.loginUser = loginUser;
