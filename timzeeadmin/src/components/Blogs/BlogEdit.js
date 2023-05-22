import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function BlogEdit(props) {
    const { id } = useParams();

    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [updatedBy, setupdatedBy] = useState();
  
  
  
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
        setImage(result)
      });
  
    }
    const bodyParameters = {
      Image: image,
      Title: title,
      Description: description,
      UpdatedBy:updatedBy
    };
  
  
    async function update(e) {
      e.preventDefault();
     
      await axios.put(`https://localhost:44330/api/Blogs/UpdateBlog/${id}`,
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
  

  
  return (
    <div className='container'>
   
      <Form onSubmit={(e) => update(e)}>


        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e) => base64Img(e.target.files[0])} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} defaultValue={title}  />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} defaultValue={description} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> UpdatedBy</Form.Label>
          <Form.Control type="text" placeholder="Enter User who update this blog" onChange={(e) => setupdatedBy(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3' >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default BlogEdit