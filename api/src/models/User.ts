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
  phone: number;
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
  },
  lastName: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  isBanned: {
    type: Boolean,
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
    type: Number,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
