import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function SettingTable() {

    let count = 0;




    const [settings, setSettings] = useState([]);

    useEffect(() => {
        loadSetting();
    }, []);

    const loadSetting = async () => {

        const result = await axios.get(`https://timzeeback.azurewebsites.net/api/Settings/GetAllSettings`)
        console.log(result);
        setSettings(result.data);


    }


    const deleteSetting = async (id) => {
        debugger
        await axios.delete(`https://timzeeback.azurewebsites.net/api/Settings/${id}`)
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
        loadSetting();
    }

    const UpdateSetting = async id => {
        console.log(id);
    }
    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title d-flex justify-content-between">Settings
                        <Link to='/settingcreate' className="btn btn-success btn-fw">Create Setting</Link>
                    </h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>  key </th>
                                <th>  Value </th>





                                <th> Settings </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                settings.map((setting =>

                                    <tr key={setting?.id}>
                                        <td>{++count}</td>
                                        {/* <td className="py-1 ">
                                            <img style={{width:'100px', height:'70px',borderRadius:'unset'}} src={`data:image/jpeg;base64,${product.mainImage}`} />
                                          
                                        </td> */}
                                        <td className="py-1">
                                            {setting?.key}
                                        </td>
                                        <td className="py-1">
                                            {setting?.value}
                                        </td>

                                        <td><Link to={`/settingupdate/${setting.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateSetting(setting.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteSetting(setting.id)}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default SettingTable