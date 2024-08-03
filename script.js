let num1 = "";
let num2 = "";
let op = "";

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const opButtons = document.querySelectorAll('.operands');
    const periodButton = document.querySelectorAll('.period');
    const ACbutton = document.querySelectorAll('.AC');
    const eqButton = document.querySelectorAll('.equals');
    const numButtons = document.querySelectorAll('.nums');
    const inputBox = document.getElementById('myInput');

    // Enable dragging on all buttons except the AC button
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
            if (op !== "") {
                operation();
            }
            op = droppedData;
            inputBox.value = num1 + " " + op + " ";
            opButtonsOFF();    
            periodButtonON();
        } else {
            // If it's a number or period, append to num1 or num2
            if (op === "") {
                num1 += droppedData;
                inputBox.value = num1;
                opButtonsON();
            } else {
                num2 += droppedData;
                inputBox.value = num2;
                opButtonsON();
            }
        }
    }


    [...opButtons, ...periodButton, ...eqButton, ...numButtons].forEach(button => {
        button.addEventListener('dragstart', dragStart);
    });

    inputBox.addEventListener('dragover', allowDrop);
    inputBox.addEventListener('drop', drop);

    // OPERATION BUTTONS ON
    function opButtonsON() {
        opButtons.forEach(button => {
            button.disabled = false;
            opButtons.forEach(button => {
                button.draggable = true;
            });
        });
    }
    //OPERATION BUTTONS OFF
    function opButtonsOFF() {
        opButtons.forEach(button => {
            button.disabled = true;
            opButtons.forEach(button => {
                button.draggable = false;
            });
        });
    }
    //PERIOD BUTTON ON
    function periodButtonON() {
        periodButton.forEach(button => {
            button.disabled = false;
            periodButton.forEach(button => {
                button.draggable = true;
            });
        });
    }
    //PERIOD BUTTON OFF
    function periodButtonOFF() {
        periodButton.forEach(button => {
            button.disabled = true;
            periodButton.forEach(button => {
                button.draggable = false;
            });
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
        inputBox.value = num1;
        num2 = "";
        op = "";
    }

    opButtonsOFF();


    ACbutton.forEach(button => {
        button.addEventListener('click', function() {
            num1 = "";
            num2 = "";
            op = "";
            clrscn();
            opButtonsOFF();
            periodButtonOFF();
        });
    });

    eqButton.forEach(button => {
        button.addEventListener('click', function() {
            opButtonsON();
            operation();
        });
    });
});
