import mongoose, { Document } from "mongoose";

export type MessageDocument = Document & {
  room: number;
  author: {
    firstName: string;
    lastName: string;
  };
  message: string;
  time: Date;
};
const MessageSchema = new mongoose.Schema(
  {
    room: {
      type: Number,
      required: true,
    },
    author: {
      firstName: String,
      lastName: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model<MessageDocument>("Message", MessageSchema);
