import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function SettingEdit(props) {
    const { id } = useParams();
    const [key, setKey] = useState();
    const [value, setValue] = useState();
    const [updatedBy, setupdatedBy] = useState();

    
    const bodyParameters = {
        Key: key,
        Value: value,
        UpdatedBy:updatedBy
    };

    async function update(e) {
        e.preventDefault();
       
        await axios.put(`https://localhost:44330/api/Settings/UpdateSetting/${id}`,
          bodyParameters
          
        )
          .then(function (response) {
    
            Swal.fire(
              '',
              'Updated',
              'success'
            )
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
    
          });
    
    
    
    
      };

      function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.replace('data:', '')
                .replace(/^.+,/, ''))
            reader.onerror = error => reject(error);
        });
    }
    function base64Img(file) {
        var base64String = getBase64(file);
        base64String.then(function (result) {
            setKey(result)
        });

    }
  return (
    <div className='container'>
    {/* <div>
    <img style={{width:'100px', height:'70px',borderRadius:'unset'}} src={`data:image/jpeg;base64,${loadproducts?.mainImage}`} />

    </div> */}
    <Form onSubmit={(e) => update(e)}>

    <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>MainImage</Form.Label>
            <Form.Control type="file" onChange={(e) => base64Img(e.target.files[0])} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Brand Name" onChange={(e) => setKey(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Brand Name" onChange={(e) => setValue(e.target.value)} />
        </Form.Group>

 

        <Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Created By</Form.Label>
<Form.Control type="text" placeholder="Enter User who create this color" onChange={(e) => setupdatedBy(e.target.value)} />
</Form.Group>


        <Button variant="primary" type="submit" className='mt-3' >
            Submit
        </Button>
    </Form>
  </div>
  )
}

export default SettingEdit