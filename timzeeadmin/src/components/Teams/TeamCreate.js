import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function TeamCreate() {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [position, setPosition] = useState();
    const [facebookLink, setFacebookLink] = useState();
    const [twitterLink, setTwitterLink] = useState();
    const [pinterestLink, setPinterestLink] = useState();
    const [youtubeLink, setYoutubeLink] = useState();
    const [createdby, setCreatedby] = useState();



    const bodyParameters = {
        Image: image,
        Name: name,
        Surname: surname,
        Position: position,
        FacebookLink: facebookLink,
        TwitterLink: twitterLink,
        PinterestLink: pinterestLink,
        YoutubeLink: youtubeLink,
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

        await axios.post(`http://lamanhashimovaa-001-site1.ctempurl.com/api/Teams/CreateTeam` ,
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
            <Form.Label> Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Surname</Form.Label>
            <Form.Control type="text" placeholder="Enter SurName" onChange={(e) => setSurname(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Position</Form.Label>
            <Form.Control type="text" placeholder="Enter Position" onChange={(e) => setPosition(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> FacebookLink</Form.Label>
            <Form.Control type="text" placeholder="Enter Facebook address" onChange={(e) => setFacebookLink(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> TwitterLink</Form.Label>
            <Form.Control type="text" placeholder="Enter Twitter address" onChange={(e) => setTwitterLink(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> PinterestLink</Form.Label>
            <Form.Control type="text" placeholder="Enter Pinterest address" onChange={(e) => setPinterestLink(e.target.value)} />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> YoutubeLink</Form.Label>
            <Form.Control type="text" placeholder="Enter Youtube channel" onChange={(e) => setYoutubeLink(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Created By</Form.Label>
        <Form.Control type="text" placeholder="Enter User who create this team" onChange={(e) => setCreatedby(e.target.value)} />
      </Form.Group>


        <Button variant="primary" type="submit" className='mt-3' >
            Submit
        </Button>
    </Form>
</div>
  )
}

export default TeamCreate