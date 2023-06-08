
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';


function ColorsTable() {
    let count = 0;



    const [colors, setColors] = useState([]);

    useEffect(() => {
        loadColor();

    }, []);

    const loadColor = async () => {

        const result = await axios.get(`https://timzeeback.azurewebsites.net/api/Colors/GetAllColors`)
        setColors(result.data);
        console.log(result.data);

    }


    const deleteColor = async (id) => {
    debugger
        await axios.delete(`https://timzeeback.azurewebsites.net/api/Colors/DeleteColor/${id}`)
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
        loadColor();
    }

    const UpdateColor = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Colors
                <Link to='/colorcreate' className="btn btn-success btn-fw">Create Color</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Color Name </th>
                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       colors.map((color => 

                            <tr key={color.id}>
                                <td>{++count}</td>
                                <td className="py-1">
                                    {color.colorName}
                                </td>
                                <td><Link to={`/colorupdate/${color.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateColor(color.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteColor(color.id )}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default ColorsTable