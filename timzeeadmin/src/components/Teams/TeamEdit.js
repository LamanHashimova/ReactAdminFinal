import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function TeamEdit() {
    const { id } = useParams();

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [position, setPosition] = useState();
    const [facebookLink, setFacebookLink] = useState();
    const [twitterLink, setTwitterLink] = useState();
    const [pinterestLink, setPinterestLink] = useState();
    const [youtubeLink, setYoutubeLink] = useState();
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
        Name: name,
        Surname: surname,
        Position: position,
        FacebookLink: facebookLink,
        TwitterLink: twitterLink,
        PinterestLink: pinterestLink,
        YoutubeLink: youtubeLink,
      UpdatedBy:updatedBy
    };
  
  
    async function update(e) {
      e.preventDefault();
     
      await axios.put(`https://localhost:44330/api/Teams/UpdateTeam/${id}`,
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


        <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label > YoutubeLink</Form.Label >
            <Form.Control type="text" placeholder="Enter Youtube channel" onChange={(e) => setYoutubeLink(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> UpdatedBy</Form.Label>
            <Form.Control type="text" placeholder="Enter User who update this team" onChange={(e) => setupdatedBy(e.target.value)} />
        </Form.Group>




        <Button variant="primary" type="submit" className='mt-3' >
            Submit
        </Button>
    </Form>
</div>
  )
}

export default TeamEdit