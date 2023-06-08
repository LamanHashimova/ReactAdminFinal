import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function ProductCreate() {

    const [mainimage, setMainImage] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [discountprice, setDiscountPrice] = useState();
    const [description, setDescription] = useState();
    const [count, setCount] = useState();
    const [brandId, setBrandId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [createdby, setCreatedby] = useState();
    const [typeId, setTypeId] = useState();
    const [isPopular, setIsPopular] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [isNewArrival, setIsNewArrival] = useState(false);



    const [categories, setCategories] = useState();
    const [brands, setBrands] = useState();
    const [type, setType] = useState();


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
        CreatedBy:createdby,
        TypeId:typeId
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

    const loadCategory = async () => {
        const resultcategory = await axios.get("https://timzeeback.azurewebsites.net/api/Categories/GetAllCategories");
        setCategories(resultcategory?.data);
    }
    const loadTypes = async () => {
        const resultype = await axios.get("https://timzeeback.azurewebsites.net/api/Types/GetAllTypes");
        setType(resultype?.data);
    }
    const loadBrand = async () => {
        const resultbrands = await axios.get("https://timzeeback.azurewebsites.net/api/Brands/GetAllBrands");
        setBrands(resultbrands.data);
    }

    async function create(e) {
        e.preventDefault();
        debugger
        await axios.post(`https://timzeeback.azurewebsites.net/api/Products/CreateProduct` ,
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
            setMainImage(result)
        });

    }


    const changeCategory = (categ) => {
        setCategoryId(categ)
    }
    const changeType = (type) => {
        setTypeId(type)
    }
    const changeBrand = (brand) => {
        setBrandId(brand)

    }

    const IsBestSeller = (sel) => {
        setIsBestSeller(sel)
        console.log(sel)
    }

    const IsNewArrival = (arr) => {
        setIsNewArrival(arr)
        console.log(arr)
    }

    const IsPopular = (pop) => {
        setIsPopular(pop)
        console.log(pop)
    }

    // const handleIsBestSellerChange = (event) => {
    //     setIsBestSeller(event.target.value === 'true');

    // };

    // const handleIsPopularChange = (event) => {
    //     setIsPopular(event.target.value === 'true');

    // };

    // const handleIsNewArrivalChange = (event) => {
    //     setIsNewArrival(event.target.value === 'true');

    // };


    useEffect(() => {

        loadCategory();
        loadTypes();
        loadBrand();

    }, []);
    return (
        <div className='container'>
            <Form onSubmit={(e) => create(e)}>


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
                        <option value={'true'}>true</option>
                        <option value={'false'}>false</option>
                    </Form.Select>
                </div>
                <div>
                    <Form.Label> IsNewArrival</Form.Label>
                    <Form.Select onChange={(e) => IsNewArrival(e.target.value)}>
                        <option value={'true'}>true</option>
                        <option value={'false'}>false</option>
                    </Form.Select>
                </div>
                <div>
                    <Form.Label> IsBestSeller</Form.Label>
                    <Form.Select onChange={(e) => IsBestSeller(e.target.value)}>
                        <option value={'true'}>true</option>
                        <option value={'false'}>false</option>
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
                    <Form.Label> Type</Form.Label>
                    <Form.Select className='d-block' defaultValue={""} onChange={(e) => changeType(e.target.value)} >
                        <option value="" disabled hidden
                        >
                            Type Seçin
                        </option>
                        {
                            // value={setCategoryİd(categori.id)}
                            type?.map((type =>
                                <option key={type.id} value={type.id} >{type?.typeName} </option>
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
        <Form.Label>Created By</Form.Label>
        <Form.Control type="text" placeholder="Enter User who create this product" onChange={(e) => setCreatedby(e.target.value)} />
      </Form.Group>


                <Button variant="primary" type="submit" className='mt-3' >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ProductCreate