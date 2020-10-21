let operand = [];
let operator = [];
let justEqual = false;
let activeOperation = false;

let currentOperation;

function operate () {

    let numOperand = +operand.join('');
    let numOperator = +operator.join('');

    let result;

    switch(currentOperation) {
        case 1:
            result = numOperand+numOperator;
            break;
        case 2:
            result = numOperand-numOperator;
            break;
        case 3:
            result = numOperand*numOperator;
            break;
        case 4:
            result = numOperand/numOperator;
    };
    
    checkResult(result);
    justEqual=true;
    activeOperation = false;
};

function checkResult (result) {
    let array = result.toString().split('');
    console.log(result)
    if (array.length<20) {
        operand = array;
        updateDisplay(operand);
    } else {
        clearClick();
        updateDisplay('Error');
    }
}

function numberClick (e) {
    if (justEqual) {
        clearClick();
    };

    if (operator.length<=12){
        operator.push(+e.srcElement.textContent);
        updateDisplay(operator);
        activeOperation = false;
    };
};

function operationClick (e) {
    if (!activeOperation) {
        if (!justEqual){
            if (operand.length!=0 && operator.length!=0) {
                operate();
            } else {
                operand = operator;
            };
        };

        operator = [];
        switch (e.srcElement.textContent) {
            case '+':
                currentOperation = 1;
                break;
            case '-':
                currentOperation = 2;
                break;
            case 'x':
                currentOperation = 3;
                break;
            case '÷':
                currentOperation = 4;
        };
    } else {
        switch (e.srcElement.textContent) {
            case '+':
                currentOperation = 1;
                break;
            case '-':
                currentOperation = 2;
                break;
            case 'x':
                currentOperation = 3;
                break;
            case '÷':
                currentOperation = 4;
        };
    }; 
    justEqual = false;
    activeOperation = true;
};

function clearClick () {
    operator = [];
    operand = [];
    justEqual = false;
    activeOperation = false;
    currentOperation = null;
    let readOut = document.getElementById('read-out');
    readOut.textContent = '';
};

function decimalClick () {
    if (operator.indexOf('.')===-1) {
        operator.push('.');
        updateDisplay(operator);
    };
};

function updateDisplay(readOut) {

    if(typeof(readOut)==='object'){
        
    }
    let finalValue = [];
    let decimalPlace = readOut.findIndex((char) => char=='.');

    standardReadout()

    function standardReadout() {
        if (readOut === 'Error') {
            finalValue = ['r','o','r','r','E',];
        } else if (decimalPlace==-1) {
            for (i=readOut.length-1;i>=0;i--) {
                finalValue.push(readOut[i])
                if ((readOut.length-i)%3===0 && (i)!=0){
                    finalValue.push(',');
                };
            };
        } else {
            let decimals = readOut.slice(decimalPlace,readOut.length);
            for (i=decimals.length-1;i>=0;i--) {
                finalValue.push(decimals[i]);
            };

            for (i=decimalPlace-1;i>=0;i--) {
                finalValue.push(readOut[i])
                if ((decimalPlace-i)!=0 && (i!=0) && (decimalPlace-i)%3===0){
                    finalValue.push(',');
                };
            };
        };
    };

    function expandedReadout() {
        if (decimalPlace!=-1 && decimalPlace<12) {
            let lastZero = readOut.reverse().findIndex((value) => value!=0);
            if (readOut.length-lastZero<12) {
                finalValue = readOut.slice(0,(readOut.length-2-lastZero));
            } else {
                finalValue = readOut.slice(0,12);
            };
        } else {
            let reduce = +readOut.join('')/Math.pow(10,(readOut.length-1));
            console.log(reduce)
            let lastZero = readOut.reverse().findIndex((value) => value!=0);
            if(readOut.length-lastZero<9) {
                finalValue = reduce.split('').slice(0,(readOut.length-2-lastZero));
            } else {
                finalValue = reduce.split('').slice(0,12);
            };
        };
    };

    const display = document.getElementById('read-out');
    display.textContent = finalValue.reverse().join('')
};

// LISTENERS

const numButtons = document.querySelectorAll('.num-buttons');

for (i=0;i<numButtons.length;i++) {
    numButtons[i].addEventListener('click',numberClick);
};

const operateButtons = document.querySelectorAll('.operators');

for (i=0;i<operateButtons.length;i++) {
    operateButtons[i].addEventListener('click',operationClick);
};

const equalButton = document.getElementById('equals');
equalButton.addEventListener('click', operate);

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearClick);

const decimalButton = document.getElementById('point');
decimalButton.addEventListener('click', decimalClick);

// Key Press
window.addEventListener('keydown',keyPress);

function keyPress(e) {
    let key = e.key;

    if (key=='Enter'){
        operate();
    } else if (key=='c') {
        clearClick();
    } else if (key=='/') {
        operationPress(key);
    } else if (key=='.') {
        decimalClick();
    };

    for (i=0;i<operateButtons.length;i++) {
        if (operateButtons[i].textContent==key){
            operationPress(key);
            break;
        };
    };

    for (i=0;i<numButtons.length;i++) {
        if (numButtons[i].textContent==key) {
            numberPress(key);
            break;
        };
    };
};

function numberPress(num) {
    if (justEqual) {
        clearClick();
    };

    if (operator.length<=12) {
        operator.push(+num);
        updateDisplay(operator);
    };
};

function operationPress(key) {
    if (!activeOperation) {
        if (!justEqual){
            if (operand.length!=0 && operator.length!=0) {
                operate();
            } else {
                operand = operator;
            };
        };
        
        operator = [];
        switch (key) {
            case '+':
                currentOperation = 1;
                break;
            case '-':
                currentOperation = 2;
                break;
            case 'x':
                currentOperation = 3;
                break;
            case '/':
                currentOperation = 4;
        };
    } else {
        switch (key) {
            case '+':
                currentOperation = 1;
                break;
            case '-':
                currentOperation = 2;
                break;
            case 'x':
                currentOperation = 3;
                break;
            case '/':
                currentOperation = 4;
        };
    }; 
    justEqual = false;
    activeOperation = true;
};

