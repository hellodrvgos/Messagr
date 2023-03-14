import { Request, Response } from "express";
import MessageServices from "../services/messages";
import Message from "../models/Message";

export const createMessageController = async (req: Request, res: Response) => {
  try {
    const { room, firstName, lastName, message } = req.body;
    const newMessage = new Message({
      room: room,
      author: {
        firstName: firstName,
        lastName: lastName,
        message: message,
      },
    });
    const msg = await MessageServices.createMessage(newMessage);
    res.status(200).json(msg);
  } catch (error) {
    console.log(error);
  }
};

export const getMessageListController = async (req: Request, res: Response) => {
  try {
    const messageList = await MessageServices.getMessageList();
    res.status(200).json(messageList);
  } catch (error) {
    console.log(error);
  }
};
