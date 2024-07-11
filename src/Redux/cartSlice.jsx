import { createSlice } from '@reduxjs/toolkit'

const initialState=JSON.parse(localStorage.getItem('Add_To_Carts'))??[];

export const cartSlice = createSlice({
    name:'CART',
    initialState,
    reducers:{
        addToCart(state,action){
         const itemInCart = state.find((item) => item.id === action.payload.id);
         console.log("Add to Cart another ",itemInCart);
         if (itemInCart) {
             itemInCart.qty++;
         } else {
             state.push({ ...action.payload, qty: 1 });
         }
    // state.push(action.payload);
    // console.log("Add to Cart Data ",action.payload);
    // console.log("Add to Cart state ",state); 
        },
        incrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload.id);
            item.qty++;
          },

          decrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload.id);
            if(item.qty>=1){
                item.qty-- ;
            }
          },

        deleteFromCart(state,action){
            return state.filter(item=>item.id !== action.payload.id);
        }
    },
});

export const { addToCart, deleteFromCart ,incrementQuantity,decrementQuantity } = cartSlice.actions

export default cartSlice.reducer;