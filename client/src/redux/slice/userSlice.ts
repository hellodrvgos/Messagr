import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
import { User } from "../../types/types";

type InitialState = {
  userList: User[];
  userDetail: User;
};
=======
import { User} from "../../types/types";

type InitialState ={
    userList: User[],
}
>>>>>>> 713e355b70fca057c5636c5bdf0ddb4858d042c9
const initialState: InitialState = {
  userList: [],
  userDetail: {
    _id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    isBanned: false,
    avatar: "",
    role: "",
    location: "",
    github: "",
    phone: 1,
  },
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserList: (state, action) => {
      state.userList = action.payload;
    },
    getUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
  },
});
export const userActions = usersSlice.actions;
const userReducer = usersSlice.reducer;
export default userReducer;
