function add() {
    let number = document.getElementById("number").innerText;
    number = parseInt(number) + 1;
    document.getElementById("number").innerText = number;
}
function remove() {
    document.getElementById("number").innerText = 0;

}