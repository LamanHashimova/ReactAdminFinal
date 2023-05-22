import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function MaterialsTable() {
    let count = 0;



    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        loadMaterial();

    }, []);

    const loadMaterial = async () => {

        const result = await axios.get(`api/Materials/GetAllMaterials`)
        setMaterials(result.data);
        console.log(result.data);

    }


    const deleteMaterial = async (id) => {
    debugger
        await axios.delete(`api/Materials/DeleteMaterial/${id}`)
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
        loadMaterial();
    }

    const UpdateMaterial = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Colors
                <Link to='/materialcreate' className="btn btn-success btn-fw">Create Color</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Material Name </th>
                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       materials.map((material => 

                            <tr key={material.id}>
                                <td>{++count}</td>
                                <td className="py-1">
                                    {material.materialName}
                                </td>
                                <td><Link to={`/materialupdate/${material.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateMaterial(material.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteMaterial(material.id )}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default MaterialsTable
