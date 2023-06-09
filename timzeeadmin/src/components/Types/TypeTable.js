import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function TypeTable() {
    let count = 0;



    const [types, setTypes] = useState([]);

    useEffect(() => {
        loadType();

    }, []);

    const loadType = async () => {

        const result = await axios.get(`https://timzeeback.azurewebsites.net/api/Types/GetAllTypes`)
        setTypes(result.data);
        console.log(result.data);

    }


    const deleteType = async (id) => {
    debugger
        await axios.delete(`https://timzeeback.azurewebsites.net/api/Types/DeleteType/${id}`)
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
        loadType();
    }

    const UpdateType = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Types
                <Link to='/typecreate' className="btn btn-success btn-fw">Create Type</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Type Name </th>
                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       types.map((type => 

                            <tr key={type.id}>
                                <td>{++count}</td>
                                <td className="py-1">
                                    {type.typeName}
                                </td>
                                <td><Link to={`/typeupdate/${type.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateType(type.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteType(type.id )}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default TypeTable