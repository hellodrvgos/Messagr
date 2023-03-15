import { createSlice } from "@reduxjs/toolkit";

import { User} from "../../types/types";

type InitialState = {
    userInfo: User
}

const initialState: InitialState = {
    userInfo: {
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
        phone: 0,
    },
}

const userInfoSlice = createSlice({
    name: "userInformation",
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
})

export const userInfoActions = userInfoSlice.actions;

const reducer = userInfoSlice.reducer;

export default reducer;