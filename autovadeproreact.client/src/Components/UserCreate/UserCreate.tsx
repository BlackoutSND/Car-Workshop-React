import React, { useState, ChangeEvent, FormEvent } from 'react';
import Picture from "../../assets/Placeholders/UserPicturePlaceholder.png"
import "../../common.css"
import "./UserCreate.css"
import { useNavigate } from 'react-router-dom';

interface FormData {
    image: File | null;
    login: string;
    password: string;
    name: string;
    surname: string;
    wage: number;
    isAdmin: boolean;
}

interface FormErrors {
    image?: string;
    login?: string;
    password?: string;
    name?: string;
    surname?: string;
    wage?: string;
    isAdmin?: string;
}

const CreateUserForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        
        login: '',
        password: '',
        name: '',
        surname: '',
        wage: 5.0,
        isAdmin: false,
        image: null
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }
    };

    const validate = () => {
        let tempErrors: FormErrors = {};
        if (!formData.login) tempErrors.login = "Login is required";
        if (!formData.password) tempErrors.password = "Password is required";
        if (!formData.name) tempErrors.name = "First name is required";
        if (!formData.surname) tempErrors.surname = "Last name is required";
        if (formData.wage <= 0) tempErrors.wage = "Wage must be greater than 0";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key as keyof FormData] !== null) {
                    formDataToSend.append(key, formData[key as keyof FormData] as string | Blob);
                }
            });

            try {
                const response = await fetch('https://localhost:7028/api/Users', {
                    method: 'POST',
                    body: formDataToSend,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log('Form submitted successfully:', result);
                navigate('/User/List');
                // Handle successful form submission (e.g., show a success message, redirect, etc.)
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error during form submission (e.g., show an error message)
            }
        }
    };

    return (
        <div className="container-xl px-4 mt-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <label className="card-header">User picture</label>
                            <div className="card-body text-center">
                                <img
                                    className="img-ticket-add"
                                    width="40%"
                                    height="70%"
                                    src={formData.image ? URL.createObjectURL(formData.image) : Picture}
                                    alt=""
                                />
                                <div className="small font-italic text-muted mb-4 " >JPG or PNG no larger than 5 MB</div>
                                <input
                                    name="image"
                                    type="file"
                                    className="btn btn-primary btn-pick-image"
                                    onChange={handleFileChange}
                                />
                                {errors.image && <span className="text-danger">{errors.image}</span>}
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
                                    {errors.login && <span className="text-danger">{errors.login}</span>}
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
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1">First name</label>
                                        <input
                                            name="name"
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Worker's first name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <span className="text-danger">{errors.name}</span>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1">Last name</label>
                                        <input
                                            name="surname"
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Worker's last name"
                                            value={formData.surname}
                                            onChange={handleChange}
                                        />
                                        {errors.surname && <span className="text-danger">{errors.surname}</span>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1">Wage ($/hr)</label>
                                        <input
                                            name="wage"
                                            className="form-control"
                                            type="number"
                                            placeholder="Enter Worker's Wage"
                                            value={formData.wage}
                                            onChange={handleChange}
                                        />
                                        {errors.wage && <span className="text-danger">{errors.wage}</span>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1">Has admin rights?</label>
                                        <br />
                                        <input
                                            name="isAdmin"
                                            type="checkbox"
                                            checked={formData.isAdmin}
                                            onChange={handleChange}
                                        />
                                        {errors.isAdmin && <span className="text-danger">{errors.isAdmin}</span>}
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateUserForm;
