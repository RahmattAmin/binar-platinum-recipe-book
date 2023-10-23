import jwt from "jsonwebtoken";
import { responseError } from "../helpers/restResponse.helper.js";

const JWT_KEY = process.env.JWT_SECRET;

// const jwt = require("jsonwebtoken");
// const { errorResp } = require("../utils/responseHandlers");

const middleware = (req, res, next) => {
  const token = req.headers.authorization;
  const access_token = token.split(" ")[1];
  const infoJwt = jwt.verify(access_token, JWT_KEY);

  if (!access_token) {
    return res.status(401).json(responseError("Access token is missing"));
  }

  jwt.verify(access_token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json(responseError("Invalid Access Token"));
    }
    req.local_user = infoJwt.userId;
    next();
    // req.userId = decoded.userId;
    // next();
  });
};

export default middleware;
