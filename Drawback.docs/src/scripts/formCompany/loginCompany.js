document.addEventListener('DOMContentLoaded', () => {
    
    const loginButton = document.getElementById("login");

    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // não atualiza a página quando é clicado o botão

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log(username);
        console.log(password);
    });
});


let x = 0;

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


