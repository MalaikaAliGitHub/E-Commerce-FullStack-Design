import React, { createContext, useEffect, useState } from "react";

export const HomeContext = createContext(null);

const HomeContextProvider = (props) => {
  const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(()=>{
     fetch('http://localhost:4000/allproducts').then((response)=>response.json()).then((data)=>{
       console.log('Products loaded:', data.length); // Debug log
       setAll_product(data);
     })
  
        if(localStorage.getItem('auth-token')){
          console.log('User logged in, fetching cart...'); // Debug log
          fetch('http://localhost:4000/getcart',{
            method:'POST',
            headers:{
              Accept:'application/json',
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type':'application/json',
            },
            body:"",
          }).then((response)=>response.json()).then((data)=>{
            console.log('Cart data loaded:', data); // Debug log
            setCartItems(data);
          });
        } else {
          console.log('No auth token found'); // Debug log
        }
  },[])

  const addToCart = (id) => {
    console.log('Adding to cart:', id); // Debug log
    setCartItems((prev) => {
      const newCart = {
        ...prev,
        [id]: (prev[id] || 0) + 1,
      };
      console.log('New cart state:', newCart); // Debug log
      return newCart;
    });
    
    if(localStorage.getItem('auth-token')){
       fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/json',
           'auth-token': localStorage.getItem('auth-token'),
          'Content-Type':'application/json'
        },
         body: JSON.stringify({ itemId: id }),
       })
       .then((response)=>response.json())
       .then((data)=>console.log('Backend response:', data)) // Debug log
    } else {
      console.log('No auth token, cart not saved to backend'); // Debug log
    }
  };

  const removeFromCart = (id) => {
    console.log('Removing from cart:', id); // Debug log
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      console.log('Updated cart after removal:', updated); // Debug log
      return updated;
    });

      if(localStorage.getItem('auth-token')){
       fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/json',
           'auth-token': localStorage.getItem('auth-token'),
          'Content-Type':'application/json'
        },
         body: JSON.stringify({ itemId: id }),
       })
       .then((response)=>response.json())
       .then((data)=>console.log('Remove response:', data)) // Debug log
    }
  };

  const getTotalAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if(itemInfo) {
          totalAmount+=itemInfo.new_price*cartItems[item];
        }
      }
    }
    console.log('Total amount calculated:', totalAmount); // Debug log
    return totalAmount;
  }

  const getTotalCartItems=()=>{
    let totalitem=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        totalitem+=cartItems[item];
      }
    }
    console.log('Total cart items:', totalitem); // Debug log
    return totalitem;
  }

  const contextValue = {
    product_details: all_product,
    cartItems,
    addToCart,          
    removeFromCart,
    getTotalAmount,
    getTotalCartItems
  };

  return (
    <HomeContext.Provider value={contextValue}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;