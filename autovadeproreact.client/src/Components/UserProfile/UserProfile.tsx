import React, { useState, useEffect } from 'react';
import "../../common.css"
import Picture from "../../assets/Placeholders/UserPicturePlaceholder.png"
import { format, parseISO } from 'date-fns';
interface User {
  id: number;
  name: string;
  surname: string;
  wage: number;
  isAdmin: boolean;
  image: string | null;
  tickets: Ticket[];
}

interface Ticket {
  id: number;
  title: string;
  timeSlots: TimeSlot[];
  approximatePrice: number;
  status: number;
}

interface TimeSlot {
  slotBegining: string;
  slotEnding: string;
}

interface UserProfileProps {
  userId: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:7028/api/Users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const assignedTickets = user.tickets.filter(ticket => ticket.status === 1 || ticket.status === 0).length;
  const doneTickets = user.tickets.filter(ticket => ticket.status === 2 || ticket.status === 3).length;

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="col-sm-10">
          <h1>Employee #{user.id} {user.name}</h1>
        </div>
        <div>
            <a className="d-flex">
              <img
                height="100%"
                style={{ maxWidth: '175px' }}
                title="profile image"
                className="img-circle img-responsive"
                src={user.image ?user.image : Picture}
                alt="Profile"
              />
            </a>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <ul className="list-group">
            <li className="list-group-item text-muted">Profile</li>
            <li className="list-group-item text-right">
              <span className="pull-left"><strong>Full Name</strong></span> {user.name} {user.surname}
            </li>
            <li className="list-group-item text-right">
              <span className="pull-left"><strong>Wage</strong></span> {user.wage} $
            </li>
            <li className="list-group-item text-right">
              <span className="pull-left"><strong>Has Admin Rights?</strong></span> {user.isAdmin ? 'Yes' : 'No'}
            </li>
          </ul>
          <br />
          <ul className="list-group">
            <li className="list-group-item text-muted">Tickets Statistic <i className="fa fa-dashboard fa-1x"></i></li>
            <li className="list-group-item text-right">
              <span className="pull-left"><strong>Assigned</strong></span> {assignedTickets}
            </li>
            <li className="list-group-item text-right">
              <span className="pull-left"><strong>Done</strong></span> {doneTickets}
            </li>
          </ul>
        </div>
        <div className="col-sm-9">
          <div className="tab-content">
            <div className="tab-pane active" id="home">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Ticket Id</th>
                      <th>Title</th>
                      <th>Time Slots</th>
                      <th>Status</th>
                      <th>Show Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.tickets.map((ticket, index) => (
                      <tr key={ticket.id}>
                        <td>{index + 1}</td>
                        <td>{ticket.id}</td>
                        <td>{ticket.title}</td>
                        <td>
                          {ticket.timeSlots.length > 0 ? (
                            ticket.timeSlots.map((slot, idx) => (
                              <div key={idx}>
                                <td><strong>From:</strong> {format(parseISO(slot.slotBegining),'MM/dd/yyyy hh:mmbb').toString()}</td>
                                <td><strong>Till:</strong> {format(parseISO(slot.slotEnding),'MM/dd/yyyy hh:mmbb').toString()}</td>
                              </div>
                            ))
                          ) : (
                            <strong>No Assigned slots!</strong>
                          )}
                        </td>
                        <td>{ticket.status==0?"Created":ticket.status==1?"Pending":ticket.status==2?"Done":"Closed"}</td>
                        <td><a href={`/Ticket/Detail/${ticket.id}`} >View</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
