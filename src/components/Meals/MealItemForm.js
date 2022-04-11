import React, { useState } from "react";
import Input from "../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = () => {
    const [enteredAmount, setEnteredAmount] = useState(1);

    const changeAmountHandler = (event) => {
        if (event.target.value < 1 || event.target.value > 10) return;
        setEnteredAmount(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
                <Input
                    name="amount"
                    label="Amount"
                    type="number"
                    step="1"
                    value={enteredAmount}
                    onChange={changeAmountHandler}
                />
            </div>
            <button type="submit">+ Add</button>
        </form>
    );
};

export default MealItemForm;
