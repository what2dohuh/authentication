const userModel = require("../models/user.model");
const { hashedPassword, comparePassword } = require("../helper/auth");
const upload = require("../helper/multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("../helper/cloudinary.config");

const get = (req, res) => {
  res.send("Hello World");
};

//This is for registering a new user

const Register = async (req, res) => {
  const { email, name, password, profile } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }
    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!password || password < 6) {
      return res
        .status(400)
        .json({ error: "passwords is required and more than 6 characters " });
    }
    const hashedPass = await hashedPassword(password);

    if (profile) {
        const isMatch = await userModel.findOne({email})
        if (isMatch) {
          return res
            .status(400)
            .json({ error: "email is already registered" });
        } else {

        cloudinary.uploader.upload(profile, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        } else {
         
            const user = await userModel.create({
              name,
              email,
              password: hashedPass,
              profile: result.secure_url,
            });

            return res.status(200).json(user);
          }
        }
      );
    }} else {
      const user = await userModel.create({
        name,
        email,
        password: hashedPass,
      });
      return res.status(200).json(user);
    }

  } catch (error) {
    res.status(500).send(error.message);
  }
};

//This is for login the user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
     return res.status(400).json({error:"email is required"});
    }
    if (!password) {
      return res.status(400).json({error:"password is required"});
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).send("email is not registered");
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).send("password is incorrect");
    } else {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SEC,
        {},
        (err, token) => {
          if (err) {
            res.status(500).send(err.message);
          } else {
            res.cookie("token", token).json(user);
          }
        }
      );
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Thia is to get the profile if token available

const getProfile = (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(401).send("unauthorized");
      } else {
        res.status(200).json(user);
      }
    });
  } else {
    res.json(null);
  }
};

const logout= (req, res) => {
    res.cookie("token",null).json("logout");
}
module.exports = { get, Register, login, getProfile ,logout};
