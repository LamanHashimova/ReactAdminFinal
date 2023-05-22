import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function TeamTable() {
    
    let count = 0;

  


    const [teams, setTeams] = useState([]);

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = async () => {

        const result = await axios.get(`api/Teams/GetAllTeams`)
        console.log(result);
        setTeams(result.data);
       
        
    }


    const deleteTeam = async (id) => {
 
        await axios.delete(`api/Teams/DeleteTeam/${id}`)
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
        loadTeam();
    }

    const UpdateTeam = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Teams
                <Link to='/teamcreate' className="btn btn-success btn-fw">Create Team</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>  Image </th>
                        <th>  Name </th>
                        <th>  Surname </th>
                        <th>  Position </th>
                        <th>  FacebookLink </th>
                        <th>  TwitterLink </th>
                        <th>  PinterestLink </th>
                        <th>  YoutubeLink </th>





                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       teams.map((team => 

                            <tr key={team.id}>
                                <td>{++count}</td>
                                <td className="py-1 ">
                                            <img style={{width:'100px', height:'70px',borderRadius:'unset'}} src={`data:image/jpeg;base64,${team.image}`} />
                                          
                                        </td>
                                <td className="py-1">
                                    {team.name}
                                </td>
                                <td className="py-1">
                                    {team.surname}
                                </td>
                                <td className="py-1">
                                    {team.position}
                                </td>
                                <td className="py-1">
                                    {team.facebookLink}
                                </td>
                                <td className="py-1">
                                    {team.twitterLink}
                                </td>
                                <td className="py-1">
                                    {team.pinterestLink}
                                </td>
                                <td className="py-1">
                                    {team.youtubeLink}
                                </td>
                              
                                <td><Link to={`/teamupdate/${team.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateTeam(team.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteTeam(team.id )}> <i className="fas fa-trash-alt"></i></button> </td>

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

export default TeamTable