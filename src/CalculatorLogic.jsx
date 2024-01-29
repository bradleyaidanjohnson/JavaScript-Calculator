import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import CalculatorDisplay from "./CalculatorDisplay";

function CalculatorLogic() {
  const [calculatorString, setCalculatorString] = useState("");
  const [display, setDisplay] = useState("");
  const [stages, setStages] = useState([]);
  const [postCalculation, setPostCalculation] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("display should read: " + display);
    console.log("calculatorString is: " + calculatorString);
    console.log("stages are: " + stages);
    console.log("count is: " + count);
    console.log("postCalculation is: " + postCalculation);
    document.addEventListener("keydown", (e) => keyUp(e.key));
    document.removeEventListener("keydown", (e) => keyUp(e.key));
  });

  const keyUp = (key) => {
    setCount(count + 1);
    if (key.match(/\d/)) {
      console.log("reached1 " + key);
      inputDigit(key);
      return;
    }
    if (key.match(/\./)) {
      console.log("reached2 " + key);
      inputDecimal();
      return;
    }
    if (key === "Enter" || key === "=") {
      console.log("reached3 " + key);
      inputEquals();
      return;
    }
    if (key === "+" || key === "-" || key === "/") {
      console.log("reached4 ") + key;
      inputOperator(key);
      return;
    }
    if (key.toUpperCase() === "X") {
      console.log("reached5 ") + key;
      inputOperator("X" + key);
      return;
    }
    if (key === "Backspace" || key === "Delete") {
      console.log("reached6 ") + key;
      clearButton();
      return;
    }
  };

  const clearButton = () => {
    console.log("currently tracking keys: CLEAR");
    /* if (calculatorString) {
      setCalculatorString("");
      setDisplay("");
    } else {
      setDisplay("");
      setStages([]);
    } */
    setCalculatorString("");
    setDisplay("");
    setStages([]);
    setPostCalculation(false);
  };

  const inputDigit = (digit) => {
    console.log("currently tracking keys: " + digit);
    if (postCalculation) {
      // logic
    }
    if (!calculatorString) {
      if (digit === "0") {
        return;
      } else {
        setCalculatorString(digit);
        setDisplay(digit);
        return;
      }
    } else {
      const pattern = /\d\./;
      if (pattern.test(calculatorString)) {
        const newCalculatorString = calculatorString + digit;
        setCalculatorString(newCalculatorString);
        setDisplay(newCalculatorString);
        return;
      }
      if (
        calculatorString === "+" ||
        calculatorString === "X" ||
        (calculatorString === "-" && pattern.test(stages[stages.length - 1])) ||
        calculatorString === "/"
      ) {
        setStages([...stages, calculatorString]);
        setCalculatorString(digit);
        setDisplay(digit);
      } else {
        const newCalculatorString = calculatorString + digit;
        setCalculatorString(newCalculatorString);
        setDisplay(newCalculatorString);
      }
    }
  };

  const inputDecimal = () => {
    console.log("currently tracking keys: decimal");
    console.log("postCalculation is " + postCalculation);
    if (postCalculation) {
      setCalculatorString("");
      setDisplay("");
      setStages([]);
      setPostCalculation(false);
      inputDecimal();
      return;
    }
    if (calculatorString.includes(".")) {
      return;
    }

    if (
      calculatorString.includes("+") ||
      calculatorString.includes("-") ||
      calculatorString.includes("*") ||
      calculatorString.includes("/")
    ) {
      setStages([...stages, calculatorString]);
      setDisplay("");
      setCalculatorString("");
    }

    let newCalculatorString = calculatorString;
    newCalculatorString = !newCalculatorString
      ? "0."
      : newCalculatorString + ".";

    setDisplay(newCalculatorString);
    setCalculatorString(newCalculatorString);
  };
  const inputEquals = () => {
    console.log("currently tracking keys: equals");
    if (postCalculation) {
      setCalculatorString("");
      setDisplay("");
      setStages([]);
      setPostCalculation(false);
      // inputEquals();
      return;
    }
    //setStages([...stages, calculatorString]);
    calculate(calculatorString);
  };

  const inputOperator = (operator) => {
    console.log("currently tracking keys: " + operator);
    if (postCalculation) {
      // logic
    }
    if (!calculatorString) {
      return;
    }
    if (operator === "-") {
      if (
        calculatorString === "X" ||
        calculatorString === "/" ||
        calculatorString === "-" ||
        calculatorString === "+"
      ) {
        setStages([...stages, calculatorString]);
        setDisplay("");
        setCalculatorString(operator);
      }
    } else if (
      calculatorString === "-" ||
      calculatorString === "X" ||
      calculatorString === "/" ||
      calculatorString === "+"
    ) {
      setDisplay("");
      setCalculatorString(operator);
      return;
    }

    setStages([...stages, calculatorString]);
    setDisplay("");
    setCalculatorString(operator);
  };

  const calculate = (unstagedString) => {
    let shallowStages = [];
    shallowStages = [...stages, unstagedString];
    console.log("shallowStages is: " + shallowStages);
    if (shallowStages.length) {
      while (shallowStages.includes("X")) {
        const multiplyOperatorIndex = shallowStages.indexOf("X");
        const multiplyResult =
          Number(shallowStages[multiplyOperatorIndex - 1]) *
          Number(shallowStages[multiplyOperatorIndex + 1]);
        shallowStages.splice(multiplyOperatorIndex + 2, 0, multiplyResult);
        shallowStages.splice(multiplyOperatorIndex - 1, 3);
        console.log("!shallowStages is: " + shallowStages);
      }
      while (shallowStages.includes("/")) {
        const multiplyOperatorIndex = shallowStages.indexOf("/");
        const multiplyResult =
          Number(shallowStages[multiplyOperatorIndex - 1]) /
          Number(shallowStages[multiplyOperatorIndex + 1]);
        shallowStages.splice(multiplyOperatorIndex + 2, 0, multiplyResult);
        shallowStages.splice(multiplyOperatorIndex - 1, 3);
        console.log("!shallowStages is: " + shallowStages);
      }
      while (shallowStages.includes("+") || shallowStages.includes("+")) {
        for (let i = 1; i < shallowStages.length; i++) {
          if (shallowStages[i] === "+" || shallowStages[i] === "-") {
            const operatorIndex = i;
            const operatedResult =
              shallowStages[i] === "+"
                ? Number(shallowStages[operatorIndex - 1]) +
                  Number(shallowStages[operatorIndex + 1])
                : Number(shallowStages[operatorIndex - 1]) -
                  Number(shallowStages[operatorIndex + 1]);
            shallowStages.splice(operatorIndex + 2, 0, operatedResult);
            shallowStages.splice(operatorIndex - 1, 3);
            console.log("!shallowStages is: " + shallowStages);
            i = 1;
          }
        }
      }
      if (shallowStages.length) {
        console.log(
          "shallowStages has a length of at least 1 and is: " + shallowStages
        );
        if (Math.floor(shallowStages[0]) === shallowStages[0]) {
          setDisplay(shallowStages[0].toString());
        } else {
          console.log("shallowStages is " + shallowStages);
          if (shallowStages[0].toString().split(".")[1].length > 5) {
            setDisplay(shallowStages[0].toFixed(5));
          } else {
            setDisplay(
              shallowStages[0].toFixed(
                shallowStages[0].toString().split(".")[1].length
              )
            );
          }
        }
      }

      setCalculatorString(shallowStages[0].toString());
      setStages([]);
      setPostCalculation(true);
    }
  };
  return (
    <div>
      <CalculatorDisplay
        display={display}
        inputDigit={inputDigit}
        inputOperator={inputOperator}
        inputDecimal={inputDecimal}
        inputEquals={inputEquals}
        clearButton={clearButton}
      />
    </div>
  );
}

export default CalculatorLogic;
