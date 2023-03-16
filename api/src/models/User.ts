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
  gitHub: string;
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
    // required: true,
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
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
    default: ""
  },
  role: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  gitHub: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
