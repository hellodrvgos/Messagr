import { createSlice } from "@reduxjs/toolkit";

import { User} from "../../types/types";

type InitialState ={
    userList: User[],
}
const initialState: InitialState = {
    userList: []
}
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUserList: (state, action) =>{
            state.userList = action.payload;
        },
    }
})
export const userActions = usersSlice.actions;
const userReducer = usersSlice.reducer;
export default userReducer;