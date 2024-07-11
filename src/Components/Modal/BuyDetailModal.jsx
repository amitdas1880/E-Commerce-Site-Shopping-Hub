import React, { useState } from 'react';
import './Style.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function BuyDetailModal({name,address,pincode,phoneNumber,setName,setAddress,setPincode,setPhoneNumber,Buy_Now_Function}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
  <>
    <Button variant="success" className='buybtn' onClick={handleShow}>
        Buy Now
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Place Your Order</Modal.Title>
        </Modal.Header>
        <Form>
              <Modal.Body>
                  
                      <Form.Group className="mb-3" >
                        <Form.Label><strong>Enter Full Name:</strong></Form.Label>
                        <Form.Control type="text" name="name" id="name"
                        value={name} onChange={(e)=>setName(e.target.value)}
                         />
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label><strong>Enter Full Address:</strong></Form.Label>
                        <Form.Control type="text" name="address" id="address"
                        value={address} onChange={(e)=>setAddress(e.target.value)}
                         />
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label><strong>Enter Pincode:</strong></Form.Label>
                        <Form.Control type="text" name="pincode" id="pincode" 
                          value={pincode} onChange={(e)=>setPincode(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label><strong>Enter Mobile Number:</strong></Form.Label>
                        <Form.Control type="text" name="mobileNumber" id="mobileNumber" 
                          value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
                        />
                      </Form.Group>
                    
              </Modal.Body>
                  <Modal.Footer className='orderbtnFooter'>
                                <Button variant="success" className='orderbtn' onClick={()=>{Buy_Now_Function(),handleClose()}}>
                                    Order Now
                                </Button>
                  </Modal.Footer>
              </Form>

      </Modal>
  </>
  )
}

export default BuyDetailModal













/*

        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
            
              */