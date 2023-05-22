import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductTable() {

    let count = 0;

  


    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {

        const result = await axios.get(`api/Products/GetAllProducts`)
        console.log(result);
        setProducts(result.data);
       
        
    }


    const deleteProduct = async (id) => {
    debugger
        await axios.delete(`api/Products/${id}`)
        .then(function (response) {

            Swal.fire(
                "",
                'Deleted',
                'success'
            )
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })

        });
        loadProduct();
    }

    const UpdateProduct = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Products
                <Link to='/productcreate' className="btn btn-success btn-fw">Create Product</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Main Image </th>
                        <th>  Title </th>
                        <th>  Price </th>
                        <th>  DiscountedPrice </th>
                        <th>  Description </th>
                        <th>  Count </th>
                        <th>  Category </th>
                        <th>  Brand </th>





                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       products.map((product => 

                            <tr key={product.id}>
                                <td>{++count}</td>
                                <td className="py-1 ">
                                            <img style={{width:'100px', height:'70px',borderRadius:'unset'}} src={`data:image/jpeg;base64,${product.mainImage}`} />
                                          
                                        </td>
                                <td className="py-1">
                                    {product.title}
                                </td>
                                <td className="py-1">
                                    {product.price}
                                </td>
                                <td className="py-1">
                                    {product.discountedPrice}
                                </td>
                                <td className="py-1">
                                    {product.description}
                                </td>
                                <td className="py-1">
                                    {product.count}
                                </td>
                                <td className="py-1">
                                    {product.category.name}
                                </td>
                                <td className="py-1">
                                    {product.brand.name}
                                </td>
                              
                                <td><Link to={`/productupdate/${product.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateProduct(product.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteProduct(product.id )}> <i className="fas fa-trash-alt"></i></button> </td>

                            </tr>
                        ))

                    }
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default ProductTable