import React from 'react'
import './Admin.css'
import Sidebar from '../../components/SideBar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import ListProducts from '../../components/ListProducts/ListProducts'

const Admin = () => {
  return (
    <div className='admin'>
       <Sidebar/>
       <Routes>
    <Route path='/addProduct' element={<AddProduct />}  />
<Route path='/listProducts' element={<ListProducts />} />

        </Routes>

    </div>
  )
}

export default Admin
