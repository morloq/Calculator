const calculator = {//to store values
    displayResult: '',
    displayValue: '0',
    firstOperand: ' ',
    waitForSecondOperand: false,//if true, the next number entered will constitute the second operand
    secondOperand: ' ',
    operator: null,
};
document.querySelector(".window-currentOperator").textContent = "0";//start out with 0

const keys = document.querySelector(".buttons").addEventListener("click", (event) =>{
    const { target } = event;
    //extract the target property of the click event
    /*-> what was clicked
    target variable is an object that represents the element clicked
    if not a button, ignor and go on
    otherwise, the type of button and the value pertaining to it
    is logged*/
    if(!target.matches("button")) {
        return;
    }
    if(target.classList.contains("operator")) {
        console.log(target.textContent);
        handleOperator(target.textContent);
        if(target.textContent != "=") {
            updateDisplay();
            console.log(calculator);
        }
        return;
    }

    if(target.classList.contains("decimal")) {
        setDigit(target.textContent);
        updateDisplay();
        return;
    }

    if(target.classList.contains("comma")) {
        console.log(target.textContent);
        inputDot(target.textContent);
        updateDisplay();
        return;
    }

    if(target.classList.contains("clear")) {
        console.log("clear");
        clear();
        return;
    }
});

function clear() {
    document.querySelector(".window-result").textContent="";
    calculator.displayValue = '0';
    calculator.firstOperand = '';
    calculator.secondOperand = '';
    calculator.waitForSecondOperand = false;
    calculator.operator = null;
    calculator.displayResult = '';
    document.querySelector(".window-currentOperator").textContent = calculator.displayValue;
}

//set current operation field text
function setDigit(digit) {
    const { displayValue, firstOperand, waitForSecondOperand } = calculator;
    console.log(calculator);
    if(waitForSecondOperand) {
        calculator.secondOperand += digit;
        calculator.displayValue += digit;
    }
    else{
        calculator.displayValue = displayValue === '0' ? digit : +displayValue + +digit;
        calculator.firstOperand = calculator.displayValue;
    }
    console.log(calculator);
}

function inputDot(dot) {
    console.log(typeof firstOperand);
    calculator.firstOperand = "" + calculator.firstOperand;
    if(!calculator.firstOperand.includes(dot)) {
        if(!isNaN(calculator.displayValue.charAt(calculator.displayValue.length-1))){
            calculator.displayValue += dot;
        }
    }
    if(calculator.waitForSecondOperand) {
        console.log(calculator.secondOperand);
        if(!calculator.secondOperand.includes(dot) && !isNaN(calculator.secondOperand) && calculator.secondOperand.length > 0) {
            calculator.secondOperand += dot;//works, but is not displayed
            calculator.displayValue = calculator.firstOperand + calculator.operator + calculator.secondOperand;
        }
    }
}

function handleOperator(Currentoperator) {
    const { firstOperand, operator, secondOperand, displayValue} = calculator;

    const inputValue = parseFloat(displayValue);
    calculator.firstOperand = parseFloat(inputValue);

    //if operators are entered consecutively, replace the old with 
    //the new -> no operator after an operator and no need to delete
    //entire input if typo occurs
    if(calculator.operator != null && calculator.waitForSecondOperand)
    {
        calculator.waitForSecondOperand = false;
        calculator.operator = Currentoperator;
    }

    if(Currentoperator != "=" && Currentoperator != "d") {
        calculator.displayValue += Currentoperator;
        calculator.operator = Currentoperator;
    }

    if(Currentoperator == "d" && !calculator.waitForSecondOperand && calculator.operator == null){
        //firstOperand reset:
        calculator.firstOperand = '';
        calculator.waitForSecondOperand = false;
        calculator.displayValue = calculator.firstOperand;
    }
    else{calculator.waitForSecondOperand = true;}
    /*if operator is clicked, firstOperand is
    converted to float (and rounded). 
    operator property is set to whatever operator was clicked
    waitingforsecondoperator is set to true as the first one has
    been finalized*/
    if(firstOperand == '' && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }
    else if(operator) {
        let result = operate(firstOperand, operator, secondOperand);
        console.log(result);
        calculator.displayResult = result;
        document.querySelector(".window-result").textContent = calculator.displayResult;
        calculator.displayValue = calculator.displayResult;
        calculator.firstOperand = calculator.displayResult;
        document.querySelector(".window-currentOperator").textContent = calculator.displayResult;

        calculator.operator = null;
        calculator.secondOperand = '';
        calculator.waitForSecondOperand = false;
    }
}

//takes opeator and two numbers and calls the corrolating function
function operate(num1, operator, num2) {

    let toBeDisplayed;
    if(operator == "%"){
        toBeDisplayed = parseFloat(modulo(num1, num2));
    }
    else if(operator == "÷") {
        toBeDisplayed = parseFloat(divide(num1, num2));
    }
    else if(operator == "x") {
        toBeDisplayed = parseFloat(multiply(num1, num2));
    }
    else if(operator == "-") {
        toBeDisplayed = parseFloat(subtract(num1, num2));
    }
    else if(operator == "+"){
        toBeDisplayed = parseFloat(add(num1, num2));
    }

    return toBeDisplayed;
}

//basic caluclator functions:
function add(num1, num2) {
    console.log(num1 + num2);
    return +num1 + +num2;//otherwise strings are concactenated!
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 != 0){
        return num1 / num2;
    }
    else if(num2 == 0){
        alert("Division by zero is not supported \n " +
        "calculator reset");
        clear();
        return 0;
    }
}

function modulo(num1, num2) {
    return num1 % num2;
}

function updateDisplay(){
    document.querySelector(".window-currentOperator").textContent = calculator.displayValue;
}