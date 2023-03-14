import axios from "axios"
import { AppDispatch } from "../store";
import { userActions } from '../slice/userSlice';

export default function fetchUsersData(){
    
    const url = `http://localhost:8000/users`;
    return (dispatch: AppDispatch) => {
        axios.get(url)
        .then((res)=> res.data)
        .then((data)=> dispatch(userActions.getUserList(data)));
    }
}
