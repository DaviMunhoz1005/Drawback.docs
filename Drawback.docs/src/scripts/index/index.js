let totalAmount, progress, number, amount, size, counter; 

totalAmount = 1;
progress = 7;

number = document.getElementById("number");
amount = document.querySelectorAll(".amountSquares");

size = (472 / progress);

for (counter = 0; counter < totalAmount; counter++);
    
number.innerHTML = counter + "/" + progress;
document.body.style.setProperty('--size', 472 - size * totalAmount);

let y = 0;
let x = 0;

function showModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('black').style.display = 'block';
    y++;
    console.log(y)
    if(y>=2){
            document.getElementById('modal').style.display = 'none';
            document.getElementById('black').style.display = 'none';
            y=0;
    }
}

// Função para ocultar o modal
function hideModal() {
    document.getElementById('modal').style.display = 'none';   
    document.getElementById('black').style.display = 'none';
    y=0;
}

//Modal para header 

function showModalentrar() {
    document.getElementById('modalentrar').style.display = 'block';
    x++;
    if(x>=2){
            document.getElementById('modalentrar').style.display = 'none';
            x=0; 
    }
}

// Função para ocultar o modal
function hideModalentrar() {
    document.getElementById('modalentrar').style.display = 'none';
    x=0;
}

number.innerHTML = counter + "/" + progress;
document.body.style.setProperty('--size', 472 - size * totalAmount);


/*
//MODAL PARA INDEX
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
}*/


