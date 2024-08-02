let num1 = ""
let num2 = ""
let op = ""


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons with the class 'textButton'
    const opButtons = document.querySelectorAll('.operands');
    const periodButton = document.querySelectorAll('.period');
    const numButtons = document.querySelectorAll('.nums');
    const inputBox = document.getElementById('myInput');

    // Add a click event listener to each button
    numButtons.forEach(button => {
        button.addEventListener('click', function() {
            opButtons.forEach(opButtons => {
                opButtons.disabled = false;
            });
            // Get the data-text attribute value from the clicked button
            const newText = parseInt(button.getAttribute('data-text'));
            // Change the value of the input box to the text from the clicked button
            inputBox.value = inputBox.value + newText;
        });
    });
    // Add a click event listener to each button
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
            periodButton.forEach(periodButton => {
                periodButton.disabled = false;
            });
        });
    });
    // Add a click event listener to each button
    periodButton.forEach(button => {
        button.addEventListener('click', function() {
            // Get the data-text attribute value from the clicked button
            const newText = (button.getAttribute('data-text'));
            // Change the value of the input box to the text from the clicked button
            inputBox.value = inputBox.value + newText;
            button.disabled= true;
        });
    });
});

