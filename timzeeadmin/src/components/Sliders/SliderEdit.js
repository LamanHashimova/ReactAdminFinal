import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function SliderEdit(props) {
    const { id } = useParams();
    const [image, setImage] = useState();
    const [mainTitle, setMainTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [link, setLink] = useState();
    const [price, setPrice] = useState();
    const [saleInfo, setSaleInfo] = useState();
    const [sliderType, setSliderType] = useState();
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
        MainTitle: mainTitle,
        Subtitle: subtitle,
        Link: link,
        Price: price,
        SliderType: sliderType,
        SaleInfo: saleInfo,
      UpdatedBy:updatedBy
    };
  
  
    async function update(e) {
      e.preventDefault();
     
      await axios.put(`https://timzeeback.azurewebsites.net/api/Sliders/UpdateSlider/${id}`,
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
            <Form.Label> MainTitle</Form.Label>
            <Form.Control type="text" placeholder="Enter Main Title" onChange={(e) => setMainTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Subtitle</Form.Label>
            <Form.Control type="text" placeholder="Enter SubTitle" onChange={(e) => setSubtitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Link</Form.Label>
            <Form.Control type="text" placeholder="Enter Link" onChange={(e) => setLink(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Price</Form.Label>
            <Form.Control type="number" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> SaleInfo</Form.Label>
            <Form.Control type="text" placeholder="Enter SaleInfo" onChange={(e) => setSaleInfo(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> SliderType</Form.Label>
            <Form.Control type="text" placeholder="Enter Slider Type" onChange={(e) => setSliderType(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Update By</Form.Label>
            <Form.Control type="text" placeholder="Enter User who update this size" onChange={(e) => setupdatedBy(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3' >
            Submit
        </Button>
    </Form>
</div>
  )
}

export default SliderEdit