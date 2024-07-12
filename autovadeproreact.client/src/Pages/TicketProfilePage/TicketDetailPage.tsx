import React, { useState, useEffect } from 'react';
import Picture from "../../assets/Placeholders/TicketPicturePlaceholder.png";
import PicturePart from '../../assets/Placeholders/CarPartPicturePlaceholder.png'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import "../../common.css"
import { format, formatDistance, formatRelative, parseISO, subDays } from 'date-fns'
import { PartPopUp } from '../../Components/PartPopUp/PartPopUp';
import { DatePopUp } from "../../Components/DatePopUp/DatePopUp"
import { Button } from 'react-bootstrap';
import axios from 'axios';
import CarPartEntry from '../../Components/CarPartEntry/CarPartEntry';
import TimeSlotEntry from '../../Components/TimeSlotEntry/TimeSlotEntry';
import { redirect } from 'react-router-dom';
import { useUser } from '../../Components/UserContext/UserContext';

interface CarPart {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface User {
    id: number;
    name: string;
}

interface TimeSlot {
    id: number;
    slotBegining: string;
    slotEnding: string;
}

interface Ticket {
    id: number;
    title: string;
    description: string;
    image: string | null;
    status: number;
    carParts: CarPart[];
    user: User | null;
    deducedProblem: string | null;
    timeSlots: TimeSlot[];
    car: {
        brand: string;
        model: string;
        registrationId: string;
    };
    paidPrice: number | null;
}
let check=0;
const TicketDetailPage: React.FC<{}> = () => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [isPartPopUpOpen, setPartPopUpOpen] = useState<boolean>(false);
    const [isDatePopUpOpen, setDatePopUpOpen] = useState<boolean>(false);
    const navigate = useNavigate();
  function handleState() {
      useState("state Changed from child component!");
   }
   const { isLoggedIn, isAdmin } = useUser();

   const deleteTicket = async (event:any) => {
       event.preventDefault();

    try {
        const response = await axios.delete(`https://localhost:7028/api/Tickets/Delete/${ticketId}`,);
      console.log("Response:", response.data);
      
    } catch (error) {
      console.error("There was an error submitting the form:", error);
       }
       navigate("/Ticket/List/");

  };

