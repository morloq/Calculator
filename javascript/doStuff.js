const calculator = {//to store values
    displayResult: '',
    displayValue: '0',
    firstOperand: '',
    waitForSecondOperand: false,//if true, the next number entered will constitute the second operand
    secondOperand: '',
    operator: null,
};

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

function modulo(num1, num2) {
    return num1 % num2;
}

//clear function
//should wipe everything, all obj or data structures used to store
//data, all fields etc.
function clear() {
    document.querySelector(".window-result").textContent="";
    calculator.displayValue = '0';
    calculator.firstOperand = '';
    calculator.secondOperand = '';
    calculator.waitForSecondOperand = false;
    calculator.operator = null;
    document.querySelector(".window-currentOperator").textContent = calculator.displayValue;
}

//set current operation field text
function setDigit(digit) {
    const { displayValue, firstOperand, waitForSecondOperand } = calculator;
    console.log(calculator.waitForSecondOperand);
    if(waitForSecondOperand) {
        calculator.secondOperand += digit;
        calculator.displayValue += digit;
    }
    else {
        calculator.displayValue = displayValue == "0" ? digit : displayValue + digit;
        //calculator.firstOperand += digit;
    }
    console.log(calculator);
}

function inputDot(dot) {

    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(Currentoperator) {
    const { firstOperand, operator, secondOperand, displayValue} = calculator;

    const inputValue = parseFloat(displayValue);
    calculator.firstOperand = parseFloat(inputValue);
    
    if(firstOperand == '' && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }
    else if(operator) {
        const result = operate(firstOperand, operator, secondOperand);
        calculator.displayResult = String(result);
        document.querySelector(".window-result").textContent = calculator.displayResult;
        calculator.displayValue = calculator.displayResult;
        calculator.firstOperand = calculator.displayResult;
        document.querySelector(".window-currentOperator").textContent = calculator.displayResult;

        calculator.operator = null;
        calculator.secondOperand = '';
        calculator.waitForSecondOperand = false;
    }
    console.log(calculator);

    if(Currentoperator != "=") {
        calculator.displayValue += Currentoperator;
        calculator.operator = Currentoperator;
    }
    calculator.waitForSecondOperand = true;
    /*if operator is clicked, firstOperand is
    converted to float (and rounded). 
    operator property is set to whatever operator was clicked
    waitingforsecondoperator is set to true as the first one has
    been finalized*/

}


//takes opeator and two numbers and calls one of the above functions
//depending on the operator received as parameter
function operate(num1, operator, num2) {
    let toBeDisplayed;
    if(operator == "%"){
        toBeDisplayed = modulo(num1, num2);
    }
    else if(operator == "÷") {
        toBeDisplayed = divide(num1, num2);
    }
    else if(operator == "x") {
        toBeDisplayed = multiply(num1, num2);
    }
    else if(operator == "-") {
        toBeDisplayed = subtract(num1, num2);
    }
    else if(operator == "+"){
        toBeDisplayed = add(num1, num2);
    }

    return toBeDisplayed;
}

//basic caluclator functions version one:
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 != 0){
        return Math.round(num1 / num2);
    }
    else{
        alert("Division by zero is not supported");
    }
}


function updateDisplay(){
    document.querySelector(".window-currentOperator").textContent = calculator.displayValue;
}

//ensure that after an operator has been pressed, another cannot
//be pressed after it without a number between them

//give out result to output field if "=" is pressed

//store number as soon as one of the operators is pressed
//store second number the same way but maybe in different obj?

//if no number has been pressed or just an operator, ensure clicking
//"=" does not do anything

//error message if user tries to divide by 0 -> done
//don't let a division by 0 execute in any way -> done

//round answers to two decimals, or maybe one

function ACSymbol() {
    if(calculator.displayValue != 0) {
        document.querySelector("#AC").textContent ="C";
    }
}
ACSymbol();
clear();