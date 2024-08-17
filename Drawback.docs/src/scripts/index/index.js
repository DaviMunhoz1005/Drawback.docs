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



function showModal() {
    document.getElementById('modal').style.display = 'block';
}

function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

// Não sei se você vai salvar assim mas ta aí
function saveDocument() {
    var fileInput = document.getElementById('documentFile');
    var dateInput = document.getElementById('expirationDate');

    var file = fileInput.files[0]; 
    var expirationDate = dateInput.value; validade

    if (file && expirationDate) {
        // Forma de processar o arquivo e a data caso necessário
        console.log('Arquivo selecionado:', file.name);
        console.log('Data de validade:', expirationDate);
        alert('Documento salvo com sucesso!');
        hideModal();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        hideModal();
    }
}

// Modal para header 