    const id = useParams();
    if (!id.id) {
      return 
    }
    const ticketId = +id.id;
    useEffect(() => {
        // Fetch ticket details from the API
        const fetchTicketDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7028/api/Tickets/${ticketId}`);
                const data = await response.json();
                setTicket(data);
                calculateTotalCost(data.carParts);
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        fetchTicketDetails();
    }, [ticketId,isPartPopUpOpen,isDatePopUpOpen]);
    
    const goToSignIn = () => {
      navigate("/User/SignIn");
    }
    // const handleDeletePart = async (event:any) => {
    //   event.preventDefault();
    //   try {
    //     const response = await axios.post(`https://localhost:7028/api/Tickets/Part/Add/${id}`, partData);
    //     console.log("Response:", response.data);
        
    //   } catch (error) {
    //     console.error("There was an error submitting the form:", error);
    //   }
    //   onClose(event); // Close the popup after successful submission
    // };

    const calculateTotalCost = (carParts: CarPart[]) => {
        const total = carParts.reduce((acc, part) => acc + part.quantity * part.price, 0);
        setTotalCost(total);
    };

    if (!ticket) {
        return <div>Loading...</div>;
    }

    let linkToEmp = `/User/Detail/${ticket.user?.id}`;
    const leftToPay = totalCost - (ticket.paidPrice || 0);

    return (isLoggedIn?<div className="container-fluid">

        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h2 className="h5 mb-0"><a className="text-muted"></a> Ticket #{ticket.id}</h2>
          </div>
        

          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="mb-3 d-flex justify-content-between">
                    <div>
                      <span className="me-3">{ticket.title}</span>
                      <span className={ticket.status==0?'badge rounded-pill bg-primary':ticket.status==1?'badge rounded-pill bg-info':ticket.status==2?'badge rounded-pill bg-success':'badge rounded-pill bg-dark'}>
                        {ticket.status==0?'Created':ticket.status==1?'Pending':ticket.status==2?'Done':'Closed'}</span>
                        <PartPopUp id ={ticket.id} isOpen={isPartPopUpOpen} onClose={()=>setPartPopUpOpen(!isPartPopUpOpen) } rerender ={handleState}>
                            <h1>Bruh</h1>
                        </PartPopUp>
                        <DatePopUp id ={ticket.id} isOpen={isDatePopUpOpen} onClose={()=>setDatePopUpOpen(!isDatePopUpOpen) } rerender ={handleState}>
                          <h1>Bruh</h1>
                        </DatePopUp>
                    </div>
                    <div className="d-flex">
                      <Button className=" btn-danger" onClick={deleteTicket} >Delete</Button>
                    </div>
                  </div>
                  <table className="table table-borderless">
                    <tbody className='text-start'>
                        {ticket.carParts.map((part,key)=>{ key = part.id;
                            return (
                                <CarPartEntry id={key} name={part.name} quantity={part.quantity} price={part.price} rerender={handleState}></CarPartEntry>
                            );

                        })}
                        <tr>
                          <td><div className='d-grid'><Button className='btn-success ' onClick={()=>setPartPopUpOpen(!isPartPopUpOpen)}>Add</Button></div></td>
                          <td></td>
                          <td></td>
                            
                            {/* <td align='right'><Button className='btn-danger' onClick={handleDeletePart}>Remove</Button></td> */}
                        </tr>
                    </tbody>
                    <tfoot className='text-start'>
                      <tr>
                        <td >Subtotal</td>
                        <td className="text-end">${totalCost}</td>
                      </tr>
                      {ticket.paidPrice!=null?
                      
                      <tr>
                      <td >Paid</td>
                      <td className="text-danger text-end">-{ticket.paidPrice}$</td>
                    </tr>:null
                        }
                      
                      <tr className="fw-bold">
                        <td >TOTAL</td>
                        <td className="text-end">${totalCost - (ticket?.paidPrice || 0)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <table className="table table-borderless">
                    <tbody className='text-start'>
                        {ticket.timeSlots.map((slot)=>{
                            return (
                                <TimeSlotEntry id={slot.id} slotBegining={slot.slotBegining} slotEnding={slot.slotEnding} rerender={handleState}></TimeSlotEntry>
                            );

                        })}
                        <tr>
                          <td><Button className='btn-success' onClick={()=>setDatePopUpOpen(!isPartPopUpOpen)}>Add Slot</Button></td>
                            
                        </tr>
                        
                    </tbody>
                    </table>
            </div>
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6 align-left text-start">Ticket Description</h3>
                  <p className='text-start'>{ticket.description}</p>
                  <img
                height="100%"
                style={{ maxWidth: '200px' }}
                title="profile image"
                className="img-circle img-responsive"
                src={ticket.image ?ticket.image : Picture}
                alt="Profile"
              />
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body text-start">
                  <h3 className="h6 ">Car Details</h3>
                  <strong className='text-start'>{ticket.car.brand} {ticket.car.model} </strong>
                  <span><Link to="/CamFeed/47" className="text-decoration-underline" target="_blank">{ticket.car.registrationId}</Link> <i className="bi bi-box-arrow-up-right"></i> </span>
                  <hr/>
                  <h3 className="h6">Deduced Problem</h3>
                  <address>
                    {ticket.deducedProblem?ticket.deducedProblem:"Currently under investigation."}
                  </address>
                </div>
                
              </div>
              <div className="card mb-4 text-start">
                <div className="card-body">
                  <h3 className="h6 ">Assigned Employee</h3>
                  <Link to={linkToEmp} > #{ticket.user?.id} {ticket.user?.name}</Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
          </div>:<Navigate to="/User/SignIn"/>
    );
};

export default TicketDetailPage;
