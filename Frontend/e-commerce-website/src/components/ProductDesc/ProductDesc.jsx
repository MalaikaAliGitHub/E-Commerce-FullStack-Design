import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDesc.css';
import { HomeContext } from '../../context/HomeContext';
import product_details from "../assets/product_details";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import DescriptionBox from '../DescriptionBox/DescriptionBox';

const ProductDesc = () => {
  const { id } = useParams();
  const productId = Number(id);
  const product = product_details.find(p => p.id === productId);

  const { addToCart } = useContext(HomeContext);  // <-- HERE, before return

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className='productdisplay'>
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
          <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
          </div>
        </div>

        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>

          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-prices-old">${product.old_price}</div>
            <div className="productdisplay-right-prices-new">${product.new_price}</div>
          </div>

          <div className="productdisplay-right-desc">
            {product.description}
          </div>

          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div>

          <p className='product-display-right-category'>
            <span>Category : {product.category}</span>
          </p>

          <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        </div>
      </div>

      <DescriptionBox />
    </>
  );
};

export default ProductDesc;
