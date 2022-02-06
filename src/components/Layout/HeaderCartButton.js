import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

export const HeaderCartButton = props => {
  const cartCxt = useContext(CartContext);

  const numberOfCartitems = cartCxt.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);

  const { items } = cartCxt;
  useEffect(() => {
    if (items.length === 0) return;
    setbtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setbtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartitems}</span>
    </button>
  );
};
