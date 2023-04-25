import jwt from "jsonwebtoken";
import { readFile } from "../controller/user.controller.js";

import dotenv from "dotenv";

dotenv.config();

export const isAuthorized = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];


  if (!token)
    return res
      .status(400)
      .json({
        success: false,
        message: "Not Authorized to access this route!!",
      });

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    const userList = await readFile();
    const user = userList.find((user) => user.id === decoded.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found, please signin again!!" });

    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};
