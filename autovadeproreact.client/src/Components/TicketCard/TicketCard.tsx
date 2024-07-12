import React from 'react';
import Picture from '../../assets/Placeholders/TicketPicturePlaceholder.png';
import { Link } from 'react-router-dom';

interface CardProps {
    id: number;
    title: string;
    description: string;
    image: string | null;
    status: number;
}

const TicketCard: React.FC<CardProps> = ({ id, title, description, image, status }) => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <img
                    className="card-img-top"
                    src={image || Picture}
                    width="100%"
                    height="100%"
                    alt="Image Placeholder"
                />
                <div className="card-body">
                    <p className="card-text">{title}</p>
                    <p className="card-text">{description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={`/Ticket/Detail/${id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                            <Link to={`/Ticket/Edit/${id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                            {/* <Link to={`/Ticket/Delete/${id}`} className="btn btn-sm btn-outline-secondary">Delete</Link> */}
                        </div>
                        <small className="status-text">
                            {status==0?"Created":status==1?"Pending":status==2?"Done":"Closed"}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
