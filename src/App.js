import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  handleCalculate() {
    this.setState({
      input: String(eval(this.state.input)),
    });
  }

  handleClick(event) {
    let clickInput = event.target.innerText;
    let numberRegex = /\d/;
    let decimalRegex = /\./;
    let operatorRegex = /[+|\-|*|\/]/;
    let clearRegex = /clear/;
    let stateInput = this.state.input;
    let setInput = "";

    if (numberRegex.test(clickInput)) {
      if (/^0$/.test(stateInput)) {
        setInput = stateInput.replace(/^0$/, clickInput);
      } else if (/[+|\-|*|\/]\s0$/.test(stateInput)) {
        setInput = stateInput.replace(/0$/, clickInput);
      } else if (/[+|\-|*|\/]\s\-0$/.test(stateInput)) {
        setInput = stateInput.replace(/0$/, clickInput);
      } else {
        setInput = stateInput + clickInput;
      }
    } else if (operatorRegex.test(clickInput)) {
      if (/[+|\-|*|\/]\s$/.test(stateInput) && /[+|*|\/]/.test(clickInput)) {
        setInput = stateInput.replace(/[+|\-|*|\/]\s$/, clickInput + " ");
      } else if (/[+|\-|*|\/]\s$/.test(stateInput) && /\-/.test(clickInput)) {
        setInput = stateInput + clickInput;
      } else if (/[+|\-|*|\/]\s\-$/.test(stateInput)) {
        setInput = stateInput.replace(/[+|\-|*|\/]\s\-$/, clickInput + " ");
      } else if (/[+|\-|*|\/]\s\-$/.test(stateInput)) {
        setInput = stateInput;
      } else {
        setInput = stateInput + " " + clickInput + " ";
      }
    } else if (clearRegex.test(clickInput)) {
      setInput = "0";
    } else if (decimalRegex.test(clickInput)) {
      if (/[0-9]*\.[0-9]*$/.test(stateInput)) {
        setInput = stateInput;
      } else {
        setInput = stateInput + clickInput;
      }
    }
    this.setState({
      input: setInput,
    });
  }

  render() {
    return (
      <div id="container">
        <Display displayInput={this.state.input} />
        <KeyPad
          handleClick={this.handleClick}
          handleCalculate={this.handleCalculate}
        />
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div id="display">
      <p>{props.displayInput}</p>
    </div>
  );
};

const KeyPad = (props) => {
  return (
    <div id="pad">
      <div id="row-1">
        <button id="zero" onClick={props.handleClick}>
          {" "}
          0{" "}
        </button>
        <button id="one" onClick={props.handleClick}>
          {" "}
          1{" "}
        </button>
        <button id="two" onClick={props.handleClick}>
          {" "}
          2{" "}
        </button>
        <button id="three" onClick={props.handleClick}>
          {" "}
          3{" "}
        </button>
      </div>
      <div id="row-2">
        <button id="four" onClick={props.handleClick}>
          {" "}
          4{" "}
        </button>
        <button id="five" onClick={props.handleClick}>
          {" "}
          5{" "}
        </button>
        <button id="six" onClick={props.handleClick}>
          {" "}
          6{" "}
        </button>
        <button id="seven" onClick={props.handleClick}>
          {" "}
          7{" "}
        </button>
      </div>
      <div id="row-3">
        <button id="eight" onClick={props.handleClick}>
          {" "}
          8{" "}
        </button>
        <button id="nine" onClick={props.handleClick}>
          {" "}
          9{" "}
        </button>
        <button id="decimal" onClick={props.handleClick}>
          {" "}
          .{" "}
        </button>
        <button id="clear" onClick={props.handleClick}>
          {" "}
          clear{" "}
        </button>
      </div>
      <div id="row-4">
        <button id="add" onClick={props.handleClick}>
          {" "}
          +{" "}
        </button>
        <button id="subtract" onClick={props.handleClick}>
          {" "}
          -{" "}
        </button>
        <button id="multiply" onClick={props.handleClick}>
          {" "}
          *{" "}
        </button>
        <button id="divide" onClick={props.handleClick}>
          {" "}
          /{" "}
        </button>
      </div>
      <div id="row-5">
        <button id="equals" onClick={props.handleCalculate}>
          {" "}
          ={" "}
        </button>
      </div>
    </div>
  );
};

export default App;
