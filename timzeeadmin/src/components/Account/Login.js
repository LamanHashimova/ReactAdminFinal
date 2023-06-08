import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
  
  
  
    async function login(e) {
  
      function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
  
        return JSON.parse(jsonPayload);
      };
  
      e.preventDefault();
      await axios.post(`http://lamanhashimovaa-001-site1.ctempurl.com/api/Auth/Login`, {
        Email: email,
        Password: password
      }, { 'Content-Type': 'multipart/form-data' })
        .then(function (response) {
          if (response.data.status === "success" || response.status === 200) {
            let userdet = parseJwt(response.data)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (userdet === "User") {
              Swal.fire({
                position: 'top-end',
                icon: 'Error',
                title: 'You are not authorized to access this page',
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              localStorage.setItem("token", JSON.stringify(response.data));
              props.user(localStorage.getItem("token"))
  
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Ugurla giris etdiz',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/brands')
            }
  
  
  
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Email və ya şifrə yanlışdır',
              showConfirmButton: false,
              timer: 1500
            })
          }
  
  
        })
        .catch(function (error) {
  
        })
    }
    return (
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Welcome back, Charles</h1>
                                <p className="lead">
                                    Sign in to your account to continue
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="text-center">
                                            <img src={require("../../assets/img/avatars/avatar.jpg")} alt="Charles Hall" className="img-fluid rounded-circle" width="132" height="132" />
                                        </div>
                                        <form onSubmit={(e)=> login(e)}>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" onChange={(e)=> setEmail(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                                <small>
                                                    <a href="index.html">Forgot password?</a>
                                                </small>
                                            </div>
                                            <div>

                                            </div>
                                            <div className="text-center mt-3">
                                                
                                                <button type="submit" className="btn btn-lg btn-primary">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login