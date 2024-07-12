import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import "./PartPopUp.css";
import { Button } from "react-bootstrap";
import axios from "axios";



export function PartPopUp({id, isOpen, onClose,rerender, children}: {id:number, isOpen: boolean, onClose: any, children: any, rerender:any}) {
    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);



    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        const partData = {
          name,
          quantity: Number(quantity),
          price: Number(price),
        };
    
        try {
          const response = await axios.post(`https://localhost:7028/api/Tickets/Part/Add/${id}`, partData);
          console.log("Response:", response.data);
          
        } catch (error) {
          console.error("There was an error submitting the form:", error);
        }
        
        onClose(event); // Close the popup after successful submission
        
      };

    return (
        <>
          {
            isOpen ? (
              <div className="part-popup text-start">
                <div className="part-popup-inner">
                  <div className="part-popup-container">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group ">
                        <table>
                            <tr>
                                <th><label htmlFor="partName ">Part Name</label></th>
                                <th></th>
                                <th>
                                <input
                                    type="text"
                                    id="partName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    />
                                </th>
                            </tr>
                            <tr>
                                <th><label htmlFor="partQuantity">Quantity</label></th>
                                <th></th>
                                <th>
                                <input
                                    type="number"
                                    id="partQuantity"
                                    value={quantity}
                                    min="1" step="0.01"
                                    
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    required
                                    />
                                </th>
                            </tr>
                            <tr>
                                <th><label htmlFor="partPrice">Price</label></th>
                                <th></th>
                                <th>
                                <input
                                    type="number"
                                    id="partPrice"
                                    value={price}
                                    min="0" step="0.01"
                                    onChange={(e) => setPrice(parseInt(e.target.value))}
                                    required
                                    />
                                </th>
                            </tr>
                            <tr>
                                <th><Button className="btn-success" type="submit">Submit</Button></th>
                                <th></th>
                                <th align="right" ><Button className="part-popup-close btn-danger" onClick={onClose}>Close</Button></th>
                            </tr>
                        </table>   
                      </div>                  
                      <div className="part-popup-controls">
                        
                        
                      </div>
                    </form>
                  </div>
                  {children}
                </div>
              </div>
            ) : null
        }
    </>
  );
}