import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [calculatorString, setCalculatorString] = useState("");
  const [display, setDisplay] = useState("");
  const [stages, setStages] = useState([]);

  useEffect(() => {
    console.log("display should read: " + display);
    console.log("calculatorString is: " + calculatorString);
    console.log("stages are: " + stages);
    document.addEventListener("keydown", (e) => keyDown(e.key));
    document.removeEventListener("keydown", (e) => keyDown(e.key));
  });

  const keyDown = (key) => {
    if (key.match(/\d/)) {
      console.log("reached1");
      inputDigit(key);
      return;
    }
    if (key.match(/\./)) {
      console.log("reached2");
      inputDecimal();
      return;
    }
    if (key === "Enter" || key === "=") {
      console.log("reached3");
      inputEquals();
      return;
    }
    if (key === "+" || key === "-" || key === "/") {
      console.log("reached4");
      inputOperator(key);
      return;
    }
    if (key.toUpperCase() === "X") {
      inputOperator("X");
      return;
    }
    if (key === "Backspace" || key === "Delete") {
      clearButton();
      return;
    }
  };

  const clearButton = () => {
    if (calculatorString) {
      setCalculatorString("");
      setDisplay("");
    } else {
      setDisplay("");
      setStages([]);
    }
  };

  const inputDigit = (digit) => {
    if (digit === "0" && calculatorString === "") {
      return;
    }
    if (!calculatorString || calculatorString.match(/\d\./)) {
      console.log("add digit to calcstring");
      console.log(calculatorString);
      calculatorString
        ? setCalculatorString(calculatorString + digit)
        : setCalculatorString(digit);
    } else {
      setStages([...stages, calculatorString]);
      setCalculatorString(digit);
      setDisplay(digit);
    }
    setDisplay(display + digit);
  };

  const inputDecimal = () => {
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
    setStages([...stages, calculatorString]);
    calculate(calculatorString);
  };

  const calculate = (unstagedString) => {
    let shallowStages = [...stages, unstagedString];
    while (shallowStages.includes("X")) {
      const multiplyOperatorIndex = shallowStages.indexOf("X");
      const multiplyResult =
        Number(shallowStages[multiplyOperatorIndex - 1]) *
        Number(shallowStages[multiplyOperatorIndex + 1]);
      shallowStages.splice(multiplyOperatorIndex + 2, 0, multiplyResult);
      shallowStages.splice(multiplyOperatorIndex - 1, 3);
    }
    while (shallowStages.includes("/")) {
      const multiplyOperatorIndex = shallowStages.indexOf("/");
      const multiplyResult =
        Number(shallowStages[multiplyOperatorIndex - 1]) /
        Number(shallowStages[multiplyOperatorIndex + 1]);
      shallowStages.splice(multiplyOperatorIndex + 2, 0, multiplyResult);
      shallowStages.splice(multiplyOperatorIndex - 1, 3);
    }
    while (shallowStages.includes("+")) {
      const multiplyOperatorIndex = shallowStages.indexOf("+");
      const multiplyResult =
        Number(shallowStages[multiplyOperatorIndex - 1]) +
        Number(shallowStages[multiplyOperatorIndex + 1]);
      shallowStages.splice(multiplyOperatorIndex + 2, 0, multiplyResult);
      shallowStages.splice(multiplyOperatorIndex - 1, 3);
    }
    while (shallowStages.includes("-")) {
      const multiplyOperatorIndex = shallowStages.indexOf("-");
      const multiplyResult =
        Number(shallowStages[multiplyOperatorIndex - 1]) -
        Number(shallowStages[multiplyOperatorIndex + 1]);
      shallowStages.splice(multiplyOperatorIndex + 2, 0, multiplyResult);
      shallowStages.splice(multiplyOperatorIndex - 1, 3);
    }
    setDisplay(shallowStages[0]);
    setCalculatorString(shallowStages[0]);
    setStages([]);
  };

  const inputOperator = (operator) => {
    if (!calculatorString) {
      return;
    }
    if (
      operator === "-" &&
      (calculatorString === "-" ||
        calculatorString === "X" ||
        calculatorString === "/" ||
        calculatorString === "+")
    ) {
      setStages([...stages, calculatorString]);
      setDisplay("");
      setCalculatorString("-");
      return;
    }
    if (
      calculatorString === "X" ||
      calculatorString === "/" ||
      calculatorString === "+"
    ) {
      setCalculatorString(operator);
      return;
    }

    setStages([...stages, calculatorString]);
    setDisplay("");
    setCalculatorString(operator);
  };

  return (
    <div className="container">
      <div className="header">Calculator</div>
      <div className="result" id="display">
        {display ? display : "0"}
      </div>
      <div className="first-row">
        <input type="button" name="" value="&radic;" className="global" />
        <input type="button" name="" value="(" className="global" />
        <input type="button" name="" value=")" className="global" />
        <input type="button" name="" value="%" className="global" />
      </div>
      <div className="second-row">
        <input
          type="button"
          name=""
          value="7"
          id="seven"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="8"
          id="eight"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="9"
          id="nine"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="/"
          id="divide"
          className="global"
          onClick={(e) => inputOperator(e.target.value)}
        />
      </div>
      <div className="third-row">
        <input
          type="button"
          name=""
          value="4"
          id="four"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="5"
          id="five"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="6"
          id="six"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="X"
          id="multiply"
          className="global"
          onClick={(e) => inputOperator(e.target.value)}
        />
      </div>
      <div className="fourth-row">
        <input
          type="button"
          name=""
          value="1"
          id="one"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="2"
          id="two"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="3"
          id="three"
          className="global"
          onClick={(e) => inputDigit(e.target.value)}
        />
        <input
          type="button"
          name=""
          value="-"
          id="subtract"
          className="global"
          onClick={(e) => inputOperator(e.target.value)}
        />
      </div>
      <div className="conflict">
        <div className="left">
          <input
            type="button"
            name=""
            value="0"
            id="zero"
            className=" big"
            onClick={(e) => inputDigit(e.target.value)}
          />
          <input
            type="button"
            name=""
            value="."
            id="decimal"
            className=" small"
            onClick={inputDecimal}
          />
          <input
            type="button"
            name=""
            value="AC"
            id="clear"
            className=" red small white-text top-margin"
            onClick={clearButton}
          />
          <input
            type="button"
            name=""
            value="="
            id="equals"
            className=" green white-text big top-margin"
            onClick={inputEquals}
          />
        </div>
        <div className="right">
          <input
            type="button"
            name=""
            value="+"
            id="add"
            className="global grey plus"
            onClick={(e) => inputOperator(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
