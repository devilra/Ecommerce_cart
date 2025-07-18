const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    //console.log(req.user.id);

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
