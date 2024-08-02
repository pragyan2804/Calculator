let num1 = "";
let num2 = "";
let op = "";

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons with the class 'textButton'
    const opButtons = document.querySelectorAll('.operands');
    const periodButton = document.querySelectorAll('.period');
    const ACbutton = document.querySelectorAll('.AC');
    const eqButton = document.querySelectorAll('.equals');
    const numButtons = document.querySelectorAll('.nums');
    const inputBox = document.getElementById('myInput');

    // OPERATION BUTTONS ON
    function opButtonsON() {
        opButtons.forEach(button => {
            button.disabled = false;
        });
    }

    // OPERATION BUTTONS OFF
    function opButtonsOFF() {
        opButtons.forEach(button => {
            button.disabled = true;
        });
    }

    // PERIOD BUTTON ON
    function periodButtonON() {
        periodButton.forEach(button => {
            button.disabled = false;
        });
    }

    // PERIOD BUTTON OFF
    function periodButtonOFF() {
        periodButton.forEach(button => {
            button.disabled = true;
        });
    }

    // CLEAR SCREEN
    function clrscn() {
        inputBox.value = "";
    }

    // OPERATION FUNCTION
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
    periodButtonOFF();

    // NUMBER BUTTONS
    numButtons.forEach(button => {
        button.addEventListener('click', function() {
            opButtonsON();
            periodButtonON();
            // Get the data-text attribute value from the clicked button
            const newText = button.getAttribute('data-text');
            // If an operation has already been chosen, we're entering num2
            if (op === "") {
                num1 += newText;
                inputBox.value = num1;
            } else {
                num2 += newText;
                inputBox.value = num2;
            }
        });
    });

    // OPERATION BUTTONS
    opButtons.forEach(button => {
        button.addEventListener('click', function() {
            // If there is already an operator selected and a second one is clicked,
            // perform the previous operation before setting the new operator.
            if (op !== "") {
                operation();
            }
            // Get the data-text attribute value from the clicked button
            op = button.getAttribute('data-text');
            opButtonsOFF();    
            periodButtonOFF();
            inputBox.value = num1 + " " + op + " ";
        });
    });

    // PERIOD BUTTON
    periodButton.forEach(button => {
        button.addEventListener('click', function() {
            // Get the data-text attribute value from the clicked button
            const newText = button.getAttribute('data-text');
            // Append the period to the current number
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

    // AC BUTTON
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

    // EQUALS BUTTON
    eqButton.forEach(button => {
        button.addEventListener('click', function() {
            opButtonsON();
            operation();
        });
    });
});
