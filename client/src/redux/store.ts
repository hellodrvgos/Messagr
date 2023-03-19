import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import userInformationReducer from "./slice/userInformation";

const store = configureStore({
  reducer: {
    users: userReducer,
    userinformation: userInformationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
