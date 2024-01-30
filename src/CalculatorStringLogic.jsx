import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import { evaluate } from "mathjs";

const CalculatorStringLogic = () => {
  const [display, setDisplay] = useState("");
  const [calcString, setCalcString] = useState("");
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isNegative, setIsNegative] = useState(false);
  const [calcArray, setCalcArray] = useState([]);
  const [postEquals, setPostEquals] = useState(false);

  useEffect(() => {
    console.log(calcString);
    /* console.log("isNegative is " + isNegative);
    console.log("displayIndex is " + displayIndex); */
    console.log("postEquals is " + postEquals);

    // console.log("displayIndex = " + displayIndex);
  });

  const inputDigit = (key) => {
    if (!postEquals) {
      if (!calcString && key === "0") {
        return;
      }
      if (
        calcString[calcString.length - 1] === "-" &&
        (calcString.length - 1 === 0 ||
          !calcString[calcString.length - 2].match(/\d/))
      ) {
        setCalcString(calcString + key);
        setIsNegative(true);
        setDisplay(calcString.slice(displayIndex) + key);
        return;
      }
      setCalcString(calcString + key);
      isNegative
        ? setDisplay(calcString.slice(displayIndex) + key)
        : setDisplay(calcString.slice(displayIndex) + key);
    } else {
      setPostEquals(false);
      if (!calcString && key === "0") {
        return;
      }
      setCalcString(key);
    }
  };

  const inputOperator = (key) => {
    if (!postEquals) {
      if (key === "-") {
        if (
          calcString[calcString.length - 2] === "-" &&
          calcString[calcString.length - 1] === "-"
        ) {
          return;
        } else {
          setCalcString(calcString + key);
          setDisplay("");
          setDisplayIndex(calcString.length);
          calcString[calcString.length - 1] === "-"
            ? setIsNegative(true)
            : setIsNegative(false);
        }
      } else {
        if (!calcString || calcString === "-") {
          return;
        }
        if (
          calcString[calcString.length - 1] === "-" ||
          calcString[calcString.length - 1] === "+" ||
          calcString[calcString.length - 1] === "X" ||
          calcString[calcString.length - 1] === "/"
        ) {
          if (
            calcString[calcString.length - 2] === "-" ||
            calcString[calcString.length - 2] === "+" ||
            calcString[calcString.length - 2] === "X" ||
            calcString[calcString.length - 2] === "/"
          ) {
            console.log("reached replacement operator");
            setCalcString(calcString.slice(0, -2) + key);
            setDisplay("");
            setDisplayIndex(calcString.length - 1);
            setIsNegative(false);
            return;
          }
          console.log("reached replacement operator");
          setCalcString(calcString.slice(0, -1) + key);
          setDisplay("");
          setDisplayIndex(calcString.length - 1);
          setIsNegative(false);
          return;
        }
        setCalcString(calcString + key);
        setCalcArray([...calcArray, calcString + key]);
        setDisplay("");
        setDisplayIndex(calcString.length + 1);
        setIsNegative(false);
      }
    } else {
      setPostEquals(false);
      if (key === "-") {
        if (
          calcString[calcString.length - 2] === "-" &&
          calcString[calcString.length - 1] === "-"
        ) {
          return;
        } else {
          setCalcString(calcString + key);
          setDisplay("");
          setDisplayIndex(calcString.length);
          calcString[calcString.length - 1] === "-"
            ? setIsNegative(true)
            : setIsNegative(false);
        }
      } else {
        if (!calcString || calcString === "-") {
          return;
        }
        if (
          calcString[calcString.length - 1] === "-" ||
          calcString[calcString.length - 1] === "+" ||
          calcString[calcString.length - 1] === "X" ||
          calcString[calcString.length - 1] === "/"
        ) {
          if (
            calcString[calcString.length - 2] === "-" ||
            calcString[calcString.length - 2] === "+" ||
            calcString[calcString.length - 2] === "X" ||
            calcString[calcString.length - 2] === "/"
          ) {
            console.log("reached replacement operator");
            setCalcString(calcString.slice(0, -2) + key);
            setDisplay("");
            setDisplayIndex(calcString.length - 1);
            setIsNegative(false);
            return;
          }
          console.log("reached replacement operator");
          setCalcString(calcString.slice(0, -1) + key);
          setDisplay("");
          setDisplayIndex(calcString.length - 1);
          setIsNegative(false);
          return;
        }
        setCalcString(calcString + key);
        setCalcArray([...calcArray, calcString + key]);
        setDisplay("");
        setDisplayIndex(calcString.length + 1);
        setIsNegative(false);
      }
    }
  };

  const inputDecimal = () => {
    if (display.slice(displayIndex).includes(".")) {
      return;
    }
    setCalcString(calcString + ".");
    isNegative
      ? setDisplay(calcString.slice(displayIndex - 1) + ".")
      : setDisplay(calcString.slice(displayIndex) + ".");
  };

  const inputEquals = () => {
    /* const splitter = {
      [Symbol.split](str) {
        console.log("reached");
        let count = 0;
        let pos = 0;
        const result = [];
        const operatorRegex = /(?![\d|.])/;
        while (pos < str.length && count < 99) {
          console.log("reached2");
          if (str[0] === "-") {
            const strPostNegative = str.slice(1);
            console.log(strPostNegative.search(operatorRegex));
            result.push(
              str.substring(pos, strPostNegative.search(operatorRegex) + 1)
            );
            pos = strPostNegative.search(operatorRegex) + 1;
            console.log(result);
          }
          count = count + 1;
        }
      },
    };
    const calcArray = calcString.split(splitter); */
    if (!calcString) {
      clearButton();
      return;
    }
    evaluate(calcString.replace("X", "*"));

    const result = evaluate(calcString.replace("X", "*"));
    console.log(`Result: ${result}`);
    setDisplayIndex(0);
    setDisplay(result.toString());
    setCalcString(result.toString());
    setPostEquals(true);
  };

  const clearButton = () => {
    setCalcArray([]);
    setDisplay("");
    setCalcString("");
    setDisplayIndex(0);
    setIsNegative(false);
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
};

export default CalculatorStringLogic;
