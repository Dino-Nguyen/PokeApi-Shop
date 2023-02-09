import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, Cart} from "./pages/index";
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import {Provider} from 'react-redux';
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/cart" element = {<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
