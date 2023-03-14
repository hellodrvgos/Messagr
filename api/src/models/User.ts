import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
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
    type: String,
    required: true,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
