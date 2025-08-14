import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import all_product from '../components/assets/all_product.js';
import men_banner from '../components/assets/banner_mens.png';
import women_banner from '../components/assets/banner_women.png';
import kid_banner from '../components/assets/banner_kids.png';
import electronics_banner from '../components/assets/banner_electronics.avif'; 
import jewellry_banner from '../components/assets/jewelry-banner.jpg';
import CategorySection from "../components/CategorySection/CategorySection";
import './CSS/ShopCategory.css'


const ShopCategory = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // remove the #
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const menProducts = all_product.filter(item => item.category === 'men');
  const womenProducts = all_product.filter(item => item.category === 'women');
  const kidProducts = all_product.filter(item => item.category === 'kid');
  const electronicsProducts = all_product.filter(item => item.category === 'electronics'); 
  const jewellryProducts = all_product.filter(item => item.category === 'jewellry');

  return (
    <div className="shop-category-container">
      <div className="side-navbar">
        <a href="#men">Men</a>
        <a href="#women">Women</a>
        <a href="#kids">Kids</a>
        <a href="#electronics">Electronics</a>
        <a href="#jewellry">Jewellry</a>
      </div>
      <div className="shop-category-content">
        <CategorySection id="men" title="Men's Collection" banner={men_banner} products={menProducts} />
        <CategorySection id="women" title="Women's Collection" banner={women_banner} products={womenProducts} />
        <CategorySection id="kids" title="Kids Collection" banner={kid_banner} products={kidProducts} />
        <CategorySection id="electronics" title="Electronics Collection" banner={electronics_banner} products={electronicsProducts} />
        <CategorySection id="jewellry" title="Jewellry Collection" banner={jewellry_banner} products={jewellryProducts} />
      </div>
    </div>
  );
};

export default ShopCategory;
