import React, { useState } from 'react'
import PicturePart from '../../assets/Placeholders/CarPartPicturePlaceholder.png'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TicketDetailPage from '../../Pages/TicketProfilePage/TicketDetailPage';
import { format, parseISO } from 'date-fns';

interface TimeSlot {
    id: number;
    slotBegining: string;
    slotEnding: string;
    rerender:any;
}

const TimeSlotEntry = (slot: TimeSlot) => {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const handleDeleteSlot = async (event:any) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`https://localhost:7028/api/Tickets/TimeSlot/Delete${slot.id}`,);
          console.log("Response:", response.data);
          
        } catch (error) {
          console.error("There was an error submitting the form:", error);
        }
        setIsDeleted(true);
        () => slot.rerender();
      };

  return (isDeleted ? null :
    <tr>
                                   <tr>
                                    <td>
                                        <div className="d-flex mb-2">
                                            <td><strong>From:</strong> {format(parseISO(slot.slotBegining),'MM/dd/yyyy hh:mmbb').toString()}</td>
                                            <td><strong>Till:</strong> {format(parseISO(slot.slotEnding),'MM/dd/yyyy hh:mmbb').toString()}</td>
                                            <td><Button className='btn-danger' onClick={handleDeleteSlot}>Remove</Button></td>
                                        </div>
                                    </td>
                                </tr>
    </tr>
  )
}

export default TimeSlotEntry