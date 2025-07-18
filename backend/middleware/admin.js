const User = require("../models/User");

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = admin;
