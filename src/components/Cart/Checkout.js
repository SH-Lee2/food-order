import React from "react";
import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const validateValue = (value) => {
    return value.trim() !== "";
};

const Checkout = ({ onClose }) => {
    const {
        value: inputName,
        isValid: inputNameIsValid,
        isError: inputNameHasError,
        reset: inputNameReset,
        inputBlurHandler: inputNameBlurHandler,
        changeValueHandler: chanegeInputNameHandler,
    } = useInput(validateValue);

    const {
        value: inputStreet,
        isValid: inputStreetIsValid,
        isError: inputStreetHasError,
        reset: inputStreetReset,
        inputBlurHandler: inputStreetBlurHandler,
        changeValueHandler: chanegeInputStreetHandler,
    } = useInput(validateValue);
    const {
        value: inputPostal,
        isValid: inputPostalIsValid,
        isError: inputPostalHasError,
        reset: inputPostalReset,
        inputBlurHandler: inputPostalBlurHandler,
        changeValueHandler: chanegeInputPostalHandler,
    } = useInput(validateValue);
    const {
        value: inputCity,
        isValid: inputCityIsValid,
        isError: inputCityHasError,
        reset: inputCityReset,
        inputBlurHandler: inputCityBlurHandler,
        changeValueHandler: chanegeInputCityHandler,
    } = useInput(validateValue);

    const inputNameClasses = inputNameHasError
        ? `${classes.control} ${classes.invalid}`
        : `${classes.control}`;
    const inputStreetClasses = inputStreetHasError
        ? `${classes.control} ${classes.invalid}`
        : `${classes.control}`;
    const inputPostalClasses = inputPostalHasError
        ? `${classes.control} ${classes.invalid}`
        : `${classes.control}`;
    const inputCityClasses = inputCityHasError
        ? `${classes.control} ${classes.invalid}`
        : `${classes.control}`;

    let formValid = false;
    if (
        inputNameIsValid &&
        inputStreetIsValid &&
        inputPostalIsValid &&
        inputCityIsValid
    ) {
        formValid = true;
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        if (!formValid) return;
        inputNameReset();
        inputStreetReset();
        inputPostalReset();
        inputCityReset();
    };
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={inputNameClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={inputName}
                    onChange={chanegeInputNameHandler}
                    onBlur={inputNameBlurHandler}
                />
                {inputNameHasError && (
                    <p className={classes.invalid}>
                        Please enter a valid name!
                    </p>
                )}
            </div>
            <div className={inputStreetClasses}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    value={inputStreet}
                    onChange={chanegeInputStreetHandler}
                    onBlur={inputStreetBlurHandler}
                />
                {inputStreetHasError && (
                    <p className={classes.invalid}>
                        Please enter a valid street!
                    </p>
                )}
            </div>
            <div className={inputPostalClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    type="text"
                    id="postal"
                    value={inputPostal}
                    onChange={chanegeInputPostalHandler}
                    onBlur={inputPostalBlurHandler}
                />
                {inputPostalHasError && (
                    <p className={classes.invalid}>
                        Please enter a valid postal code
                    </p>
                )}
            </div>
            <div className={inputCityClasses}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    value={inputCity}
                    onChange={chanegeInputCityHandler}
                    onBlur={inputCityBlurHandler}
                />
                {inputCityHasError && (
                    <p className={classes.invalid}>Please enter a valid city</p>
                )}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
                <button className={classes.submit} disabled={!formValid}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
