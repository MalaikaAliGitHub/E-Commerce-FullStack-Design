import React from 'react'
 import './CategorySection.css';
import ProductCard from "../ProductCard/ProductCard";

const CategorySection = ({ id, title, banner, products }) => {
  return (
    <div className="category-section" id={id}>
      <img className="category-banner" src={banner} alt={title} />
      <h2 className="category-title">{title}</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};


export default CategorySection
