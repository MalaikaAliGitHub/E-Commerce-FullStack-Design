import React, { useContext } from 'react';
import './CartItems.css';
import { HomeContext } from '../../context/HomeContext';
import remove_icon from '../assets/cart_cross_icon.png';

const CartItems = () => {
 const {  product_details ,cartItems, removeFromCart,getTotalAmount} = useContext(HomeContext);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {product_details.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalAmount()}</p>
                </div>
                <hr />
                <div className='cartitems-total-item'>
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
            <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalAmount()}</h3>
            </div>
        </div>
        <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code,Enter it here.</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='Promo Code' />
                <button>Submit</button>
            </div>
             
        </div>
      </div>
    </div>
  );
};

export default CartItems;
