import React, { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onClick }) => {
    const ctx = useContext(CartContext);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const { items } = ctx;

    const bedge = items.reduce((pre, cur) => pre + cur.amount, 0);

    const btnclasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ""
    }`;

    useEffect(() => {
        if (items.length === 0) return;
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [items]);

    return (
        <Fragment>
            <button className={btnclasses} onClick={onClick}>
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>{bedge}</span>
            </button>
        </Fragment>
    );
};

export default HeaderCartButton;
