import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';



function BrandsTable() {
    let count = 0;



    const [brands, setBrands] = useState([]);

    useEffect(() => {
        loadBrand();

    }, []);

    const loadBrand = async () => {

        const result = await axios.get(`https://timzeeback.azurewebsites.net/api/Brands/GetAllBrands`)
        setBrands(result.data);
        console.log(result.data);

    }


    const deleteBrand = async (id) => {
    debugger
        await axios.delete(`https://timzeeback.azurewebsites.net/api/Brands/DeleteBrand/${id}`)
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
        loadBrand();
    }

    const UpdateBrand = async id => {
        console.log(id);
    }

    return (
        <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
                <h4 className="card-title d-flex justify-content-between">Brands
                    <Link to='/brandcreate' className="btn btn-success btn-fw">Create Brand</Link>
                </h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Brand Name </th>
                            <th> Settings </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           brands.map((brand => 

                                <tr key={brand.id}>
                                    <td>{++count}</td>
                                    <td className="py-1">
                                        {brand.name}
                                    </td>
                                    <td><Link to={`/brandupdate/${brand.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateBrand(brand.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteBrand(brand.id )}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default BrandsTable