import { CartContext } from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const exisitingCartItem = state.items[existingCartItemIndex];

    let updatedItem;
    let updatedItems;

    if (exisitingCartItem) {
      updatedItem = {
        ...exisitingCartItem,
        amount: exisitingCartItem.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.item };
      updatedItems = state.items.concat(updatedItem);
    }

    const updtedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updtedTotalAmount
    };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    const exisitingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exisitingCartItem.price;

    let updatedItems;

    if (exisitingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exisitingCartItem,
        amount: exisitingCartItem.amount - 1
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    
    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };

  }

  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
