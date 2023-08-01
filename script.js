let num1 = 0;
let num2 = 0; 
let operator = '';

function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mul(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
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
    else if(operator === '/'){
        return divide(a,b);
    }
}

let currentInput = '';
let display = document.querySelector('.output');

function updateDisplay(newInput){
    display.textContent = newInput;
}

function clearSettings(){
    num1 = 0;
    num2 = 0;
    operator = '';
    currentInput = '';
}

const inputButtons = document.querySelectorAll('.inputButton');
inputButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.textContent === '='){ //if equals, call operate method
            if(num1 === 0){
                return;
            }
            num2 = parseInt(currentInput);
            const res = operate(operator, num1, num2);
            updateDisplay(res.toString().toLowerCase());
            clearSettings();
        }
        else if(!isNaN(button.textContent)){    //if number, update current string
            currentInput = currentInput + button.textContent;
            updateDisplay(currentInput);    
        }
        else{   //if operator, save string
            if(operator != ''){
                num2 = parseInt(currentInput);
                const res = operate(operator, num1, num2);
                updateDisplay(res.toString().toLowerCase());
                clearSettings();
                num1 = res;
            }
            else if(num1 === 0){    //
                num1 = parseInt(currentInput);
                currentInput = '';
                updateDisplay(currentInput);
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