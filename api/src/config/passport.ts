import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import GoogleTokenStrategy from "passport-google-id-token";
import dotenv from "dotenv";

import UserServices from "../services/users";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID as string;

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const userId = payload.id;
    const foundUser = await UserServices.findUserById(userId);
    if (!foundUser) {
      return "No user found.";
    }
    done(null, foundUser);
  }
);
export const googleStrategy = new GoogleTokenStrategy(
  { clientID: CLIENT_ID },
  async (parsedToken, googleId: string, done) => {
    try {
      const userPayload = {
        firstName: parsedToken.payload.given_name,
        lastName: parsedToken.payload.family_name,
        email: parsedToken.payload.email,
      };
      const user = await UserServices.createOrFindUserByEmail(userPayload);
      done(null, user);
    } catch (error) {
      console.log("error");
    }
  }
);
