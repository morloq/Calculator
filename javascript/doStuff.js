//get all buttons:
let reset = document.getElementById("#AC");
let plusMinus = document.getElementById("#plusMinus");
let modulo = document.getElementById("#modulo");
let div = document.getElementById("#divide");

let seven = document.getElementById("#seven");
let eight = document.getElementById("#eight");
let nine = document.getElementById("#nine");
let mult = document.getElementById("#multiply");

let four = document.getElementById("#four");
let five = document.getElementById("#five");
let six = document.getElementById("#six");
let minus = document.getElementById("#minus"); 

let one = document.getElementById("#one");
let two = document.getElementById("#two");
let three = document.getElementById("#three");
let plus = document.getElementById("#plus");

let zero = document.getElementById("#zero");
let comma = document.getElementById("#comma");
let equal = document.getElementById("#equals");

//save
let numbersClicked = [];
let operatorClicked;
//set event listeners

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
        return Maht.round(num1 / num2);
    }
    else{
        alert("Division by zero is not supported");
    }
}

function modulo(num1, num2) {
    return num1 % num2;
}

//takes opeator and two numbers and calls one of the above functions
//depending on the operator received as parameter
function operate(num1, operator, num2) {
    if(operator == "%"){
        modulo(num1, num2);
    }
    else if(operator == "/") {
        divide(num1, num2);
    }
    else if(operator == "*") {
        multiply(num1, num2);
    }
    else if(operator == "-") {
        subtract(num1, num2);
    }
    else if(operator == "+"){
        add(num1, num2);
    }
}

//clear function
//should wipe everything, all obj or data structures used to store
//data, all fields etc.
function clear() {
    document.querySelector(".window-result").textContent="";
    document.querySelector(".window-currentOperator").textContent="0";
}

//set current operation field text
function setCurrentOperation() {

}

//set output field
function setResult() {

}

//ensure that after an operator has been pressed, another cannot
//be pressed after it without a number between them

//give out result to output field if "=" is pressed

//store operator used, and number before and after
//store number as soon as one of the operators is pressed
//store second number the same way but maybe in different obj?

//if no number has been pressed or just an operator, ensure clicking
//"=" does not do anything

//error message if user tries to divide by 0 -> done
//don't let a division by 0 execute in any way -> done

//round answers to two decimals, or maybe one

clear();