import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';         // ✅ your working path
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { HomeContext } from '../../context/HomeContext';
import nav_dropdown from '../assets/nav_dropdown.png';

const Navbar = () => {

  const [menu,setmenu]=useState("home"); 
  const{getTotalCartItems}=useContext(HomeContext);
  const menuRef=useRef();
  const dropdown_toggle=(e)=>{
     menuRef.current.classList.toggle('nav-menu-visible');
     e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setmenu("home")}}> <Link style={{textDecoration:'none' ,color:'black'}} to='/'>Home</Link> {menu==="home" ? <hr/> :<></> }</li>
        <li onClick={()=>{setmenu("list")}}>  <Link  style={{textDecoration:'none' ,color:'black'}} to='/things'> Product Listing Page </Link>   {menu==="list" ? <hr/> :<></> } </li>
        <li onClick={()=>{setmenu("detail")}}>    <Link  style={{textDecoration:'none' ,color:'black'}} to='/product'>  Product Details  </Link> {menu==="detail" ? <hr/> :<></> } </li>
        <li onClick={()=>{setmenu("cart")}}>    <Link  style={{textDecoration:'none' ,color:'black'}} to='/cart'> Cart Page   </Link>   {menu==="cart" ? <hr/> :<></> } </li>
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to='/login'> <button>Login</button></Link> }

         <div className="nav-cart-wrapper">
  <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>  
  <div className="nav-cart-count">{getTotalCartItems()}</div>
</div>

      </div>
    </div>
  );
};

export default Navbar;
