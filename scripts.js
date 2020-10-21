let operand = [];
let operator = [];
let justEqual = false;
let activeOperation = false;

let currentOperation;

function operate () {
    keyToggle('Enter','on')
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

    if (result===Infinity){
        clearClick();
        updateDisplay('Infinity');
    } else if (array.length<25) {
        operand = array;
        updateDisplay(operand);
    } else {
        clearClick();
        updateDisplay('Error');
    };
};

function numberClick (e) {
    if (justEqual) {
        clearClick();
    };

    if (operator.length<=17){
        keyToggle(e.srcElement.textContent,'on')
        operator.push(+e.srcElement.textContent);
        updateDisplay(operator);
        activeOperation = false;
    };
};

function operationClick (e) {
    if (!activeOperation) {
        if (!justEqual){
            if (operand.length!=0 && operator.length!=0) {
                console.log('click')
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
    keyToggle(e.srcElement.textContent,'on')
};

function clearClick () {
    operator = [];
    operand = [];
    justEqual = false;
    activeOperation = false;
    currentOperation = null;
    let readOut = document.getElementById('read-out');
    readOut.textContent = '';
    keyToggle('c','on')
};

function decimalClick () {
    if (operator.indexOf('.')===-1) {
        operator.push('.');
        updateDisplay(operator);
        keyToggle('.','on')
    };
};

function updateDisplay(readOut) {
    let finalValue = [];

    if(typeof(readOut)==='object'){
        let decimalPlace = readOut.findIndex((char) => char=='.');

        standardReadout()

        function standardReadout() {

            if (decimalPlace==-1) {
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
    } else if (typeof(readOut)==='string'){
        if (readOut === 'Error') {
            finalValue = readOut.split('').reverse();
        } else if (readOut === 'Infinity') {
            finalValue = readOut.split('').reverse();
        };
    } else {
        console.log('test');
        finalValue = readOut.toString().split('').reverse();
    };

    const display = document.getElementById('read-out');
    display.textContent = finalValue.reverse().join('')
};

// LISTENERS

const numButtons = document.querySelectorAll('.num-buttons');

for (i=0;i<numButtons.length;i++) {
    numButtons[i].addEventListener('mousedown',numberClick);
};

const operateButtons = document.querySelectorAll('.operators');

for (i=0;i<operateButtons.length;i++) {
    operateButtons[i].addEventListener('mousedown',operationClick);
};

const equalButton = document.getElementById('equals');
equalButton.addEventListener('mousedown', operate);

const clearButton = document.getElementById('clear');
clearButton.addEventListener('mousedown', clearClick);

const decimalButton = document.getElementById('point');
decimalButton.addEventListener('mousedown', decimalClick);

window.addEventListener('mouseup',mouseUp);

function mouseUp() {
    let allButtons = document.querySelectorAll('.button');
    for (i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove('active');
    };
};

// Key Press
window.addEventListener('keydown',keyPress);
window.addEventListener('keyup',keyUp);

function keyPress(e) {
    let key = e.key;

    if (key=='Enter'){
        operate();
        keyToggle(key, 'on');
    } else if (key=='c') {
        clearClick();
        keyToggle(key, 'on');
    } else if (key=='/') {
        operationPress(key);
        keyToggle(key, 'on');
    } else if (key=='.') {
        decimalClick();
        keyToggle(key, 'on');
    };

    for (i=0;i<operateButtons.length;i++) {
        if (operateButtons[i].textContent==key){
            operationPress(key);
            keyToggle(key, 'on')
            break;
        };
    };

    for (i=0;i<numButtons.length;i++) {
        if (numButtons[i].textContent==key) {
            numberPress(key);
            keyToggle(key, 'on');
            break;
        };
    };
};

function keyUp (e) {
    let key = e.key;
    keyToggle(key, 'off');
};

function numberPress(num) {
    if (justEqual) {
        clearClick();
    };

    if (operator.length<=17) {
        operator.push(+num);
        updateDisplay(operator);
        activeOperation = false;
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

function keyToggle(key,toggle) {
    if (toggle === 'on') {
        if (key=='Enter'){
            let enter = document.getElementById('equals');
            enter.classList.add('active');
        } else if (key=='c') {
            let button = document.getElementById('clear');
            button.classList.add('active');
        } else if (key=='/') {
            let button = document.getElementById('divide');
            button.classList.add('active');
        } else if (key=='.') {
            let button = document.getElementById('point');
            button.classList.add('active');
        } else {
            for (i=0;i<numButtons.length;i++) {
                if (numButtons[i].textContent==key) {
                    numButtons[i].classList.add('active');
                    break;
                };
            };

            for (i=0;i<operateButtons.length;i++) {
                if (operateButtons[i].textContent==key){
                    operateButtons[i].classList.add('active');
                    break;
                };
            };
        };
    } else {
        if (key=='Enter'){
            let button = document.getElementById('equals');
            button.classList.remove('active')
        } else if (key=='c') {
            let button = document.getElementById('clear');
            button.classList.remove('active')
        } else if (key=='/') {
            let button = document.getElementById('divide');
            button.classList.remove('active')
        } else if (key=='.') {
            let button = document.getElementById('point');
            button.classList.remove('active')
        } else {
            for (i=0;i<numButtons.length;i++) {
                if (numButtons[i].textContent==key) {
                    numButtons[i].classList.remove('active');
                    break;
                };
            };

            for (i=0;i<operateButtons.length;i++) {
                if (operateButtons[i].textContent==key){
                    operateButtons[i].classList.remove('active');
                    break;
                };
            };
        };
    };
};

