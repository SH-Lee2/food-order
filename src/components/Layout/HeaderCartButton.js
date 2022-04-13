import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import Modal from "../UI/Modal";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
    const [modal, setModal] = useState(false);
    const ctx = useContext(CartContext);
    const openModalHandler = () => {
        console.log(ctx);
        setModal(true);
    };
    const closeModalHandler = () => {
        setModal(false);
    };
    const bedge = ctx.items.reduce((pre, cur) => pre + cur.amount, 0);
    return (
        <Fragment>
            {modal && <Modal onConfirm={closeModalHandler} />}
            <button
                className={`${classes.button} ${classes.bump}`}
                onClick={openModalHandler}
            >
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
