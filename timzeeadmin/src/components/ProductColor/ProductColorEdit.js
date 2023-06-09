  import React, { useState, useEffect } from 'react';
  import { Button, Form } from 'react-bootstrap';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import Swal from "sweetalert2";


  function ProductColorEdit(props) {
    const { id } = useParams();
    const [productId, setProductId] = useState();
    const [colorId, setColorId] = useState();

    const [products, setProducts] = useState();
    const [colors, setColors] = useState();
    const [updatedby, setUpdatedby] = useState();
    const bodyParameters = {
      ProductId: productId,
      ColorId: colorId,
      UpdatedBy: updatedby
    };

    const loadProducts = async () => {
      const resultproducts = await axios.get("https://timzeeback.azurewebsites.net/api/Products/GetAllProducts");
      setProducts(resultproducts.data);
    }

    const loadColors = async () => {
      const resultcolors = await axios.get("https://timzeeback.azurewebsites.net/api/Colors/GetAllColors");
      setColors(resultcolors.data);
    }


    useEffect(() => {

      loadProducts();

      loadColors();



    }, []);

    async function update(e) {
      e.preventDefault();
      await axios.put(`https://timzeeback.azurewebsites.net/api/ProductColors/UpdateProductColor/${id}`,
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

    const changeColor = (col) => {
      setColorId(col)

    }
    return (
      <div className='container'>
        <Form onSubmit={(e) => update(e)}>
          <div>
            <Form.Label> Product Edit</Form.Label>
            <Form.Select className='d-block'   onChange={(e) => changeProduct(e.target.value)} >
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
            <Form.Select className='d-block'  onChange={(e) => changeColor(e.target.value)} >
              <option value="" disabled hidden
              >
                Colorlari Seçin
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
            <Form.Label>Updated By</Form.Label>
            <Form.Control type="text" placeholder="Enter User who create this Productcolor" onChange={(e) => setUpdatedby(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-3' >
            Submit
          </Button>
        </Form>
      </div>
    )
  }

  export default ProductColorEdit