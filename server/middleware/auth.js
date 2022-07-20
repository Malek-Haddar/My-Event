import jwt from "jsonwebtoken";
import User from "../models/user.js";

const secret = 'test';

export const auth = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        // console.log({ token });

        // if (!token) return "Not authorized, token failed";
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        return "Not authorized, token failed";
      }
    }
  
    if (!token) {
      res.status(401);
      return "Not authorized, no token";
    }
  };
  
// export const auth = async (req, res, next) => {
//     let token

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       try {
//         // Get token from header
//         token = req.headers.authorization.split(" ")[1];

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Get user from the token
//         req.user = await User.findById(decoded.id).select("-password");

//         next();
//       } catch (error) {
//         console.log(error);

//         return "Not authorized, token failed";
//       }
//     }

//     if (!token) {
//       res.status(401);
//       return "Not authorized, no token";
//     }
//   }
  
  


// export default auth;
































/* const jwt = require("jsonwebtoken");
const User = require("../models/user")
const secret = "test";

const auth = async(req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, secret)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 3) {
        console.log(req);
        next()
        res.send("you're user")
    } else {
        res.status(401)
        res.send("Not authorized as an admin")
    }
}
const instractor = (req, res, next) => {
    if (req.user && req.user.role === 2) {
        next()
    } else {
        res.status(401)
        res.send("Not authorized as an admin")
    }
}
const moderator = (req, res, next) => {
    if (req.user && req.user.role === 1) {
        next()
    } else {
        res.status(401)
        res.send("Not authorized as an admin")
    }
}
const user = (req, res, next) => {
    if (req.user && req.user.role === 0) {
        next()
    } else {
        res.status(401)
        res.send("Not authorized as an admin")
    }
}


module.exports = { auth, admin, moderator, instractor, user }; */