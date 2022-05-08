const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equlas]');
const current = document.getElementById('current');
const total = document.getElementById('total');

class Calculator{
    constructor(total, current){
        this.current = current;
        this.total = total;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.totalOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slcie(0, -1);
    }


    appendNumber(number){
        if(number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.totalOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.totalOperand = this.currentOperand;
        this.currentOperand = "";
    }
    
    compute(){
        let computation;
        const prev = parseFloat(this.currentOperand);
        const cur = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(cur)) return
        switch(this.operation){
            case '+':
                computation = prev + cur;
                break
            case '-':
                computation = prev - cur;
                break
            case 'x':
                computation = prev * cur;
                break
            case '÷':
                computation = prev / cur;
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.totalOperand = '';
    }

    updateDisplay(){
        this.current.innerText = this.currentOperand;
        this.total.innerText = this.totalOperand;
    }
};


const calculator = new Calculator(total, current);

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

equalsButton.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})