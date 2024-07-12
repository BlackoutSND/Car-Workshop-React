import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    userId: number;
    fetchUserStatus: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
    children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(-1);

    const fetchUserStatus = async () => {
        try {
            const response = await fetch('https://localhost:7028/api/users/curuser'); 
            const data = await response.json();
            setIsAdmin(data.isAdmin);
            setUserId(data.id);
            setIsLoggedIn(data.id !== -1);
        } catch (error) {
            console.error('Error fetching user status:', error);
        }
    };

    useEffect(() => {
        fetchUserStatus();
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, isAdmin, userId, fetchUserStatus }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
