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
// create or find user by email
const createOrFindUserByEmail = async (
  payload: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const userEmail = payload.email;
  const result = await User.findOne({ email: userEmail });
  if (result) {
    return result;
  } else {
    const user = new User({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    });
    return user.save();
  }
};
// update user information
const updateUserDetail = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(userId, update, { new: true });
};
//update userInformation by email
const updateUserByEmail = async (
  emailFromRequest: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const userEmail= {email: emailFromRequest}
  return User.findOneAndUpdate(userEmail, update, { new: true });
};

export default {
  createUser,
  findUserByEmail,
  findUserById,
  getUserList,
  createOrFindUserByEmail,
  updateUserDetail,
  updateUserByEmail,
};
