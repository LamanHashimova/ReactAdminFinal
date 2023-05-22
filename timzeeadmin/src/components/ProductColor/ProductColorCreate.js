import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";


function ProductColorCreate() {
    const [productId, setProductId] = useState();
    const [colorId, setColorId] = useState();

    const [products, setProducts] = useState();
    const [colors, setColors] = useState();
    const [createdby, setCreatedby] = useState();


    const bodyParameters = {
        ProductId: productId,
        ColorId: colorId,
        CreatedBy: createdby
    };

    const loadProducts = async () => {
        const resultproducts = await axios.get("api/Products/GetAllProducts");
        setProducts(resultproducts.data);
    }

    const loadColors = async () => {
        const resultcolors = await axios.get("api/Colors/GetAllColors");
        setColors(resultcolors.data);
    }

    useEffect(() => {

        loadProducts();

        loadColors();

    }, []);
   
    async function create(e) {
        e.preventDefault();
        await axios.post(`api/ProductColors/CreateProductColor`,
            bodyParameters
           
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
   
    const changeProduct = (prod) => {
        setProductId(prod)
    }

    const changeColor = (color) => {
        setColorId(color)

    }

    return (
        <div className='container'>
            <Form onSubmit={(e) => create(e)}>
                <div>
                    <Form.Label> Products</Form.Label>
                    <Form.Select className='d-block' defaultValue={""} onChange={(e) => changeProduct(e.target.value)} >
                        <option value="" disabled hidden
                        >
                            Productu Seçin
                        </option>
                        {
                            // value={setCategoryİd(categori.id)}
                            products?.map((product =>
                                <option key={product.id} value={product.id} >{product.title} </option>
                            ))
                        }
                    </Form.Select>
                </div>
                <div>
                    <Form.Label> Colors</Form.Label>
                    <Form.Select className='d-block' defaultValue={""} onChange={(e) => changeColor(e.target.value)} >
                        <option value="" disabled hidden
                        >
                            Color Seçin
                        </option>
                        {
                            // value={setCategoryİd(categori.id)}
                            colors?.map((color =>
                                <option key={color.id} value={color.id} >{color.colorName} </option>
                            ))
                        }
                    </Form.Select>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Created By</Form.Label>
                    <Form.Control type="text" placeholder="Enter User who create this Productcolor" onChange={(e) => setCreatedby(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3' >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ProductColorCreate