const display = document.getElementById("display");

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        if (display.value.trim() === "") return;
        display.value = eval(display.value);
    }
    catch {
        display.value = "Error";
    }
}
