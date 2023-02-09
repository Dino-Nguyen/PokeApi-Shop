import React, {useEffect} from 'react';
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { removeFromCart, getCartTotal, clearCart, rename } from '../../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CartPage = () => {
    const dispatch = useDispatch();
    const {data: cartProducts} = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartTotal());
    }, [useSelector(state => state.cart)]); 

    const emptyCartMsg = <h4 className='text-red fw-6'>No Pokemons found!</h4>;

    console.log(cartProducts)

    return (
      <div className = "cart-page">
        <div className = "container">
          <div className = "breadcrumb">
            <ul className = "breadcrumb-items flex">
              <li className = "breadcrumb-item">
                <Link to = "/">
                  <i className = "fas fa-home"></i>
                  <span className = "breadcrumb-separator">
                    <i className = "fas fa-chevron-right"></i>
                  </span>
                </Link>
              </li>
              <li>Bag</li>
            </ul>
          </div>
        </div>
        <div className='bg-ghost-white py-5'>
            <div className='container'>
                <div className='section-title bg-ghost-white'>
                    <h3 className = "text-uppercase fw-7 text-regal-blue ls-1">My Bag</h3>
                </div>
                <ToastContainer />
                {
                    cartProducts.length === 0 ? emptyCartMsg : (
                        <div className = "cart-content grid">
                            <div className='cart-left'>
                                <div className = "cart-items grid">
                                    {
                                        cartProducts.map(cartProduct => (
                                            <div className='cart-item grid' key = {cartProduct.id}>
                                                <div className='cart-item-img flex flex-column bg-white'>
                                                    <img src = {cartProduct.sprites.front_default} alt = {cartProduct.title} />
                                                    <button type = "button" className=' rmv-from-cart-btn' onClick={() => dispatch(removeFromCart(cartProduct.id))}>
                                                        <span className='btn-release'> Release </span>
                                                    </button>
                                                </div>

                                                <div className='cart-item-info'>
                                                    <h6 className='fs-16 fw-5 text-light-blue'>base_experience: {cartProduct.base_experience}</h6>
                                                    <div className = "qty flex">
                                                        <span className = "text-light-blue qty-text">Moves:  </span>
                                                        <span className='move'>  {cartProduct.moves[0].move.name} </span> ,
                                                        <span className='move'>  {cartProduct.moves[1].move.name} </span> ,
                                                        <span className='move'>  {cartProduct.moves[2].move.name} </span> ,
                                                        <span className='move'>  {cartProduct.moves[3].move.name} </span> 
                                                    </div>
                                                    <div className = "flex flex-between">
                                                        <div className='text-pine-green fw-4 fs-15 price'>Abilities:</div>
                                                        <span className='abi-cart'> {cartProduct.abilities[0].ability.name} </span>,
                                                        <span className='abi-cart'> {cartProduct.abilities[1].ability.name}</span>
                                                        <div className='sub-total fw-6 fs-18 text-regal-blue'>
                                                        </div>
                                                        <div>
                                                        <span className='text-uppercase name sub-total fw-6 fs-18 text-regal-blue'>{cartProduct.name}</span>
                                                            <button className='btn-rename' onClick={() => dispatch(rename(cartProduct.id))}>rename</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <button type = "button" className='btn-danger' onClick={() => dispatch(clearCart())}>
                                    <span className = "fs-16">Release All</span> 
                                </button>
                            </div>
                          
                        </div>
                    )
                }
            </div>
        </div>
      </div>
    )
}

export default CartPage