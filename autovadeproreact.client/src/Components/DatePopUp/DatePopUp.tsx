import { FormEvent, useState } from "react";
import "./DatePopUp.css";
import { Button } from "react-bootstrap";
import axios from "axios";

export function DatePopUp({ id, isOpen, onClose, rerender, children }: { id: number, isOpen: boolean, onClose: any, children: any, rerender: any }) {
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Construct the data payload with ISO date format
    const partData = {
      id: 0,  // Assuming id is 0, you might want to adjust this
      slotBegining: new Date(dateStart).toISOString(),
      slotEnding: new Date(dateEnd).toISOString(),
    };

    try {
      const response = await axios.post(`https://localhost:7028/api/Tickets/TimeSlot/Add?id=${id}`, partData, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json-patch+json'
        }
      });
      console.log("Response:", response.data);
      onClose(); // Close the popup after successful submission
      rerender(); // Trigger re-render in the parent component
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="part-popup text-start">
          <div className="part-popup-inner">
            <div className="part-popup-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <table>
                    <tbody>
                      <tr>
                        <th><label htmlFor="dateStart">Start Date</label></th>
                        <th></th>
                        <th>
                          <input
                            type="datetime-local"
                            id="dateStart"
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                            required
                          />
                        </th>
                      </tr>
                      <tr>
                        <th><label htmlFor="dateEnd">End Date</label></th>
                        <th></th>
                        <th>
                          <input
                            type="datetime-local"
                            id="dateEnd"
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                            required
                          />
                        </th>
                      </tr>
                      <tr>
                        <th><Button className="btn-success" type="submit">Submit</Button></th>
                        <th></th>
                        <th align="right">
                          <Button className="part-popup-close btn-danger" onClick={onClose}>Close</Button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}