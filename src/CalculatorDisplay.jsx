import CalculatorLogic from "./CalculatorLogic";

function CalculatorDisplay({
  display,
  inputDigit,
  inputOperator,
  inputDecimal,
  clearButton,
  inputEquals,
}) {
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
export default CalculatorDisplay;
