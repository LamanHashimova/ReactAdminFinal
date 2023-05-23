import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function ProductEdit(props) {
  const { id } = useParams();

  const [mainimage, setMainImage] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [discountprice, setDiscountPrice] = useState();
  const [description, setDescription] = useState();
  const [count, setCount] = useState();
  const [brandId, setBrandId] = useState();
  const [categoryId, setCategoryId] = useState();

  const [isPopular, setIsPopular] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);



  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();


  const [updatedBy, setupdatedBy] = useState();


  // function initPromise() {
  //   const response = axios.get(`http://localhost:44330/api/Products/GetProduct/${id}`)

  //   return new Promise(function (res, rej) {
  //     res(response);
  //   })

  // }



  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.replace('data:', '')
        .replace(/^.+,/, ''))
      reader.onerror = error => reject(error);
    });
  }

  const loadCategory = async () => {
    const resultcategory = await axios.get("http://localhost:44330/api/Categories/GetAllCategories");
    setCategories(resultcategory.data);
  }

  const loadBrand = async () => {
    const resultbrands = await axios.get("http://localhost:44330/api/Brands/GetAllBrands");
    setBrands(resultbrands.data);
  }

  useEffect(() => {
    loadCategory();
    loadBrand();
    // initPromise()
    //   .then(function (result) {
    //     // "initResolve"
    //     return result.data;
    //   })
    //   .then(function (result) {
    //     setLoadProducts(result) // "normalReturn" 
    //   });


  }, []);

  function base64Img(file) {
    var base64String = getBase64(file);
    base64String.then(function (result) {
      setMainImage(result)
    });

  }
  const bodyParameters = {
    MainImage: mainimage,
    Title: title,
    Price: price,
    DiscountedPrice: discountprice,
    Description: description,
    Count: count,
    CategoryId: categoryId,
    BrandId: brandId,
    IsPopular: isPopular,
    IsNewArrival: isNewArrival,
    IsBestSeller: isBestSeller,
    UpdatedBy:updatedBy
  };


  async function update(e) {
    e.preventDefault();
   
    await axios.put(`http://localhost:44330/api/Products/UpdateProduct/${id}`,
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


  const changeCategory = (categ) => {
    setCategoryId(categ)
  }

  const changeBrand = (brand) => {
    setBrandId(brand)

  }

  const IsBestSeller = (sel) => {
    setIsBestSeller(sel)
  }

  const IsNewArrival = (arr) => {
    setIsNewArrival(arr)
  }

  const IsPopular = (pop) => {
    setIsPopular(pop)
  }

  return (
    <div className='container'>
      {/* <div>
      <img style={{width:'100px', height:'70px',borderRadius:'unset'}} src={`data:image/jpeg;base64,${loadproducts?.mainImage}`} />

      </div> */}
      <Form onSubmit={(e) => update(e)}>


        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>MainImage</Form.Label>
          <Form.Control type="file" onChange={(e) => base64Img(e.target.files[0])} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Price</Form.Label>
          <Form.Control type="number" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> DiscoundPrice</Form.Label>
          <Form.Control type="number" placeholder="Enter Discounted Price" onChange={(e) => setDiscountPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Count</Form.Label>
          <Form.Control type="number" placeholder="Enter Count" onChange={(e) => setCount(e.target.value)} />
        </Form.Group>




        <div>
          <Form.Label> IsPopular</Form.Label>
          <Form.Select onChange={(e) => IsPopular(e.target.value)}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        </div>
        <div>
          <Form.Label> IsNewArrival</Form.Label>
          <Form.Select onChange={(e) => IsNewArrival(e.target.value)}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        </div>
        <div>
          <Form.Label> IsBestSeller</Form.Label>
          <Form.Select onChange={(e) => IsBestSeller(e.target.value)}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        </div>
        <div>
          <Form.Label> Category</Form.Label>
          <Form.Select className='d-block' defaultValue={""} onChange={(e) => changeCategory(e.target.value)} >
            <option value="" disabled hidden
            >
              Kateqoriyasını Seçin
            </option>
            {
              // value={setCategoryİd(categori.id)}
              categories?.map((categori =>
                <option key={categori.id} value={categori.id} >{categori.name} </option>
              ))
            }
          </Form.Select>
        </div>
        <div>
          <Form.Label> Brand</Form.Label>
          <Form.Select className='d-block' defaultValue={""} onChange={(e) => changeBrand(e.target.value)} >
            <option value="" disabled hidden
            >
              Brandini Seçin
            </option>
            {
              // value={setCategoryİd(categori.id)}
              brands?.map((brand =>
                <option key={brand.id} value={brand.id} >{brand.name} </option>
              ))
            }
          </Form.Select>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> UpdatedBy</Form.Label>
          <Form.Control type="text" placeholder="Enter User who update this product" onChange={(e) => setupdatedBy(e.target.value)} />
        </Form.Group>



        <Button variant="primary" type="submit" className='mt-3' >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ProductEdit