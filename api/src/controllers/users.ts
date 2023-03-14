import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/User";
import UserServices from "../services/users";
import generateToken from "../utils/generateToken";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      avatar,
      isAdmin,
      isBanned,
      role,
      location,
      gitHub,
      phone,
    } = req.body;

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      isAdmin: isAdmin,
      isBanned: isBanned,
      role: role,
      location: location,
      gitHub: gitHub,
      phone: phone,
    });

    const user = await UserServices.findUserByEmail(email);
    if (!user) {
      await UserServices.createUser(newUser);
      res.json({ status: "success", message: `Registration successful.` });
    }
    res.json({ message: `${req.body.email} is already registered.` });
  } catch (error) {
    console.log(error);
  }
};

export const loginWithPasswordController = async (
  req: Request,
  res: Response
) => {
  try {
    const userData = await UserServices.findUserByEmail(req.body.email);
    if (!userData) {
      res.json({ message: `No user with email ${req.body.email}` });
      return;
    }

    const passwordDB = userData.password;
    const plainPassword = req.body.password;

    const match = await bcrypt.compare(plainPassword, passwordDB);

    if (!match) {
      res.json({ message: "Wrong password." });
      return;
    }

    res.json({ id: userData?._id, token: generateToken(userData._id) });
  } catch (error) {
    console.log(error);
  }
};

export const getUserListController = async (req: Request, res: Response) => {
  try {
    const userList = await UserServices.getUserList();
    res.status(200).json(userList);
  } catch (error) {
    console.log(error);
  }
};
