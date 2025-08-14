import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <p className="product-name">{product.name}</p>
        <div className="price">
          <span className="new-price">${product.new_price}</span>
          <span className="old-price">${product.old_price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;