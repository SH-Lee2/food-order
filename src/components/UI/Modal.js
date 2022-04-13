import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Cart from "../Cart/Cart";
import Card from "./Card";

import classes from "./Modal.module.css";

const Backdrop = ({ onConfirm }) => {
    return <div className={classes.backdrop} onClick={onConfirm} />;
};

const Overlay = ({ onConfirm }) => {
    return (
        <Card className={classes.modal}>
            <Cart onConfirm={onConfirm} />
        </Card>
    );
};

const Modal = ({ onConfirm }) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <Overlay onConfirm={onConfirm} />,
                document.getElementById("overlay-root")
            )}
        </Fragment>
    );
};

export default Modal;
