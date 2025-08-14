import React, { useEffect, useState } from 'react';
import './ListProducts.css';
import cross_icon from '../../assets/cart_cross_icon.png';

const ListProducts = () => {
  const [allproducts, setallproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setallproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);


  const removeProduct=async(id)=>{
    await fetch('http://localhost:4000/removeProduct' ,{
      method:'POST',
     headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
},
      body:JSON.stringify({id:id})
    })
     await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>ALL PRODUCTS LIST</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
  <>
    <div key={index} className="listproduct-format-main listproduct-format">
      <img src={product.image} alt="" className="listproduct-product-icon" />
      <p>{product.name}</p>
      <p>${product.old_price}</p>
      <p>${product.new_price}</p>
      <p>{product.category}</p>
      <img className='listproduct-remove-icon' src={cross_icon} alt=""  onClick={() => removeProduct(product.id)} />
    </div>
    <hr />
  </>
))}
      </div>
    </div>
  );
};

export default ListProducts;
