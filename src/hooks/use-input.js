import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const inputValueIsValid = validateValue(enteredValue);

    const inputHasError = !inputValueIsValid && isTouched;

    const changeValueHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: inputValueIsValid,
        isError: inputHasError,
        reset,
        inputBlurHandler,
        changeValueHandler,
    };
};

export default useInput;
