import React, { useRef } from "react";
import Input from "../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = ({ onAddToCart, id }) => {
    // const [enteredAmount, setEnteredAmount] = useState(1);
    // const changeAmountHandler = (event) => {
    //     if (event.target.value < 1 || event.target.value > 10) return;
    //     setEnteredAmount(event.target.value);
    // };
    const amountInputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmount < 1 ||
            enteredAmount > 10
        ) {
            return;
        }

        onAddToCart(enteredAmountNumber);
        amountInputRef.current.value = "1";
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id,
                    type: "number",
                    step: "1",
                    defaultValue: "1",
                    min: "1",
                    max: "10",
                    // value: enteredAmount,
                    // onChange: changeAmountHandler,
                }}
            />
            <button type="submit">+ Add</button>
        </form>
    );
};

export default MealItemForm;
