import React from 'react'
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="index.html">
                    <span className="align-middle">AdminKit</span>
                </a>

                <ul className="sidebar-nav">

                <li className="sidebar-item active">
                        <Link className="sidebar-link" to={'/dashboard'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/brands'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Brand</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/colors'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Colors</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/tags'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Tags</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/materials'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Materials</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/sizes'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Sizes</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/blogs'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Blogs</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/teams'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Teams</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/settings'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Settings</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/sliders'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Sliders</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/productcolors'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">ProductColors</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/productmaterials'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">ProductMaterials</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/productsizes'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">ProductSizes</span>
                        </Link>
                    </li>
                    <li className="sidebar-item ">
                        <Link className="sidebar-link" to={'/types'}>
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Types</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to={'/products'}>
                            <i className="align-middle" data-feather="user"></i> <span className="align-middle">Product</span>
                        </Link>
                    </li>

              

           
                </ul>


            </div>
        </nav>
    )
}

export default Sidebar