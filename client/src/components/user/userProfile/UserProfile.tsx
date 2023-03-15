import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../../../redux/store";
import { getUserInformation } from "../../../redux/thunk/userInformation";

export default function UserProfile() {
    const userInfo = useSelector((state: RootState)=> state.userinformation.userInfo);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(getUserInformation())
    }, [dispatch])
    return (
      <div>
        <p>{userInfo.firstName}</p>
        <p>{userInfo.location}</p>
        <p>{userInfo.phone}</p>
        <p>{userInfo.role}</p>
        {userInfo.isAdmin? 
        <Link to={`/user-list`}>User List</Link>
        :null}
      </div>
    );
  }
  