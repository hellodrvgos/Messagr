import { createSlice } from "@reduxjs/toolkit";

import { User} from "../../types/types";

type InitialState = {
    userInfo: User,
    loginInfo: boolean,
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
    loginInfo: false,
}

const userInfoSlice = createSlice({
    name: "userInformation",
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        getLogInInfo: (state, action)=>{
            state.loginInfo = action.payload;
            localStorage.setItem("loginInfo", JSON.stringify(state.loginInfo))
        }
    }
})

export const userInfoActions = userInfoSlice.actions;

const reducer = userInfoSlice.reducer;

export default reducer;