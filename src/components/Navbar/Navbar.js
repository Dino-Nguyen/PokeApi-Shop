import React, { useState, useEffect} from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCartTotal } from '../../store/cartSlice';

const Navbar = () => {


  useEffect(() => {
    dispatch(getCartTotal());
  }, []);
  const dispatch = useDispatch();
  const {totalItems} = useSelector((state => state.cart));




  return (
    <nav className = "navbar">
      <div className='navbar-content'>
        <div className = "container">
          <div className = "navbar-top flex flex-between">
              <Link to = "/" className = "navbar-brand">
                <span className = "text-regal-blue">Poke</span><span className='text-gold'>Mon</span>
              </Link>

              <form className = "navbar-search flex">
                <input type = "text" placeholder='Search here ...' />
                <button type = "submit" className = "navbar-search-btn">
                  <i className = "fas fa-search"></i>
                </button>
              </form>

              <div className = "navbar-btns">
                <Link to = "/cart" className="add-to-cart-btn flex">
                  <span className = "btn-ico">
                    <i className = "fas fa-shopping-bag"></i>
                  </span>
                  <div className='btn-txt fw-5'>Bag
                    <span className='cart-count-value'>{totalItems}</span>
                  </div>
                </Link>
              </div>
          </div>
        </div>
        
        <div className='navbar-bottom bg-regal-blue'>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;