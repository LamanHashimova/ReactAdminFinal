import logo from './logo.svg';
import './App.css';
import './assets/css/app.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar.js'
import Sidebar from './components/layout/Sidebar/Sidebar.js'
import Footer from './components/layout/Footer/Footer.js'
import Brands from './components/Brands/BrandsTable.js';
import BrandCreate from './components/Brands/BrandCreate.js';
import BrandEdit from './components/Brands/BrandEdit.js';

import Colors from './components/Colors/ColorsTable.js';
import ColorCreate from './components/Colors/ColorCreate.js';
import ColorEdit from './components/Colors/ColorEdit.js';

import Tags from './components/Tags/TagsTable.js';
import TagCreate from './components/Tags/TagCreate.js';
import TagEdit from './components/Tags/TagEdit.js';

import Dashboard from './components/Dashboard/Dashboard.js';

import Materials from './components/Materials/MaterialsTable.js';
import MaterialCreate from './components/Materials/MaterialCreate.js';
import MaterialEdit from './components/Materials/MaterialEdit.js';

import Sizes from './components/Sizes/SizesTable.js';
import SizeCreate from './components/Sizes/SizeCreate.js';
import SizeEdit from './components/Sizes/SizeEdit.js';

import ProductColors from './components/ProductColor/ProductColorTable.js';
import ProductColorCreate from './components/ProductColor/ProductColorCreate.js';
import ProductColorEdit from './components/ProductColor/ProductColorEdit.js';

import ProductMaterials from './components/ProductMaterials/ProductMaterialTable.js';
import ProductMaterialCreate from './components/ProductMaterials/ProductMaterialCreate.js';
import ProductMaterialEdit from './components/ProductMaterials/ProductMaterialEdit.js';

import ProductSizes from './components/ProductSizes/ProductSizeTable.js';
import ProductSizeCreate from './components/ProductSizes/ProductSizeCreate.js';
import ProductSizeEdit from './components/ProductSizes/ProductSizeEdit.js';

import ProductTable from './components/Products/ProductTable.js';
import ProductCreate from './components/Products/ProductCreate.js';
import ProductEdit from './components/Products/ProductEdit.js';

import BlogTable from './components/Blogs/BlogTable.js';
import BlogCreate from './components/Blogs/BlogCreate.js';
import BlogEdit from './components/Blogs/BlogEdit.js';

import TypeTable from './components/Types/TypeTable.js';
import TypeCreate from './components/Types/TypeCreate.js';
import TypeEdit from './components/Types/TypeEdit.js';

import SettingTable from './components/Settings/SettingTable.js';
import SettingCreate from './components/Settings/SettingCreate.js';
import SettingEdit from './components/Settings/SettingEdit.js';

import SliderTable from './components/Sliders/SliderTable.js';
import SliderCreate from './components/Sliders/SliderCreate.js';
import SliderEdit from './components/Sliders/SliderEdit.js';

import TeamTable from './components/Teams/TeamTable.js';
import TeamCreate from './components/Teams/TeamCreate.js';
import TeamEdit from './components/Teams/TeamEdit.js';

import Login from './components/Account/Login';
import Protection from './components/Protection';
import { useState } from 'react';

function App() {
  let [user, setUser] = useState("");
  let currentToken = localStorage.getItem('token');
  let currentUser;
  function parseJwt(token) {
    if(token.length > 50){
      var base64Url = token.split('.')[1];
    }
    if (base64Url !== undefined) {
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

    }
    return JSON.parse(jsonPayload);
  };
  let userdet;
  if (currentToken != null) {
    userdet = parseJwt(currentToken)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  if (userdet === "SuperAdmin" || userdet === "Admin") {
    currentUser = currentToken;
    console.log(user);
  }
  return (
    <Router>
      <div className='wrapper' >
      {(localStorage.getItem("token") === currentUser && currentToken.length > 100) ? <Sidebar /> : ''}
        <div className='main'>
        {(localStorage.getItem("token") === currentUser && currentToken.length > 100) ? <Navbar /> : ''}
          <Routes>
           <Route path='/login' element={<Login user={setUser} />} />
            <Route path='/' element={<Login user={setUser} />} />
            <Route element={<Protection />}>
            <Route path="/brands" element={<Brands />} />
            <Route path="/brandcreate" element={<BrandCreate />} />
            <Route path="/brandupdate/:id" element={<BrandEdit />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/colorcreate" element={<ColorCreate />} />
            <Route path="/colorupdate/:id" element={<ColorEdit />} />

            <Route path="/tags" element={<Tags />} />
            <Route path="/tagcreate" element={<TagCreate />} />
            <Route path="/tagupdate/:id" element={<TagEdit />} />

            <Route path="/materials" element={<Materials />} />
            <Route path="/materialcreate" element={<MaterialCreate />} />
            <Route path="/materialupdate/:id" element={<MaterialEdit />} />


            <Route path="/sizes" element={<Sizes />} />
            <Route path="/sizecreate" element={<SizeCreate />} />
            <Route path="/sizeupdate/:id" element={<SizeEdit />} />

            <Route path="/productcolors" element={<ProductColors />} />
            <Route path="/productcolorcreate" element={<ProductColorCreate />} />
            <Route path="/productcolorupdate/:id" element={<ProductColorEdit />} />

            
            <Route path="/productmaterials" element={<ProductMaterials />} />
            <Route path="/productmaterialcreate" element={<ProductMaterialCreate />} />
            <Route path="/productmaterialupdate/:id" element={<ProductMaterialEdit />} />

            <Route path="/productsizes" element={<ProductSizes />} />
            <Route path="/productsizecreate" element={<ProductSizeCreate />} />
            <Route path="/productsizeupdate/:id" element={<ProductSizeEdit />} />

            <Route path="/products" element={<ProductTable />} />
            <Route path="/productcreate" element={<ProductCreate />} />
            <Route path="/productupdate/:id" element={<ProductEdit />} />

            <Route path="/blogs" element={<BlogTable />} />
            <Route path="/blogcreate" element={<BlogCreate />} />
            <Route path="/blogupdate/:id" element={<BlogEdit />} />

            <Route path="/types" element={<TypeTable />} />
            <Route path="/typecreate" element={<TypeCreate />} />
            <Route path="/typeupdate/:id" element={<TypeEdit />} />

            <Route path="/teams" element={<TeamTable />} />
            <Route path="/teamcreate" element={<TeamCreate />} />
            <Route path="/teamupdate/:id" element={<TeamEdit />} />

            <Route path="/settings" element={<SettingTable />} />
            <Route path="/settingcreate" element={<SettingCreate />} />
            <Route path="/settingupdate/:id" element={<SettingEdit />} />

            <Route path="/sliders" element={<SliderTable />} />
            <Route path="/slidercreate" element={<SliderCreate />} />
            <Route path="/sliderupdate/:id" element={<SliderEdit />} />

            </Route>
          </Routes>



          <Footer />
        </div>

      </div>


    </Router>

  );
}

export default App;
