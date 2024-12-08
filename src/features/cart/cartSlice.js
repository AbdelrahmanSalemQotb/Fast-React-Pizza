import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addCartItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteCartItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId

      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 1)
        cartSlice.caseReducers.deleteCartItem(state, action);

      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addCartItem,
  deleteCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.reduce(
    (quantity, item) =>
      item.pizzaId === id ? quantity + item.quantity : quantity,
    0,
  );

export const getTotalQuantities = (state) =>
  state.cart.cart.reduce((quantity, item) => item.quantity + quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((totalPrice, item) => item.totalPrice + totalPrice, 0);
