const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (err) {
        res.send({ mssg: "Please login first" });
      } else {
        req.body.user = decoded.userID;
        next();
      }
    });
  } else {
    res.send({ mssg: "Please login first" });
  }
};
