import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function SettingCreate() {
    const [key, setKey] = useState();
    const [value, setValue] = useState();
    const [valueImage, setValueImage] = useState();

    const [createdby, setCreatedby] = useState();
    const [isimage, setIsImage] = useState(false);

    const [displayed, setDisplayed] = useState(false);

    const bodyParameters = {
        Key: key,
        Value: value,
        ValueImage:valueImage,
        CreatedBy: createdby,
        IsImage: isimage
    };

    async function create(e) {
        e.preventDefault();
        debugger
        await axios.post(`api/Settings/CreateSetting`,
            bodyParameters
            // , {
            //     headers: {
            //         'Content-Type': 'application/json' // Set the content type to multipart/form-data
            //     }
            // }
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
            setValueImage(result)
        });

    }

    const IsImage = (image) => {
        setIsImage(image)
        console.log(value)
        if (isimage === 'true') {
            setDisplayed('true');
        } else {
            setDisplayed('false');
        }
    };
    return (
        <div className='container'>
            <Form onSubmit={(e) => create(e)}>
                <Form.Label>IsImage</Form.Label>
                <Form.Select onChange={(e) => IsImage(e.target.value)}>
                    <option value={'false'}>false</option>
                    <option value={'true'}>true</option>

                </Form.Select>

                {displayed ? (
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>value</Form.Label>
                        <Form.Control type="file" onChange={(e) => base64Img(e.target.files[0])} />
                    </Form.Group>
                ) : (
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>value</Form.Label>
                        <Form.Control type="text" placeholder="Enter Value " onChange={(e) => setValue(e.target.value)} />
                    </Form.Group>
                )}



                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> key</Form.Label>
                    <Form.Control type="text" placeholder="Enter Key" onChange={(e) => setKey(e.target.value)} />
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Created By</Form.Label>
                    <Form.Control type="text" placeholder="Enter User who create this setting data" onChange={(e) => setCreatedby(e.target.value)} />
                </Form.Group>


                <Button variant="primary" type="submit" className='mt-3' >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SettingCreate