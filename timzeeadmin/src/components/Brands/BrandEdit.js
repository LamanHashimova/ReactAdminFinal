import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function BrandEdit(props) {
  const { id } = useParams();
  //Prop for api start
  const [name, setName] = useState();
  const [newName, setnewName] = useState();
  const [updatedBy, setupdatedBy] = useState();


  // let token = JSON.parse(localStorage.getItem('token'));

  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // };

  const bodyParameters = {

    Name: newName,
    UpdatedBy:updatedBy
  };

 


  function initPromise() {
    const response =axios.get(`http://localhost:44330/api/Brands/GetBrand/${id}`)
    
    return new Promise(function (res, rej) {
      res(response);
  })
 
  }

  async function update(e) {

    e.preventDefault();
 
    await axios.put(`http://localhost:44330/api/Brands/UpdateBrand/${id}`,
      bodyParameters,
      // config
    )
      .then(function (response) {

        Swal.fire(
          newName,
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
                setName(result.name) // "normalReturn"
            });
  });



  //Prop for api end
  return (
    <div className='container'>

      <Form onSubmit={(e) => update(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control type="text" onChange={(e) => setnewName(e.target.value)} defaultValue={name} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> UpdatedBy</Form.Label>
          <Form.Control placeholder="Enter User who update this brand" type="text" onChange={(e) => setupdatedBy(e.target.value)}  />
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-3' >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default BrandEdit