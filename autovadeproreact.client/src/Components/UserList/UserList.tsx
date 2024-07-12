// UserList.tsx
import React, { useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import { User } from '../../misc/types'
import { useUser } from '../UserContext/UserContext';

const UserList: React.FC = () => {
    const { isLoggedIn, isAdmin } = useUser();
    const [users, setUsers] = useState<User[]>([]);
    //const [isAdmin, setIsAdmin] = useState<boolean>(false);

    

    useEffect(() => {
        // Fetch user data from the server
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://localhost:7028/api/users'); // Adjust the URL according to your API endpoint
                const data: User[] = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {users.map(user => (
                    <UserCard key={user.id} user={user} isAdmin={isAdmin} />
                ))}
            </div>
        </div>
    );
};

export default UserList;