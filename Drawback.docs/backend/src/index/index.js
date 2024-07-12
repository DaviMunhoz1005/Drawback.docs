document.addEventListener("DOMContentLoaded", function() {
    let totalAmount = 1;
    let progress = 8;
    let number = document.getElementById("number");
    var amount = document.querySelectorAll(".amountSquares");
    var size = (472 / progress);
    for (var counter = 0; counter < totalAmount; counter++);
    number.innerHTML = counter + "/" + progress;
    document.body.style.setProperty('--size', 472 - size * totalAmount);
});