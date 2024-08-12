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


//Modal para documentos
function showModal(){
    var element = document.getElementById("modal");
    element.classList.add("show-modal");
}

function hideModal(){
    var element = document.getElementById("modal"); 
    element.classList.remove("show-modal");
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}


//Modal para header 



var modal = document.getElementById("modalentrar");
btn.onclick = function(){
    modal.style.display = "block"
}


function showModalentrar() {
    document.getElementById('modalentrar').style.display = 'block';
}

// Função para ocultar o modal
function hideModalentrar() {
    document.getElementById('modalentrar').style.display = 'none';
}

// Fechar o modal se o usuário clicar fora dele
window.onclick = function(event) {
    if (event.target === document.getElementById('modalentrar')) {
        hideModalentrar();
    }
}

