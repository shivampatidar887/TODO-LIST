const express = require("express");
const { createUser, loginUser, logoutUser, getUserdetails,updateProfile, getUserdetailstoken } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/user/new").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(isAuthenticatedUser,getUserdetails);
router.route("/user/:token").get(getUserdetailstoken);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);


module.exports = router