let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]');
let equalsButton = document.querySelector('[data-equals]');
let deleteButton = document.querySelector('[data-delete]');
let clearSumButton = document.querySelector('[data-all-clearSum]');
let firstNumber = document.querySelector('[data-previous-operand]');
let secondNumber = document.querySelector('[data-current-operand]');

class Calculator{
    constructor(){
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.clearSum();
    }

    clearSum(){
        this.number2 = "";
        this.number1 = "";
        this.operation = undefined;
    }

    delete(){
        this.number2 = this.number2.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.number2.includes('.')) return;
        this.number2 = this.number2.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.number2 === '') return;
        if(this.number1 !== ''){
            this.evaluateSum();
        }
        this.operation = operation;
        this.number1 = this.number2;
        this.number2 = '';
    }

    evaluateSum(){
        let sum;
        let prev = parseFloat(this.number1);
        let current = parseFloat(this.number2);
        if( isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                sum = prev + current;
                break;
            case '-':
                sum = prev - current;
                break;
            case '*':
                sum = prev * current;
                break;
            case '÷':
                sum = prev / current;
                break;
            default: return;
        }
        this.number2 = sum;
        this.operation = undefined;
        this.number1 = '';
    }

    getDisplayNumber(number){
        let stringNum = number.toString();
        let int = parseFloat(stringNum.split('.')[0]);
        let dec = stringNum.split('.')[1];
        let intDisplay;

        if (isNaN(int)) intDisplay = '';
        else intDisplay = int.toLocaleString('en', {maximumFractionDigits: 0});

        if (dec != null) return `${intDisplay}.${dec}`;
        else return intDisplay;
    }
    updateDisplay(){
        this.secondNumber.innerText = this.getDisplayNumber(this.number2);
        if(this.operation != null)
            this.firstNumber.innerText = `${this.getDisplayNumber(this.number1)} ${this.operation}`;
        else this.firstNumber.innerText = '';
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.evaluateSum();
    calculator.updateDisplay();
})

clearSumButton.addEventListener('click', () => {
    calculator.clearSum();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

let calculator = new Calculator();



