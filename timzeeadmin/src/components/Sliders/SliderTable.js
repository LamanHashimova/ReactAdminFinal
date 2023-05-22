import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/cards.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function SliderTable() {
    let count = 0;

    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        loadSliders();
    }, []);

    const loadSliders = async () => {

        const result = await axios.get(`api/Sliders/GetAllSliders`)
        console.log(result);
        setSliders(result.data);
       
        
    }


    const deleteSlider = async (id) => {
    debugger
        await axios.delete(`api/Sliders/${id}`)
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
        loadSliders();
    }

    const UpdateSliders = async id => {
        console.log(id);
    }
  return (
    <div className="col-lg-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">Sliders
                <Link to='/slidercreate' className="btn btn-success btn-fw">Create Slider</Link>
            </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Image </th>
                        <th>  MainTitle </th>
                        <th>  Subtitle </th>
                        <th>  Price </th>
                        <th>  SaleInfo </th>
                        <th>  Link </th>
                        <th>  SliderType </th>
                        <th> Settings </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       sliders.map((slide => 

                            <tr key={slide.id}>
                                <td>{++count}</td>
                                <td className="py-1 ">
                                            <img style={{width:'100px', height:'70px',borderRadius:'unset'}} src={`data:image/jpeg;base64,${slide.image}`} />
                                          
                                        </td>
                                <td className="py-1">
                                    {slide.mainTitle}
                                </td>
                                <td className="py-1">
                                    {slide.subtitle}
                                </td>
                                <td className="py-1">
                                    {slide.price}
                                </td>
                                <td className="py-1">
                                    {slide.saleInfo}
                                </td>
                                <td className="py-1">
                                    {slide.link}
                                </td>
                                  <td className="py-1">
                                    {slide.sliderType}
                                </td>
                                <td><Link to={`/sliderupdate/${slide.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateSliders(slide.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteSlider(slide.id )}> <i className="fas fa-trash-alt"></i></button> </td>
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

export default SliderTable