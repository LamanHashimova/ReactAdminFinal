import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductMaterialTable() {
    let count = 0;



    const [productmaterial, setProductMaterial] = useState([]);

    useEffect(() => {
        loadProductMaterial();

    }, []);

    const loadProductMaterial = async () => {

        const result = await axios.get(`http://lamanhashimovaa-001-site1.ctempurl.com/api/ProductMaterials/GetAllProductMaterials`)
        setProductMaterial(result.data);
        console.log(result.data);

    }


    const deleteProductMaterial = async (id) => {
        debugger
        await axios.delete(`http://lamanhashimovaa-001-site1.ctempurl.com/api/ProductMaterials/DeleteProductMaterial/${id}`)
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
            loadProductMaterial();
    }

    const UpdateProductMaterial = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">ProductMaterials
                <Link to='/productmaterialcreate' className="btn btn-success btn-fw">Create Product Material</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Product Name </th>
                        <th> Material Name </th>

                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productmaterial.map((productmat =>

                            <tr key={productmat.id}>
                                <td>{++count}</td>
                                <td className="py-1">
                                    {productmat.product.title}
                                </td>
                                <td className="py-1">
                                    {productmat.material.materialName}
                                </td>
                                <td><Link to={`/productmaterialupdate/${productmat.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateProductMaterial(productmat.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteProductMaterial(productmat.id)}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default ProductMaterialTable