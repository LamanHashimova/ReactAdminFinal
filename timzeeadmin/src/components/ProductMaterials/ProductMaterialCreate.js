import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function ProductMaterialCreate() {
    const [productId, setProductId] = useState();
    const [materialId, setMaterialId] = useState();

    const [products, setProducts] = useState();
    const [materials, setMaterials] = useState();
    const [createdby, setCreatedby] = useState();

    
    const bodyParameters = {
        ProductId: productId,
        MaterialId: materialId,
        CreatedBy:createdby
    };

    const loadProducts = async () => {
        const resultproducts = await axios.get("api/Products/GetAllProducts");
        setProducts(resultproducts.data);
    }

    const loadMaterials = async () => {
        const resultmaterials = await axios.get("api/Materials/GetAllMaterials");
        setMaterials(resultmaterials.data);
    }

    useEffect(() => {

        loadProducts();

        loadMaterials();

    }, []);

    async function create(e) {
        e.preventDefault();
        await axios.post(`api/ProductMaterials/CreateProductMaterial` ,
            bodyParameters   
        // ,{
        //     headers: {
        //       'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        //     }}
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

    const changeMaterial = (mat) => {
        setMaterialId(mat)

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
            <Form.Label> Materials</Form.Label>
            <Form.Select className='d-block' defaultValue={""} onChange={(e) => changeMaterial(e.target.value)} >
                <option value="" disabled hidden
                >
                    Materiali Seçin
                </option>
                {
                    // value={setCategoryİd(categori.id)}
                    materials?.map((material =>
                        <option key={material.id} value={material.id} >{material.materialName} </option>
                    ))
                }
            </Form.Select>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Created By</Form.Label>
  <Form.Control type="text" placeholder="Enter User who create this color" onChange={(e) => setCreatedby(e.target.value)} />
</Form.Group>
            <Button variant="primary" type="submit" className='mt-3' >
                Submit
            </Button>
    </Form>
</div>
  )
}

export default ProductMaterialCreate