import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function BlogCreate() {
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [createdby, setCreatedby] = useState();




    const bodyParameters = {
        Image: image,
        Title: title,
        Description: description,
        CreatedBy:createdby
    };
    //Prop for api end

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.replace('data:', '')
                .replace(/^.+,/, ''))
            reader.onerror = error => reject(error);
        });
    }

    async function create(e) {
        e.preventDefault();
   
        await axios.post(`http://lamanhashimovaa-001-site1.ctempurl.com/api/Blogs/CreateBlog` ,
        bodyParameters   
    ,{
        headers: {
          'Content-Type': 'application/json' // Set the content type to multipart/form-data
        }}
        )
        .then(function (response) {

            Swal.fire(
                '',
                'Created',
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

    function base64Img(file) {
        var base64String = getBase64(file);
        base64String.then(function (result) {
            setImage(result)
        });

    }



  return (
    <div className='container'>
    <Form onSubmit={(e) => create(e)}>


        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={(e) => base64Img(e.target.files[0])} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Blog Title" onChange={(e) => setTitle(e.target.value)} defaultValue={title}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Blog Description" onChange={(e) => setDescription(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Created By</Form.Label>
        <Form.Control type="text" placeholder="Enter User who create this blog" onChange={(e) => setCreatedby(e.target.value)} />
      </Form.Group>
        <Button variant="primary" type="submit" className='mt-3' >
            Submit
        </Button>
    </Form>
</div>
  )
}

export default BlogCreate