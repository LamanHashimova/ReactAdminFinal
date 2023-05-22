import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function SizeEdit(props) {
    const { id } = useParams();
    //Prop for api start
    const [sizeName, setsizeName] = useState();
    const [newSizeName, setnewSizeName] = useState();
    const [updatedBy, setupdatedBy] = useState();
  
  
    // let token = JSON.parse(localStorage.getItem('token'));
  
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // };
  
    const bodyParameters = { 
        SizeName: newSizeName,
        UpdatedBy:updatedBy
    };
  
   
  
  
    function initPromise() {
      const response = axios.get(`https://localhost:44330/api/Sizes/GetSize/${id}`)
      
      return new Promise(function (res, rej) {
        res(response);
    })
   
    }
  
    async function update(e) {
  
      e.preventDefault();
   
      await axios.put(`https://localhost:44330/api/Sizes/UpdateSize/${id}`,
        bodyParameters,
        // config
      )
        .then(function (response) {
  
          Swal.fire(
            newSizeName,
            'Updated',
            'success'
          )
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
  
        });
  
  
  
    };
  
  
  
    useEffect(() => {
    
      initPromise()
              .then(function (result) {
                  // "initResolve"
                  return result.data;
              })
              .then(function (result) {
                setsizeName(result.sizeName) // "normalReturn" 
              });
    });
  return (
    <div className='container'>

    <Form onSubmit={(e) => update(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Size Name</Form.Label>
        <Form.Control type="text" onChange={(e) => setnewSizeName(e.target.value)} defaultValue={sizeName} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Updated By</Form.Label>
        <Form.Control type="text" onChange={(e) => setupdatedBy(e.target.value)}  />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-3' >
        Submit
      </Button>
    </Form>
  </div>
  )
}

export default SizeEdit