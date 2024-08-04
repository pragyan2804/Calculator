let num1 = "";
let num2 = "";
let op = "";
let isNegative = false;

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const opButtons = document.querySelectorAll('.operands');
    const periodButton = document.querySelectorAll('.period');
    const ACbutton = document.querySelectorAll('.AC');
    const eqButton = document.querySelectorAll('.equals');
    const numButtons = document.querySelectorAll('.nums');
    const inputBox = document.getElementById('myInput');
    const minButton = document.querySelectorAll('#opermin');

    // Enable dragging on all buttons except AC & equals buttons
    [...opButtons, ...periodButton, ...numButtons].forEach(button => {
        button.draggable = true;
    });

    // DRAG AND DROP FUNCTIONALITY
    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.getAttribute('data-text'));
    }

    //DROP TARGET
    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const droppedData = event.dataTransfer.getData('text');
    
        // Check if the dropped data is an operator
        if (['+', '-', 'x', '/'].includes(droppedData)) {
            eqButtonOFF();
            opButtonsOFF();    
            periodButtonON();
            minButtonON();
            if (op !== "" && isNegative) {
                operation();
                inputBox.value = num1 + " " + op + " " + num2;
            }
            if (op === "" && droppedData==="-" && num1===""){
                isNegative=true;
                inputBox.value = num1 + " " + "-" + " ";
                minButtonOFF();
            }
            else if (op !== "" && droppedData==="-" && num2===""){
                isNegative=true;
                inputBox.value = num1 + " " + op + " " + "-";
                minButtonOFF();
            }
            else{
                operation();
                op = droppedData;
                inputBox.value = num1 + " " + op + " ";
            }
            if (op !== "" && droppedData==="-" && isNegative){
                inputBox.value = num1 + " " + op + " " + "-";
                minButtonOFF();
            }
        }
        // Check if the dropped data is a period
        else if (['.'].includes(droppedData)) {
            if (op === "") {   
                num1 += droppedData;
                inputBox.value = num1 + " " + op + " ";   
                periodButtonOFF();
            } 
            else {
                num2 += droppedData;
                inputBox.value = num1 + " " + op + " " + num2;
                eqButtonON();
                opButtonsON();
                periodButtonOFF();
            }
        }
        else if (droppedData === "-" && num1 === "" && !isNegative) {
            // Handle negative number input
            num1 = "-";
            inputBox.value = num1;
            isNegative = true;
        }
        else if (droppedData === "-" && num2 === "" && op !== "" && !isNegative) {
            // Handle negative number for num2
            num2 = "-";
            inputBox.value = num1 + " " + op + " " + num2;
            isNegative = true;
        }
        else {
            // If it's a number or period, append to num1 or num2 accordingly
            if (op === "") {
                num1 += droppedData;
                if (isNegative){
                    num1=num1*(-1)
                    !isNegative;
                }
                inputBox.value = num1 + " " + op + " " + num2;
                opButtonsON();
            } else {
                num2 += droppedData;
                if (isNegative){
                    num2=num2*(-1)
                    !isNegative;
                }
                inputBox.value = num1 + " " + op + " " + num2;
                opButtonsON();
                eqButtonON();
            }
            isNegative = false; // Reset negative flag when number is entered
        }
    }

    [...opButtons, ...periodButton, ...eqButton, ...numButtons].forEach(button => {
        button.addEventListener('dragstart', dragStart);
    });

    inputBox.addEventListener('dragover', allowDrop);
    inputBox.addEventListener('drop', drop);

    // MINUS BUTTON ON
    function minButtonON() {
        minButton.forEach(button => {
            button.disabled = false;
            button.draggable = true;
        });
    }

    // MINUS BUTTON OFF
    function minButtonOFF() {
        minButton.forEach(button => {
            button.disabled = true;
            button.draggable = false;
        });
    }

    // EQUALS BUTTON ON
    function eqButtonON() {
        eqButton.forEach(button => {
            button.disabled = false;
        });
    }

    // EQUALS BUTTON OFF
    function eqButtonOFF() {
        eqButton.forEach(button => {
            button.disabled = true;
        });
    }

    // OPERATION BUTTONS ON
    function opButtonsON() {
        opButtons.forEach(button => {
            button.disabled = false;
            button.draggable = true;
        });
    }

    //OPERATION BUTTONS OFF
    function opButtonsOFF() {
        opButtons.forEach(button => {
            button.disabled = true;
            button.draggable = false;
        });
    }

    //PERIOD BUTTON ON
    function periodButtonON() {
        periodButton.forEach(button => {
            button.disabled = false;
            button.draggable = true;
        });
    }

    //PERIOD BUTTON OFF
    function periodButtonOFF() {
        periodButton.forEach(button => {
            button.disabled = true;
            button.draggable = false;
        });
    }

    //CLEAR SCREEN FUNCTION
    function clrscn() {
        inputBox.value = "";
    }

    //OPERATION SWITCH CASES
    function operation() {
        switch (op) {
            case "+":
                num1 = parseFloat(num1) + parseFloat(num2);
                break;
            case "-":
                num1 = parseFloat(num1) - parseFloat(num2);
                break;
            case "x":
                num1 = parseFloat(num1) * parseFloat(num2);
                break;
            case "/":
                num1 = parseFloat(num1) / parseFloat(num2);
                break;
            }
        num2 = "";
        inputBox.value = num1;
        op = "";
    }

    // Initial states of a few buttons
    opButtonsOFF();
    eqButtonOFF();
    minButtonON();

    // AC button click function
    ACbutton.forEach(button => {
        button.addEventListener('click', function() {
            num1 = "";
            num2 = "";
            op = "";
            clrscn();
            opButtonsOFF();
            minButtonON();
            !isNegative;
        });
    });

    // Equals button click function
    eqButton.forEach(button => {
        button.addEventListener('click', function() {
            eqButtonOFF();
            opButtonsON();
            operation();
        });
    });
});
