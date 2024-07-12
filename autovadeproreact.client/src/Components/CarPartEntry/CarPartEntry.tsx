import React, { useState } from 'react'
import PicturePart from '../../assets/Placeholders/CarPartPicturePlaceholder.png'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TicketDetailPage from '../../Pages/TicketProfilePage/TicketDetailPage';

interface Part {
    id: number;
    name: string;
    quantity: number;
    price: number;
    rerender:any;
}

const CarPartEntry = (part: Part) => {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const handleDeletePart = async (event:any) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`https://localhost:7028/api/Tickets/CarPart/Delete/${part.id}`,);
          console.log("Response:", response.data);
          
        } catch (error) {
          console.error("There was an error submitting the form:", error);
        }
        setIsDeleted(true);
        () => part.rerender();
      };

  return (isDeleted ? null :
    <tr>
                                    <td>
                                        <div className="d-flex mb-2">
                                            <div className="flex-shrink-0">
                                                <img src={PicturePart} alt="" width="35" className="img-fluid" />
                                            </div>
                                            <div className="flex-lg-grow-1 ms-3">
                                                <h6 className="small mb-0">
                                                    <a className="text-reset ">
                                                        {part.name}
                                                    </a>
                                                </h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{part.quantity} pcs.</td>
                                    <td className="text-end">${part.price}</td>
                                    <td align='right'><Button className='btn-danger' onClick={handleDeletePart}>Remove</Button></td>
                                </tr>
  )
}

export default CarPartEntry