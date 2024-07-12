import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserDeletePage.css'; // You can use this to style your component similarly to your original CSS
import Picture from '../../assets/Placeholders/UserPicturePlaceholder.png';

interface User {
    id: number;
    image: string;
    name: string;
    surname: string;
    wage: number;
    ticketIds: number[] | null;
}

const UserDeletePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from the API
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://localhost:7028/api/Users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:7028/api/Users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                navigate('/User/List'); // Redirect to users list page after successful deletion
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
                <div className="image d-flex flex-column justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(`/User/Detail/${user.id}`)}
                    >
                        <img
                            src={user.image ? user.image : Picture}
                            height="100"
                            width="100"
                            alt="User"
                        />
                    </button>
                    <span className="name mt-3">{user.name} {user.surname}</span>
                    <span className="idd">#{user.id}</span>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span className="idd1">Wage: ${user.wage}</span>
                        <span><i className="fa fa-copy"></i></span>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span className="number">
                            <span className="follow">
                                {user.ticketIds && user.ticketIds.length > 0 ? (
                                    <a>Tickets: {user.ticketIds.length}</a>
                                ) : (
                                    <a>No tickets assigned</a>
                                )}
                            </span>
                        </span>
                    </div>
                    <div className="text mt-3">
                        <span>They can always come back...<br /><br />Or do they?</span>
                    </div>
                    <div className="d-flex mt-2">
                        <button className="btn btn-primary" type="button" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDeletePage;
