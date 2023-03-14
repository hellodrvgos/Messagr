import Message, { MessageDocument } from "../models/Message";

const createMessage = async (
  message: MessageDocument
): Promise<MessageDocument> => {
  return message.save();
};

const getMessageList = async (): Promise<MessageDocument[]> => {
  return Message.find();
};
export default { createMessage, getMessageList };
