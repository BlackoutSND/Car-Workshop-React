import React, { useState, useEffect } from 'react';
import Card from '../TicketCard/TicketCard';
import TicketCard from '../TicketCard/TicketCard';

interface Ticket {
    id: number;
    title: string;
    description: string;
    image: string | null;
    status: number;
}

const TicketList: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('https://localhost:7028/api/Tickets');
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="album py-5 bg-body-tertiary">
            <div className="container">
                <div className="row">
                    {tickets.map(ticket => (
                        <TicketCard
                            key={ticket.id}
                            id={ticket.id}
                            title={ticket.title}
                            description={ticket.description}
                            image={ticket.image}
                            status={ticket.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicketList;
