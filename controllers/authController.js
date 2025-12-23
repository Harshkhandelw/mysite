const User = require("../models/User");

exports.loginUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });
  } catch (error) {
    next(error);
  }
};
