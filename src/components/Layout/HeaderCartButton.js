import React, { Fragment, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import Modal from "../UI/Modal";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
    const [modal, setModal] = useState(false);

    const openModalHandler = () => {
        setModal(true);
    };
    const closeModalHandler = () => {
        setModal(false);
    };
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
                <span className={classes.badge}>3</span>
            </button>
        </Fragment>
    );
};

export default HeaderCartButton;
