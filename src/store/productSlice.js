import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUS.IDLE,
    },

    reducers: {
        setProducts(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
    },
});

export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => {
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING));
        try{
            let data = []
            const response = await fetch(`${BASE_URL}`);
            const data1 = await response.json();
            const dataPoke = await data1.results
            console.log(dataPoke)
            for (let i = 0; i < dataPoke.length; i++) {
                console.log(dataPoke[i].name)
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dataPoke[i].name}`)
                const data2 = await res.json()
                console.log(data2)
                data.push(data2)
            }
            dispatch(setProducts(data));
            dispatch(setStatus(STATUS.IDLE));
            
            
        } catch(error){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}
