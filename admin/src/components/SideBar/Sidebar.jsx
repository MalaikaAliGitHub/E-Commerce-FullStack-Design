import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import ProductListIcon from '../../assets/Product_list_icon.svg'; // exact match


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addProduct'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
             <img src={add_product_icon} alt="" />
             <p>Add Product</p>
          </div> 
        </Link>

        <Link to={'/listProducts'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
             <img src={ProductListIcon} alt="" />
             <p>Products List</p>
          </div> 
        </Link>


        
      
    </div>
  )
}

export default Sidebar
