const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "ThisIsASpecial@pass";

//Toute 1 : Create a user using : POST "/api/auth/createuser".Doesn'st require login.
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name:").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 6,
    }),
    body("email", "Enter a valid password:").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    //If there are errors return bad request and the errors.
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success, errors: errors.array(), msg: errors.msg });
    }
    try {
      const body = req.body;
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(body.password, salt);
      const user = await User.create({
        name: body.name,
        email: body.email,
        password: secPass,
        date: body.date,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      return res.status(201).json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2 : Logging in a user using : POST "/api/auth/login".Doesn'st require login.
router.post(
  "/login",
  [
    body("password", "Password must be atleast 5 characters").isLength({
      min: 6,
    }),
    body("email", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //  if there are errors return bad request and the errors.
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success, errors: errors.array(), msg: errors.msg });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      console.log(user.password);
      console.log(passwordcompare);
      if (!passwordcompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.status(201).json({
        success,
        authToken,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Toute 3 : Get logged-in user details : POST "/api/auth/getuser".Login required.
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
// Installing react, react-dom, and react-scripts with cra-template...
