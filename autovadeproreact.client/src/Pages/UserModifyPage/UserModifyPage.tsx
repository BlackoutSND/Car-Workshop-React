import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Picture from '../../assets/Placeholders/UserPicturePlaceholder.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../../Components/UserContext/UserContext';

interface FormDataState {
    login: string;
    password: string;
    name: string;
    surname: string;
    wage: number;
    isAdmin: boolean;
    image: File | null;
}

const UserModifyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const {isLoggedIn, isAdmin} = useUser();
    const [formData, setFormData] = useState<FormDataState>({
        login: '',
        password: '',
        name: '',
        surname: '',
        wage: 0,
        isAdmin: false,
        image: null
    });
    const navigate = useNavigate(); 
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        // Fetch the current user data from the server and set it in state
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://localhost:7028/api/Users/${id}`);
                const data = await response.json();
                setFormData({
                    login: data.login,
                    password: '',
                    name: data.name,
                    surname: data.surname,
                    wage: data.wage,
                    isAdmin: data.isAdmin,
                    image: null
                });
                if (data.imageURL) {
                    setImagePreview(data.imageURL);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({
                    ...formData,
                    image: file
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('Login', formData.login);
        formDataToSend.append('Password', formData.password);
        formDataToSend.append('Name', formData.name);
        formDataToSend.append('Surname', formData.surname);
        formDataToSend.append('Wage', formData.wage.toString());
        formDataToSend.append('IsAdmin', formData.isAdmin.toString());
        if (formData.image) {
            formDataToSend.append('Image', formData.image, formData.image.name);
        }

        try {
            const response = await fetch(`https://localhost:7028/api/Users/${id}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*'
                },
                body: formDataToSend
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User updated successfully:', result);
                navigate('/User/List');
            } else {
                console.error('Error updating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
        
    };

    return (
        <div className="container-xl px-4 mt-4">
            <form onSubmit={handleSubmit}>
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <label className="card-header">User picture</label>
                            <div className="card-body text-center">
                                {imagePreview ? (
                                    <img
                                        className="img-ticket-add"
                                        width="40%"
                                        height="70%"
                                        src={imagePreview as string}
                                        alt="User"
                                    />
                                ) : (
                                    <img
                                        className="img-ticket-add"
                                        width="40%"
                                        height="70%"
                                        src={Picture}
                                        alt="User"
                                    />
                                )}
                                <div className="small font-italic text-muted mb-4">
                                    JPG, GIF, or PNG no larger than 5 MB
                                </div>
                                <input
                                    type="file"
                                    className="btn btn-primary"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="small mb-1">Login</label>
                                    <input
                                        name="login"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Worker's username"
                                        value={formData.login}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1">Password</label>
                                    <input
                                        name="password"
                                        className="form-control"
                                        type="password"
                                        placeholder="Enter Worker's password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">
                                            First name
                                        </label>
                                        <input
                                            name="name"
                                            className="form-control"
                                            id="inputFirstName"
                                            type="text"
                                            placeholder="Enter Worker's first name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLastName">
                                            Last name
                                        </label>
                                        <input
                                            name="surname"
                                            className="form-control"
                                            id="inputLastName"
                                            type="text"
                                            placeholder="Enter Worker's last name"
                                            value={formData.surname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputWage">
                                            Wage ($/hr)
                                        </label>
                                        <input
                                            name="wage"
                                            className="form-control"
                                            id="inputWage"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter Worker's Wage"
                                            value={formData.wage}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputHasAdminRights">
                                            Has admin rights?
                                        </label>
                                        <br />
                                        <input
                                            name="isAdmin"
                                            id="inputHasAdminRights"
                                            type="checkbox"
                                            checked={formData.isAdmin}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserModifyPage;
