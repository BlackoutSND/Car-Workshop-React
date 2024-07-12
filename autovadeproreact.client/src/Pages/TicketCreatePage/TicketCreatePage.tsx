import React, { useState, ChangeEvent, FormEvent } from 'react';
import Picture from "../../assets/Placeholders/TicketPicturePlaceholder.png"
import { useNavigate } from 'react-router-dom';
import "../../common.css"

interface FormDataState {
    title: string;
    description: string;
    carBrand: string;
    carModel: string;
    carRegistrationId: string;
    userId: number;
    image: File | null;
}

const CreateTicketPage: React.FC = () => {
    const [formData, setFormData] = useState<FormDataState>({
        title: '',
        description: '',
        carBrand: '',
        carModel: '',
        carRegistrationId: '',
        userId: 0,
        image: null,
    });

    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(Picture);
    const navigate = useNavigate();
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseInt(value, 10) : value,
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
                    image: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            Title: formData.title,
            Description: formData.description,
            'Car.Brand': formData.carBrand,
            'Car.Model': formData.carModel,
            'Car.RegistrationId': formData.carRegistrationId,
            UserId: formData.userId.toString(),
        }).toString();

        const url = `https://localhost:7028/api/Tickets/Create?${queryParams}`;

        const formDataToSend = new FormData();
        if (formData.image) {
            formDataToSend.append('Image', formData.image, formData.image.name);
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Ticket created successfully:', result);
                navigate('/Ticket/List');
            } else {
                console.error('Error creating ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
        navigate("/Ticket/List/");
    };

    return (
        <div className="container-xl px-4 mt-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <label className="card-header">Car Picture</label>
                            <div className="card-body text-center">
                                <img
                                    className="img-ticket-add"
                                    width="40%"
                                    height="70%"
                                    src={imagePreview as string}
                                    alt="Car"
                                />
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <input
                                    name="image"
                                    type="file"
                                    className="btn btn-primary"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Ticket Details</div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="small mb-1">Title</label>
                                    <input
                                        name="title"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Ticket's title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-ticket-description">Description</label>
                                    <input
                                        name="description"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Ticket's Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1">Car Brand</label>
                                        <input
                                            name="carBrand"
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Car's Brand"
                                            value={formData.carBrand}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1">Car Model</label>
                                        <input
                                            name="carModel"
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Car's Model"
                                            value={formData.carModel}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1">Car Registration Id</label>
                                        <input
                                            name="carRegistrationId"
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Car's Registration Id"
                                            value={formData.carRegistrationId}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1">Assigned Employee Id</label>
                                        <input
                                            name="userId"
                                            className="form-control"
                                            type="number"
                                            placeholder="Enter Employee's Id"
                                            value={formData.userId}
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

export default CreateTicketPage;
