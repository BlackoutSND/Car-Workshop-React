import React from 'react'
import UserProfile from '../../Components/UserProfile/UserProfile'
import { Navigate, useParams } from 'react-router';
import { useUser } from '../../Components/UserContext/UserContext';


const UserProfilePage = () => {
    const userId = useParams();

    if (!userId.id) {
      return 
    }
    const id = +userId.id;
    return (
      <UserProfile userId={id}/>
    
  )
}

export default UserProfilePage