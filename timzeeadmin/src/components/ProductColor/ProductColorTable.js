import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductColorTable() {
    let count = 0;



    const [productcolor, setProductColor] = useState([]);

    useEffect(() => {
        loadProductColor();

    }, []);

    const loadProductColor = async () => {

        const result = await axios.get(`http://lamanhashimovaa-001-site1.ctempurl.com/api/ProductColors/GetAllProductColors`)
        setProductColor(result?.data);
        console.log(result?.data);

    }


    const deleteProductColor = async (id) => {
        debugger
        await axios.delete(`http://lamanhashimovaa-001-site1.ctempurl.com/api/ProductColors/DeleteProductColor/${id}`)
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
            loadProductColor();
    }

    const UpdateProductColor = async id => {
        console.log(id);
    }

    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title d-flex justify-content-between">ProductColors
                        <Link to='/productcolorcreate' className="btn btn-success btn-fw">Create Product Color</Link>
                    </h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Product Name </th>
                                <th> Color Name </th>

                                <th> Settings </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productcolor?.map((productcol =>

                                    <tr key={productcol?.id}>
                                        <td>{++count}</td>
                                        <td className="py-1">
                                            {productcol?.product?.title}
                                        </td>
                                        <td className="py-1">
                                            {productcol?.color?.colorName}
                                        </td>
                                        <td><Link to={`/productcolorupdate/${productcol?.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateProductColor(productcol.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteProductColor(productcol.id)}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default ProductColorTable