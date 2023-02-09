import React, {useState} from 'react';
import "./SingleProduct.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../../store/modalSlice';
import { addToCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';


const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: product } = useSelector(state => state.modal);

  

  const addToCartHandler = (product) => {
    
    const tempProduct = {
      ...product,
      quantity: qty,
      
    }
    dispatch(addToCart(tempProduct));
    dispatch(setIsModalVisible(false));
    // navigate('/cart');
    if(!addToCart.state) {
      navigate('/cart');
    } else {
      navigate('/');
    }
  };

  const modalOverlayHandler = (e) => {
    if(e.target.classList.contains('overlay-bg')){
      dispatch(setIsModalVisible(false));
    }
  }

  return (
    <div className='overlay-bg' onClick = {modalOverlayHandler}>
      <div className = "product-details-modal bg-white">
        <button type = "button" className='modal-close-btn flex flex-center fs-14' onClick={() => dispatch(setIsModalVisible(false))}>
          <i className = "fas fa-times"></i>
        </button>
        <div className = "details-content grid">
          
          <div className = "details-right">
            <div className = "details-img">
              <img src = {product.sprites.front_default} />
            </div>
          </div>
       
          <div className='details-left'>
            <div className = "details-info">
              <h3 className = "title text-uppercase text-regal-blue fs-22 fw-5">{product.name}</h3>
              <p className='description text-pine-green'>{product.types[0].type.name}</p>
              Base_experience: {product.base_experience}
              <div className='price fw-7 fs-24'>Abilities: 
              <div>
            <span className='abi'> {product.abilities[0].ability.name} </span>,
            <span className='abi'> {product.abilities[1].ability.name}</span>
                </div></div>
              <div className = "qty flex">
                <span className = "text-light-blue qty-text">Moves: </span>
                <span className='move'>  {product.moves[0].move.name} </span> ,
                <span className='move'>  {product.moves[1].move.name} </span> ,
                <span className='move'>  {product.moves[2].move.name} </span> ,
                <span className='move'>  {product.moves[3].move.name} </span> 
              </div>
              <button type = "button" className='btn-primary add-to-cart-btn' onClick={() => addToCartHandler(product)}>
                  <span className = "btn-icon">
                    <i className='fas fa-hand'></i>
                  </span>
                  <span className = 'btn-text'>Catch</span>
                  
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct