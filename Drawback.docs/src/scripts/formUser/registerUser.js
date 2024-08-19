document.addEventListener('DOMContentLoaded', () => {
    
    const registerButton = document.getElementById("register");

    registerButton.addEventListener('click', function(event) {
        event.preventDefault(); // não atualiza a página quando é clicado o botão 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const checkPassword = document.getElementById("checkPassword").value;
        const cpf = document.getElementById("cpf").value;
        const email = document.getElementById("email").value;

        console.log(username);
        console.log(password);
        console.log(checkPassword);
        console.log(cpf);
        console.log(email);
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


