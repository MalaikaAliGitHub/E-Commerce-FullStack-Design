import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import product_detail from '../../components/assets/product_details';  
import './ProductDetails.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


const ProductDetails = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);  
  };

  return (

         <div className='product-detail'>
      {product_detail.map(product => (
        <div key={product.id} className="single-product" onClick={() => handleCardClick(product.id)}>
          <div className="pro-left">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="pro-right">
            <h1 className="pro-name">{product.name}</h1>
            <p className='pro-deec'>{product.description}</p>

            <div className="pro-prices">
              <span className='pro-new-price'>${product.new_price}</span>
              <span className='pro-old-price'>${product.old_price}</span>
            </div>
          <div className="pro-ratings">
  {[1, 2, 3, 4, 5].map((star, i) => {
    if (product.rating >= star) {
      return <FaStar key={i} color="#FFD700" />;
    } else if (product.rating >= star - 0.5) {
      return <FaStarHalfAlt key={i} color="#FFD700" />;
    } else {
      return <FaRegStar key={i} color="#FFD700" />;
    }
  })}
  <span className='rating-text'>({product.rating})</span>
</div>
          </div>

         
        </div>
      ))}
    </div>
    
  )
}

export default ProductDetails
