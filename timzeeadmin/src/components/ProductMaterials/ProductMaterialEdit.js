import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function ProductMaterialEdit(props) {
  const { id } = useParams();
  const [productId, setProductId] = useState();
  const [materialId, setMaterialId] = useState();

  const [products, setProducts] = useState();
  const [materials, setMaterials] = useState();
  const [updatedby, setUpdatedby] = useState();
  const bodyParameters = {
    ProductId: productId,
    MaterialId: materialId,
    UpdatedBy: updatedby
  };

  const loadProducts = async () => {
    const resultproducts = await axios.get("http://lamanhashimovaa-001-site1.ctempurl.com/api/Products/GetAllProducts");
    setProducts(resultproducts.data);
  }

  const loadMaterials = async () => {
    const resultmaterials = await axios.get("http://lamanhashimovaa-001-site1.ctempurl.com/api/Materials/GetAllMaterials");
    setMaterials(resultmaterials.data);
  }


  useEffect(() => {

    loadProducts();

    loadMaterials();

  

  }, []);

  async function update(e) {
    e.preventDefault();
    await axios.put(`http://lamanhashimovaa-001-site1.ctempurl.com/api/ProductMaterials/UpdateProductMaterial/${id}`,
      bodyParameters
      // ,{
      //     headers: {
      //       'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      //     }}
    )
      .then(function (response) {

        Swal.fire(
          '',
          'updated',
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

  const changeMaterial = (material) => {
    setMaterialId(material)

  }
  return (
    <div className='container'>
    <Form onSubmit={(e) => update(e)}>
      <div>
        <Form.Label> Product Edit</Form.Label>
        <Form.Select className='d-block' onChange={(e) => changeProduct(e.target.value)} >
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
        <Form.Select className='d-block' onChange={(e) => changeMaterial(e.target.value)}  >
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
        <Form.Label>Updated By</Form.Label>
        <Form.Control type="text" placeholder="Enter User who create this Productmaterial" onChange={(e) => setUpdatedby(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-3' >
        Submit
      </Button>
    </Form>
  </div>
  )
}

export default ProductMaterialEdit