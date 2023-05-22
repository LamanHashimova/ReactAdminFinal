import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function BlogTable() {
    let count = 0;

    const [blogs, setBlogs] = useState([]);
debugger
    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {

        const result = await axios.get(`api/Blogs/GetAllBlogs`)
        console.log(result);
        setBlogs(result?.data);
       
        
    }


    const deleteBlogs = async (id) => {
    debugger
        await axios.delete(`api/Blogs/${id}`)
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
        loadBlogs();
    }

    const UpdateBlog = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Blogs
                <Link to='/blogcreate' className="btn btn-success btn-fw">Create Blogs</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Main Image </th>
                        <th>  Title </th>
                      
                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       blogs?.map((blog => 

                            <tr key={blog?.id}>
                                <td>{++count}</td>
                                <td className="py-1 ">
                                            <img style={{width:'100px', height:'70px',borderRadius:'unset'}} src={`data:image/jpeg;base64,${blog?.image}`} />
                                          
                                        </td>
                                <td className="py-1">
                                    {blog?.title}
                                </td>
                              
                              
                                <td><Link to={`/blogupdate/${blog?.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateBlog(blog?.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteBlogs(blog?.id )}> <i className="fas fa-trash-alt"></i></button> </td>
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

export default BlogTable