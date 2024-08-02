let num1 = ""
let num2 = ""
let op = ""


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons with the class 'textButton'
    const opButtons = document.querySelectorAll('.operands');
    const periodButton = document.querySelectorAll('.period');
    const ACbutton = document.querySelectorAll('.AC');
    const eqButton = document.querySelectorAll('.equals');
    const numButtons = document.querySelectorAll('.nums');
    const inputBox = document.getElementById('myInput');

    //OPERATION BUTTONS ON
    function opButtonsON(){
        opButtons.forEach(opButtons => {
            opButtons.disabled = false;
        });
    }
    //OPERATION BUTTONS OFF
    function opButtonsOFF(){
        opButtons.forEach(opButtons => {
            opButtons.disabled = true;
        });
    };
    //PERIOD BUTTON ON
    function periodButtonON(){
        periodButton.forEach(periodButton => {
        periodButton.disabled = false;
    });
    }
    //PERIOD BUTTON OFF
    function periodButtonOFF(){
        periodButton.forEach(periodButton => {
        periodButton.disabled = true;
    });
    }

    opButtonsOFF();
    periodButtonOFF();
    // NUMBER BUTTONS
    numButtons.forEach(button => {
        button.addEventListener('click', function() {
            opButtonsON();
            // Get the data-text attribute value from the clicked button
            const newText = parseInt(button.getAttribute('data-text'));
            // Change the value of the input box to the text from the clicked button
            inputBox.value = inputBox.value + newText;
        });
    });
    // OPERATION BUTTONS
    opButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the data-text attribute value from the clicked button
            const newText = (button.getAttribute('data-text'));
            // INSERT OPERATION SWITCH CASES HERE
            function operation(num1, num2, newText){
                switch(newText){
                    case "+":
                        num1+=newText;
                    case "-":
                        num1-=newText;
                    case "x":
                        num1*=newText;
                    case "/":
                        num1/=newText;
                }
            }     
            inputBox.value = inputBox.value + newText;
            button.disabled= true;     
            periodButtonON();
        });
    });
    // PERIOD BUTTON
    periodButton.forEach(button => {
        button.addEventListener('click', function() {
            // Get the data-text attribute value from the clicked button
            const newText = (button.getAttribute('data-text'));
            // Change the value of the input box to the text from the clicked button
            inputBox.value = inputBox.value + newText;
            periodButtonOFF();
        });
    });
    // AC BUTTON
    ACbutton.forEach(button => {
        button.addEventListener('click', function() {
            num1 = " "
            num2 = " "
            op = " "
            newText=" "
            inputBox.value = newText;
        });
    });
    // EQUALS BUTTON
    eqButtonutton.forEach(button => {
        button.addEventListener('click', function() {
            inputBox.value = num1;
        });
    });
});

