import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";


function MaterialEdit(props) {
    const { id } = useParams();
    //Prop for api start
    const [materialName, setmaterialName] = useState();
    const [newMaterialName, setnewMaterialName] = useState();
    const [updatedBy, setupdatedBy] = useState();
  
  
    // let token = JSON.parse(localStorage.getItem('token'));
  
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // };
  
    const bodyParameters = { 
        MaterialName: newMaterialName,
        UpdatedBy:updatedBy
    };
  
   
  
  
    function initPromise() {
      const response = axios.get(`http://lamanhashimovaa-001-site1.ctempurl.com/api/Materials/GetMaterial/${id}`)
      
      return new Promise(function (res, rej) {
        res(response);
    })
   
    }
  
    async function update(e) {
  
      e.preventDefault();
   
      await axios.put(`http://lamanhashimovaa-001-site1.ctempurl.com/api/Materials/UpdateMaterial/${id}`,
        bodyParameters,
        // config
      )
        .then(function (response) {
  
          Swal.fire(
            newMaterialName,
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
                setmaterialName(result.materialName) // "normalReturn" 
              });
    });
  return (
    <div className='container'>

    <Form onSubmit={(e) => update(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Material Name</Form.Label>
        <Form.Control type="text" onChange={(e) => setnewMaterialName(e.target.value)} defaultValue={materialName} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Updated By</Form.Label>
        <Form.Control placeholder="Enter User who update this material" type="text" onChange={(e) => setupdatedBy(e.target.value)}  />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-3' >
        Submit
      </Button>
    </Form>
  </div>
  )
}

export default MaterialEdit