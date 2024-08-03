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
    [...opButtons, ...periodButton, ...eqButton, ...numButtons].forEach(button => {
        button.draggable = true;
    });

    // DRAG AND DROP FUNCTIONALITY
    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.getAttribute('data-text'));
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const droppedData = event.dataTransfer.getData('text');
        
        if (op === "") {
            num1 += droppedData;
            inputBox.value = num1;
        } else {
            num2 += droppedData;
            inputBox.value = num2;
        }

        if (event.target.classList.contains('operands')) {
            op = droppedData;
            inputBox.value = num1 + " " + op + " ";
            opButtonsOFF();    
            periodButtonON();
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
        });
    }

    function opButtonsOFF() {
        opButtons.forEach(button => {
            button.disabled = true;
        });
    }

    function periodButtonON() {
        periodButton.forEach(button => {
            button.disabled = false;
        });
    }

    function periodButtonOFF() {
        periodButton.forEach(button => {
            button.disabled = true;
        });
    }

    function clrscn() {
        inputBox.value = "";
    }

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

    numButtons.forEach(button => {
        button.addEventListener('click', function() {
            opButtonsON();
            const newText = button.getAttribute('data-text');
            if (op === "") {
                num1 += newText;
                inputBox.value = num1;
            } else {
                num2 += newText;
                inputBox.value = num2;
            }
        });
    });

    opButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (op !== "") {
                operation();
            }
            op = button.getAttribute('data-text');
            opButtonsOFF();    
            periodButtonON();
            inputBox.value = num1 + " " + op + " ";
        });
    });

    periodButton.forEach(button => {
        button.addEventListener('click', function() {
            const newText = button.getAttribute('data-text');
            if (op === "") {
                num1 += newText;
                inputBox.value = num1;
            } else {
                num2 += newText;
                inputBox.value = num2;
            }
            periodButtonOFF();
        });
    });

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
