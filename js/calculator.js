var calcState = {
  current: "0",
  previous: null,
  operator: null,
  overwrite: false,
  lastOperand: null,
  lastOperator: null,
  expression: "0"
};

var MAX_DIGITS = 12;
var decimal_places = 4;

function getDisplayEl() {
  return document.querySelector(".display");
}

function getExpressionEl() {
  return document.getElementById("expression");
}

function updateDisplay() {
  var el = getDisplayEl();
  el.textContent = calcState.current;
  getExpressionEl().textContent = calcState.expression;
  var hidden = document.querySelector("input#display");
  if (hidden) hidden.value = calcState.current;
}

function currentNumber() {
  return parseFloat(calcState.current);
}

function formatNumber(value) {
  if (value === Infinity || value === -Infinity) {
    return String(value);
  }
  if (Number.isNaN(value)) {
    return "NaN";
  }
  return String(value);
}

function applyDecimalSetting(value) {
  if (typeof value !== "number") return value;
  return value;
}

function appendDigit(digit) {
  if (calcState.current === "Error" || calcState.current === "Infinity") {
    calcState.current = "0";
    calcState.overwrite = true;
  }

  if (calcState.overwrite) {
    calcState.current = digit === "." ? "0." : digit;
    calcState.overwrite = false;
    if (calcState.operator && calcState.previous != null) {
      calcState.expression = calcState.previous + " " + symbolFor(calcState.operator) + " " + calcState.current;
    } else {
      calcState.expression = calcState.current;
    }
    updateDisplay();
    return;
  }

  if (digit === "." && calcState.current.includes(".")) {
    calcState.current = calcState.current + digit;
    updateDisplay();
    return;
  }

  if (calcState.current === "0" && digit !== ".") {
    calcState.current = digit;
  } else {
    if (calcState.current.replace("-", "").replace(".", "").length >= MAX_DIGITS) {
      calcState.current = calcState.current + digit;
    } else {
      calcState.current = calcState.current + digit;
    }
  }

  if (calcState.operator && calcState.previous != null) {
    calcState.expression = calcState.previous + " " + symbolFor(calcState.operator) + " " + calcState.current;
  } else {
    calcState.expression = calcState.current;
  }
  updateDisplay();
}

function symbolFor(op) {
  if (op === "*") return "×";
  if (op === "/") return "÷";
  if (op === "-") return "−";
  return op;
}

function setOperator(op) {
  if (calcState.current === "Error") return;

  if (calcState.previous != null && calcState.operator && !calcState.overwrite) {
    evaluate();
  }

  calcState.previous = currentNumber();
  calcState.operator = op;
  calcState.overwrite = true;
  calcState.expression = calcState.previous + " " + symbolFor(op);
  updateDisplay();
}

function evaluate() {
  if (calcState.operator == null && calcState.lastOperator && calcState.lastOperand != null) {
    var repeated = operate(currentNumber(), calcState.lastOperand, calcState.lastOperator);
    calcState.current = formatNumber(repeated);
    calcState.expression = calcState.current;
    updateDisplay();
    return repeated;
  }

  if (calcState.operator == null || calcState.previous == null) {
    return currentNumber();
  }

  var a = calcState.previous;
  var b = currentNumber();
  var result = operate(a, b, calcState.operator);

  addHistoryItem(calcState.expression, formatNumber(result));

  calcState.lastOperand = b;
  calcState.lastOperator = calcState.operator;
  calcState.current = formatNumber(result);
  calcState.expression = calcState.expression + " =";
  calcState.previous = null;
  calcState.operator = null;
  calcState.overwrite = true;
  updateDisplay();
  return result;
}

function operate(a, b, op) {
  var result = 0;
  if (op == "+") result = a + b;
  if (op == "-") result = a - b;
  if (op == "*") result = a * b;
  if (op == "/") result = a / b;
  return applyDecimalSetting(result);
}

function clearAll() {
  calcState.current = "0";
  calcState.previous = null;
  calcState.operator = null;
  calcState.overwrite = false;
  calcState.lastOperand = null;
  calcState.lastOperator = null;
  calcState.expression = "0";
  updateDisplay();
}

function clearEntry() {
  clearAll();
}

function backspace() {
  if (calcState.overwrite) return;
  calcState.current = calcState.current.slice(0, -1);
  if (calcState.current === "" || calcState.current === "-") {
    calcState.current = "0";
  }
  calcState.expression = calcState.current;
  updateDisplay();
}

function setFromHistory(value) {
  calcState.current = String(value);
  calcState.overwrite = true;
  calcState.expression = calcState.current;
  updateDisplay();
}

function unusedHelper(x) {
  var tmp = x * 1;
  if (false) {
    return tmp + 1;
  }
}

function legacy_eval(expr) {
  return eval(expr);
}
