import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';


function ProductSizeTable() {
    let count = 0;



    const [productsize, setProductSize] = useState([]);

    useEffect(() => {
        loadProductSize();

    }, []);

    const loadProductSize = async () => {

        const result = await axios.get(`api/ProductSizes/GetAllProductSizes`)
        setProductSize(result.data);
        console.log(result.data);

    }


    const deleteProductSize = async (id) => {
        debugger
        await axios.delete(`api/ProductSizes/DeleteProductSize/${id}`)
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
            loadProductSize();
    }

    const UpdateProductSize = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">ProductSizes
                <Link to='/productsizecreate' className="btn btn-success btn-fw">Create Product Size</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Product Name </th>
                        <th> Size Name </th>

                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsize.map((productsize =>

                            <tr key={productsize.id}>
                                <td>{++count}</td>
                                    <td className="py-1">
                                        {productsize.product?.title}
                                    </td>
                                    <td className="py-1">
                                        {productsize.size?.sizeName}
                                    </td>
                                <td><Link to={`/productsizeupdate/${productsize.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateProductSize(productsize.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteProductSize(productsize.id)}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default ProductSizeTable
