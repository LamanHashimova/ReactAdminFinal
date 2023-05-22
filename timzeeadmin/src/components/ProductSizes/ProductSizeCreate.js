import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function ProductSizeCreate() {
    const [productId, setProductId] = useState();
    const [sizeId, setSizeId] = useState();

    const [products, setProducts] = useState();
    const [sizes, setSizes] = useState();
    const [createdby, setCreatedby] = useState();


    const bodyParameters = {
        ProductId: productId,
        SizeId: sizeId,
        CreatedBy: createdby
    };

    const loadProducts = async () => {
        const resultproducts = await axios.get("api/Products/GetAllProducts");
        setProducts(resultproducts.data);
    }

    const loadSizes = async () => {
        const resultsizes = await axios.get("api/Sizes/GetAllSizes");
        setSizes(resultsizes.data);
    }

    useEffect(() => {

        loadProducts();

        loadSizes();

    }, []);


    async function create(e) {
        e.preventDefault();
        await axios.post(`api/ProductSizes/CreateProductSize`,
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

    const changeSize = (size) => {
        setSizeId(size)

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
                    <Form.Label> Sizes</Form.Label>
                    <Form.Select className='d-block' defaultValue={""} onChange={(e) => changeSize(e.target.value)} >
                        <option value="" disabled hidden
                        >
                            Size Seçin
                        </option>
                        {
                            // value={setCategoryİd(categori.id)}
                            sizes?.map((size =>
                                <option key={size.id} value={size.id} >{size.sizeName} </option>
                            ))
                        }
                    </Form.Select>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Created By</Form.Label>
                    <Form.Control type="text" placeholder="Enter User who create this ProductSize" onChange={(e) => setCreatedby(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3' >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ProductSizeCreate