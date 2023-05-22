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

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="pages-sign-in.html">
                            <i className="align-middle" data-feather="log-in"></i> <span className="align-middle">Sign In</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="pages-sign-up.html">
                            <i className="align-middle" data-feather="user-plus"></i> <span className="align-middle">Sign Up</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="pages-blank.html">
                            <i className="align-middle" data-feather="book"></i> <span className="align-middle">Blank</span>
                        </a>
                    </li>

                    <li className="sidebar-header">
                        Tools & Components
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="ui-buttons.html">
                            <i className="align-middle" data-feather="square"></i> <span className="align-middle">Buttons</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="ui-forms.html">
                            <i className="align-middle" data-feather="check-square"></i> <span className="align-middle">Forms</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="ui-cards.html">
                            <i className="align-middle" data-feather="grid"></i> <span className="align-middle">Cards</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="ui-typography.html">
                            <i className="align-middle" data-feather="align-left"></i> <span className="align-middle">Typography</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="icons-feather.html">
                            <i className="align-middle" data-feather="coffee"></i> <span className="align-middle">Icons</span>
                        </a>
                    </li>

                    <li className="sidebar-header">
                        Plugins & Addons
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="charts-chartjs.html">
                            <i className="align-middle" data-feather="bar-chart-2"></i> <span className="align-middle">Charts</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="maps-google.html">
                            <i className="align-middle" data-feather="map"></i> <span className="align-middle">Maps</span>
                        </a>
                    </li>
                </ul>


            </div>
        </nav>
    )
}

export default Sidebar