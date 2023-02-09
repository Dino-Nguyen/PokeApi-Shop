import React, {useEffect} from 'react';
import Slider from '../../components/Slider/Slider';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const {data: products, status: productStatus} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className = "home-page">
      <Slider />
      <ProductList products = {products} status = {productStatus} />
     
    </div>
  )
}

export default HomePage;