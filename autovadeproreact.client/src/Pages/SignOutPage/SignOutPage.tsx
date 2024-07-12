import React, { useEffect } from 'react'
import SignOut from '../../Components/SignOut/SignOut'
import { useNavigate } from 'react-router';
import { useUser } from '../../Components/UserContext/UserContext';

type Props = {}



const SignOutPage = (props: Props) => {
  const navigate = useNavigate();
  const { fetchUserStatus } = useUser();
  const signOutUser = async () => {
    try{
        const response = await fetch('https://localhost:7028/api/Users/SignOut', {
          method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Failed to sign in');
          }
          await fetchUserStatus();
          navigate('/');
    
        
    }
    catch (error) {
        console.error('Error submitting form:', error);
    }};
    useEffect(() => {
        signOutUser();
    }, []);
    navigate('/');
  return<></>;
}

export default SignOutPage