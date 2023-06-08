import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function TypeCreate() {
    const [typename, setTypename] = useState();
    const [createdby, setCreatedby] = useState();
    // let token = JSON.parse(localStorage.getItem('token'))
  
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
  
    const bodyParameters = {
        TypeName: typename,
        CreatedBy:createdby
    };
  
  
    async function create(e) {
      e.preventDefault();
  
      await axios.post('http://lamanhashimovaa-001-site1.ctempurl.com/api/Types/CreateType',
        bodyParameters
        // config
      )
        .then(function (response) {
  
          Swal.fire(
            typename,
           
            'Created',
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
  return (
    <div className='container'>
    <Form onSubmit={(e) => create(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Type Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Type Name" onChange={(e) => setTypename(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Created By</Form.Label>
        <Form.Control type="text" placeholder="Enter User who create this type" onChange={(e) => setCreatedby(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-3' >
        Submit
      </Button>
    </Form>
  </div>
  )
}

export default TypeCreate