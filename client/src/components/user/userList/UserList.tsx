import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/store";
import fetchUsersData from "../../../redux/thunk/userThunk";

export default function UserList() {
    const userList = useSelector((state: RootState)=> state.users.userList);
    //console.log(userList,"uerLisrt")
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(fetchUsersData())
    }, [dispatch])
    return (
      <div>
       {
        userList.map((user)=>{
            return <div>
                <p>{user.firstName}</p>
                <p>{user.location}</p>
                <p>{user.phone}</p>
            </div>
        })
       }
      </div>
    );
  }
  