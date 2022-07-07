const calc_display = document.querySelector(".calc"); 
const result_display = document.querySelector(".result"); 
const buttons = document.querySelectorAll(".btn");
const clear_btn = document.querySelector("#btn-clear");
const delete_btn = document.querySelector("#btn-delete");
const equals_btn = document.querySelector("#btn-equals");
const number_buttons = document.querySelectorAll(".number");
const operator_buttons = document.querySelectorAll(".operator");

function evaluate(operator, num1, num2){
    let result;
    switch(operator) {
        case "+":
            result = add(num1,num2); 
            break;
        case "-": 
            result = sub(num1, num2); 
            break;
        case "x": 
            result = multiply(num1, num2); 
            break;    
        case "÷": 
            result = divide(num1, num2); 
            break;
    }
    console.log(result); 
    return result; 
}
function add(num1,num2){
    console.log(`adding ${num1} and ${num2}`); 
    return num1 + num2; 
}
function sub(num1,num2){
    console.log(`sub ${num1} and ${num2}`); 
    return num1 - num2; 
}
function multiply(num1,num2){
    console.log(`multiplying ${num1} and ${num2}`); 
    return num1 * num2; 
}
function divide(num1,num2){
    console.log(`dividing ${num1} and ${num2}`); 
    return num1/num2; 
}

function populate(event){
    let text = event.target.textContent;
    console.log(text); 
    calc_display.textContent += text;
}

function displayResult(text){
    if(isNaN(text)){
        result_display.textContent = "INVALID INPUT!"; 
    }
    else{
        if(text.toString().length > 10){
            text = text.toString().slice(0,10);
        }
        result_display.textContent =text; 
    }
}
function clear(){
    calc_display.textContent = "";
    result_display.textContent = "";
}
function del(){
    let displayText = calc_display.textContent;
    calc_display.textContent = displayText.slice(0,-1);
}
function precedence(op){
    // If the top of the operators stack has a greater presendence than the current operator, return TRUE
    if ( op == '*' || op == '/' )
        return 2;
    else 
        return 1;
}
function hasPrecedence(op1, op2)
    {
        if ((op1 == 'x' || op1 == '÷') &&
               (op2 == '+' || op2 == '-'))
        {
            console.log(`current ${op1} doesn't has precedence over ${op2}`)
            return false;
        }
        else
        {
            console.log(`current ${op1} has precedence over ${op2}`)
            return true;
        }
    }
function calculate(){ 
    let text = calc_display.textContent;
    console.log("this is the text " + text);
    let tokens = text.split(''); 
    let operands = []; 
    let ops = []; 
    for(let i = 0; i < tokens.length; i++){
        if(!isNaN(tokens[i])){
            let num = ''; 
            while( !isNaN(tokens[i]) && i < tokens.length){
                num += tokens[i]; 
                i++; 
            }
            operands.push(parseInt(num,10));
            i--;
        }
        else if(tokens[i] == '+' || tokens[i] == '-' || tokens[i] == 'x' || tokens[i] == '÷'){
            
            while ( ops.length > 0 && hasPrecedence(tokens[i], ops[ops.length - 1])){
                let operator = ops.pop();
                let num2 = operands.pop();
                let num1 = operands.pop();
                let result = evaluate(operator, num1, num2);
                operands.push(result); 
                console.log("pushing the result of "+ operator +" that equals = "+ result );
            }
            ops.push(tokens[i]);
        }
    }
    while(ops.length > 0){
        
        let operator = ops.pop();
        let num2 = operands.pop();
        let num1 = operands.pop();
        let result = evaluate(operator, num1, num2);
        operands.push(result);
    }
    
    displayResult(operands.pop()); 
}

function startCalculator(){
    buttons.forEach(btn => btn.addEventListener('click', populate));
    clear_btn.addEventListener("click", clear);
    delete_btn.addEventListener("click", del);
    equals_btn.addEventListener('click', calculate)
}



startCalculator();