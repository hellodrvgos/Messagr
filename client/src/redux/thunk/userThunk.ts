import { AppDispatch } from "../store";
import { userActions } from "../slice/userSlice";

export default function fetchUsersData() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id") || "{}";
  const url = `http://localhost:8002/users/userlist/${id}`;
  return async (dispatch: AppDispatch) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userListData = await res.json();
    dispatch(userActions.getUserList(userListData));
  };
}
