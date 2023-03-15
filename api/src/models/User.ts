import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isBanned: boolean;
  avatar: string;
  role: string;
  location: string;
  github: string;
  phone: string;
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
  },
  location: {
    type: String,
  },
  gitHub: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
