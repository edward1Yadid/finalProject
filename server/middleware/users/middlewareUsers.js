const express = require("express");
const normalizedUser = require("./nornalizedUuser");
const {
  registerUser,
  loginUser,
  getusersForAdmin,
  deteleUser,
  changePermissionByAdmin,
} = require("../../models/users/usersDataManager");
const { handleErrorUser } = require("../../utils/handleErrorProducts");
const {
  validateRestration,
  validateLogin,
} = require("../../validation/users/userServicesValidation");
const { generatePassword } = require("../../auth/generatePassword");
const { authorizationForAccsesUser } = require("../../auth/user");
const router = express.Router();

///handle error
router.post("/", async (request, response) => {
  try {
    let user = request.body;
    const { error } = validateRestration(user);
    if (error)
      return handleErrorUser(response, error.status || 500, error.message);
    let normalizeduser = normalizedUser(user);
    let { password } = normalizeduser;
    let hashPassword = await generatePassword(password);
    user = await registerUser({ ...normalizeduser, password: hashPassword });
    return response.status(201).send(user);
  } catch (error) {
    return handleErrorUser(response, error.status || 500, error.message);
  }
});
///handle error
router.post("/login", async (request, response) => {
  try {
    const user = request.body;
    const { error } = validateLogin(user);
    if (error) {
      return handleErrorUser(response, error.status || 500, error.message);
    }
    const userData = await loginUser(user);
    response.status(200).send(userData);
  } catch (error) {
    console.error("Router Error:", error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
