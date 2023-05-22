import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function TagsTable() {
    let count = 0;



    const [tags, setTags] = useState([]);

    useEffect(() => {
        loadTag();

    }, []);

    const loadTag = async () => {

        const result = await axios.get(`api/Tags/GetAllTags`)
        setTags(result.data);
        console.log(result.data);

    }


    const deleteTag = async (id) => {
    debugger
        await axios.delete(`api/Tags/DeleteTag/${id}`)
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
        loadTag();
    }

    const UpdateTag = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Tags
                <Link to='/tagcreate' className="btn btn-success btn-fw">Create Tag</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Tag Name </th>
                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       tags.map((tag => 

                            <tr key={tag.id}>
                                <td>{++count}</td>
                                <td className="py-1">
                                    {tag.name}
                                </td>
                                <td><Link to={`/tagupdate/${tag.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateTag(tag.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteTag(tag.id )}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default TagsTable