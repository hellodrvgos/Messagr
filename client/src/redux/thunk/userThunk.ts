import axios from "axios";
import { AppDispatch } from "../store";
import { userActions } from "../slice/userSlice";

<<<<<<< HEAD
export default function fetchUsersData() {
  const url = `http://localhost:8002/users`;
  return (dispatch: AppDispatch) => {
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => dispatch(userActions.getUserList(data)));
  };
=======
export default function fetchUsersData(){
    const token = localStorage.getItem("token");
    const url = `http://localhost:8002/users`;
    return (dispatch: AppDispatch) => {
        axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
        .then((res)=> res.data)
        .then((data)=> dispatch(userActions.getUserList(data)));
    }
>>>>>>> 713e355b70fca057c5636c5bdf0ddb4858d042c9
}
