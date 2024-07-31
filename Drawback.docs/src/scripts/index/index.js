document.addEventListener("DOMContentLoaded", function() {

    let totalAmount, progress, number, amount, size, counter; 

    totalAmount = 1;
    progress = 7;

    number = document.getElementById("number");
    amount = document.querySelectorAll(".amountSquares");

    size = (472 / progress);

    for (counter = 0; counter < totalAmount; counter++);
    
    number.innerHTML = counter + "/" + progress;
    document.body.style.setProperty('--size', 472 - size * totalAmount);
});



function showModal(){
    var element = document.getElementById("modal");
    element.classList.add("show-modal");
}

function hideModal(){
    var element = document.getElementById("modal"); 
    element.classList.remove("show-modal");
}




