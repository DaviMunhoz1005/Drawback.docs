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
