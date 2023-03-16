import { createSlice } from "@reduxjs/toolkit";

import { User} from "../../types/types";

type InitialState = {
    userInfo: User
}

const initialState: InitialState = {
    userInfo: {
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
        gitHub: "",
        phone: "",
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