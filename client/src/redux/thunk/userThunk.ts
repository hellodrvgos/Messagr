import axios from "axios";
import { AppDispatch } from "../store";
import { userActions } from "../slice/userSlice";

export default function fetchUsersData(){
    const token = localStorage.getItem("token");
    const url = `http://localhost:8002/users`;
    return (dispatch: AppDispatch) => {
        axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
        .then((res)=> res.data)
        .then((data)=> dispatch(userActions.getUserList(data)));
    }
}
