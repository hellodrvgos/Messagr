import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User, { UserDocument } from "../models/User";
import UserServices from "../services/users";
import generateToken from "../utils/generateToken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

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

export const getUserListController = async (
  req: Request, 
  res: Response
) => {
  try {
    
    const userData = await UserServices.findUserById(req.params.id);

    if (!userData) {
      res.json({message: `No user with id ${req.params.id}`});
      return;
    }

    const isAdmin = userData.isAdmin;
    
    if (isAdmin) {
      const userList = await UserServices.getUserList();
      return res.status(200).json(userList);
    } else {
      res.json({ message: "Not authorized." });
    }

  } catch (error) {
    console.log(error);
  }
};

// export const googleAuthenticate = async (
//   request: Request,
//   response: Response
// ) => {
//   try {
//     const userData = request.user as UserDocument;
//     if (!userData) {
//       response.json({ message: "User not found" });
//       return;
//     }
//     const token = jwt.sign(
//       {
//         email: request.body.email,
//         firstName: userData.firstName,
//       },
//       JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );
//     response.json({ token, userData });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const googleAuthenticate = async (
  req: Request,
  res: Response
) => {
  try {
      const userData = req.user as UserDocument;
      if (!userData) {
          res.json({message: "can't find user with this email"});
          return;
      } else {
          res.json({token: generateToken(userData._id), userData});
      }
  } catch (error) {
      console.log(error);
  }
}

export const displayUserInformationController =  async (
  req: Request,
  res: Response
) => {
  try {
      const userData = await UserServices.findUserById(req.params.id);
      if (!userData) {
          res.json({message: `No user with id ${req.params.id}`});
          return;
      }
      res.json(userData);
  } catch (error) {
      console.log(error);
  }
}

export const updateUserDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    let password = req.body.password;

    if (password) {
      // hash password
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      password = hashedPassword;
      const newDetail = { ...req.body, password };
      const updatedDetail = await UserServices.updateUserDetail(
        userId,
        newDetail
      );
      res.status(200).json(updatedDetail);
    } else {
      const newDetail = req.body;
      const updateDetail = await UserServices.updateUserDetail(
        userId,
        newDetail
      );
      res.status(200).json(updateDetail);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserByEmailController = async (
  req: Request,
  res: Response
) => {
  try {
      const email = req.params.email;
      const userInfo= req.body;
      const updateUser = await UserServices.updateUserByEmail(
        email,
        userInfo
      );
      res.status(200).json(updateUser);
    }
   catch (error) {
    console.log(error);
  }
};
