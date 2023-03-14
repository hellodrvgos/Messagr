import User, { UserDocument } from "../models/User";

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  const foundUser = User.findOne({ email: email });
  return foundUser;
};

const findUserById = async (id: string): Promise<UserDocument | null> => {
  const foundUser = User.findOne({ _id: id });
  return foundUser;
};
// get user list
const getUserList = async (): Promise<UserDocument[]> => {
  return User.find();
};
export default { createUser, findUserByEmail, findUserById, getUserList };
