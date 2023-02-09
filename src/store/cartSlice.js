import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return [];
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: fetchFromLocalStorage(),
        totalItems: 0,
        totalAmount: 0,
    }, 
    reducers: {
        addToCart(state, action){
            const catchRate = [0,1]
            const randomCatch = catchRate[Math.floor(Math.random() * catchRate.length)]
            if(randomCatch == 0){
                   const tempItem = state.data.find(item => item.id === action.payload.id);
                 if(tempItem){
                    const tempCart = state.data.map(item => {
                        if(item.id === action.payload.id){
                            toast.warn('You already have this Pokemon', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
                            return { ...item};
                        } else {
                            return item;
                        }
                    });
                    state.data = tempCart;
                    storeInLocalStorage(state.data);
                } else {
                    state.data.push(action.payload);
                    storeInLocalStorage(state.data);
                    toast.success('🦄 Successfully Catch', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }     
                
            } else {
                
                toast.error('Catch Fail, Try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                
            }
        },
        removeFromCart(state, action){
            const tempCart = state.data.filter(item => item.id !== action.payload);
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },
        clearCart(state){
            state.data = [];
            storeInLocalStorage(state.data);
        },
         getCartTotal(state){
            state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice;
            }, 0);
            state.totalItems = state.data.length;
        },
        rename(state, action){
            let newName = prompt("new") 
            const tempItem = state.data.find(item => item.id === action.payload)
        if(tempItem){
            const tempCart = state.data.map(item => {
                if(item.id === action.payload){
                    item.name = newName
                    
                    return { ...item};
                } else {
                    return item;
                }
            });
            state.data = tempCart;
            storeInLocalStorage(state.data);
        } else {
            state.data.push(action.payload);
            storeInLocalStorage(state.data);
           
        }     




        }
    }
});

export const {addToCart, removeFromCart, rename, getCartTotal, clearCart} = cartSlice.actions;
export default cartSlice.reducer;