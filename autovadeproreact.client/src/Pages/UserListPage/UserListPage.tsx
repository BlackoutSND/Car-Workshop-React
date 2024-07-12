import React from 'react'
import UserList from '../../Components/UserList/UserList'
import { useUser } from '../../Components/UserContext/UserContext'
import { Navigate } from 'react-router'

type Props = {}

const UserListPage = (props: Props) => {
  const {isLoggedIn} = useUser();
  return (isLoggedIn?
    <UserList />:<Navigate to="/User/SignIn"/>
  )
}
export default UserListPage