import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

type Props = {}

const navigate = useNavigate();

const SignOut = (props: Props) => {
    const signOutUser = async () => {
    try{
        const response = await fetch('https://localhost:7028/api/Users/SignOut');
        if (!response.ok) {
            throw new Error('Failed to sign in');
          }
          await fetchUserStatus();
          navigate('');
    
        
    }
    catch (error) {
        console.error('Error submitting form:', error);
    }};
    useEffect(() => {
        signOutUser();
    }, []);
  return;
}

export default SignOut
function fetchUserStatus() {
    throw new Error('Function not implemented.');
}

