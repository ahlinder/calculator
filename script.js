let num1 = 0;
let num2 = 0; 
let operator = '';

function add(a, b){
    return round(a + b);
}

function sub(a, b){
    return round(a - b);
}

function mul(a, b){
    return round(a * b);
}

function divide(a, b){
    return round(a / b);
}

function round(term){
    return Math.round(100*term)/100;
}

function operate(operator, a , b){
    if(operator === '+'){
        return add(a,b);
    }
    else if(operator === '-'){
        return sub(a,b);
    }
    else if(operator === '*'){
        return mul(a,b);
    }
    else if(operator === '÷'){
        return divide(a,b);
    }
}

let currentInput = '';
let memory = '';
let display = document.querySelector('.output');
let memoryDisplay = document.querySelector('.memory');

function updateDisplay(newInput){
    display.textContent = newInput;
}

function updateMemoryDisplay(input){
    memoryDisplay.textContent = input;
}

function clearSettings(){
    num1 = 0;
    num2 = 0;
    operator = '';
    currentInput = '';
    memory = '';
}

function checkOperator(string){ //check if last button was an operator
    return string[string.length-2] === '+' || string[string.length-2] === '÷' || string[string.length-2] === '*' || string[string.length-2] === '-';
}

const inputButtons = document.querySelectorAll('.inputButton');
inputButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.textContent === '='){ //if equals, call operate method
            if(num1 === 0 && currentInput === ''){   //if equals is pressed with no other input
                updateDisplay("select numbers");
                return;
            }
            num2 = parseFloat(currentInput);
            const res = operate(operator, num1, num2);
            updateDisplay(res.toString().toLowerCase());
            clearSettings();
            updateMemoryDisplay(memory);
        }
        else if(!isNaN(button.textContent)){    //if number, update current string
            currentInput = currentInput + button.textContent;
            memory = memory + button.textContent;
            updateMemoryDisplay(memory);
            updateDisplay(currentInput);    
        }
        else{   //if operator, save string
            if(operator != ''){
                if(currentInput != ''){
                    num2 = parseFloat(currentInput);
                    const res = operate(operator, num1, num2);
                    updateDisplay(res.toString().toLowerCase());
                    clearSettings();
                    num1 = res;
                    memory = res + ' ' + button.textContent + ' ';
                    updateMemoryDisplay(memory);
                }
            }
            else if(num1 === 0){    //num1 is finished once the first operator is selected
                num1 = parseFloat(currentInput);
                updateDisplay(currentInput);
                currentInput = '';
            }
            if(checkOperator(memory)){  //checks if operator should be added or changed
                memory[memory.length-2] = button.textContent;
                updateMemoryDisplay(memory);
            }
            else{
                memory = memory + ' ' + button.textContent + ' ';
                updateMemoryDisplay(memory);
            }
            operator = button.textContent;
        }
    });
});

const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', () => {
    clearSettings();
    updateDisplay(currentInput);
})