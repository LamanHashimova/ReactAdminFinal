import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function Sizestable() {
    let count = 0;



    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        loadSize();

    }, []);

    const loadSize = async () => {

        const result = await axios.get(`api/Sizes/GetAllSizes`)
        setSizes(result.data);
        console.log(result.data);

    }


    const deleteSize = async (id) => {
    debugger
        await axios.delete(`api/Sizes/DeleteSize/${id}`)
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
        loadSize();
    }

    const UpdateSize = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Colors
                <Link to='/sizecreate' className="btn btn-success btn-fw">Create Color</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Size Name </th>
                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       sizes.map((size => 

                            <tr key={size.id}>
                                <td>{++count}</td>
                                <td className="py-1">
                                    {size.sizeName}
                                </td>
                                <td><Link to={`/sizeupdate/${size.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateSize(size.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteSize(size.id )}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default Sizestable