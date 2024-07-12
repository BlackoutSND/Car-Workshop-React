import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Picture from '../../assets/Placeholders/TicketPicturePlaceholder.png';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useUser } from '../../Components/UserContext/UserContext';

interface FormDataState {
    id: number;
    title: string;
    description: string;
    userId: number;
    deducedProblem: string;
    paidPrice: number;
    status: number;
    image?: File | null;
}

const EditTicket: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<FormDataState>({
        id: 0,
        title: '',
        description: '',
        userId: 0,
        deducedProblem: '',
        paidPrice: 0,
        image: null,
        status:0
    });
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const { isLoggedIn, isAdmin } = useUser();
    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await axios.get(`https://localhost:7028/api/Tickets/${id}`);
                const data: FormDataState = response.data;
                setFormData({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    userId: data.userId,
                    deducedProblem: data.deducedProblem,
                    paidPrice: data.paidPrice,
                    status: data.status,
                    image: null
                });
                if (data.image) {
                    setImagePreview(data.image.toString()); //a bit diff
                }
            } catch (error) {
                console.error('Error fetching ticket data:', error);
            }
        };

        fetchTicketData();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseFloat(value) : value  //also a bit diff
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
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('userId', formData.userId.toString());
        formDataToSend.append('deducedProblem', formData.deducedProblem);
        if (formData.paidPrice != null)
            formDataToSend.append('paidPrice', formData.paidPrice.toString());
        else
            formDataToSend.append('paidPrice', '0');
        if (formData.image) {
            formDataToSend.append('image', formData.image, formData.image.name);
        }

        try {
            const response = await axios.put(`https://localhost:7028/api/Tickets/Edit/${formData.id}`, formDataToSend);
            console.log('Success:', response.data);
            navigate('/Ticket/List');
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (isLoggedIn?
        <div className="container-xl px-4 mt-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <label className="card-header">Ticket Picture</label>
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
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <input type="file" className="btn btn-primary" onChange={handleFileChange} />
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
                                <div className="mb-3">
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
                                <div className="mb-3">
                                    <label className="text-ticket-description">Deduced Problem</label>
                                    <input
                                        name="deducedProblem"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter the Deduced Problem"
                                        value={formData.deducedProblem}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1">Paid Price</label>
                                    <input
                                        name="paidPrice"
                                        className="form-control"
                                        type="number"
                                        min="0"
                                        step=".01"
                                        placeholder="Enter the price paid by customer"
                                        value={formData.paidPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className="btn btn-primary" type="submit">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>:<Navigate to="/User/SignIn"/>
    );
};

export default EditTicket;
