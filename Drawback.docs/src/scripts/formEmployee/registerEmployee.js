document.addEventListener('DOMContentLoaded', () => {
    
    const registerButton = document.getElementById("register");

    registerButton.addEventListener('click', function(event) {
        event.preventDefault(); // não atualiza a página quando é clicado o botão 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const checkPassword = document.getElementById("checkPassword").value;
        const cnpj = document.getElementById("cnpj").value;
        const email = document.getElementById("email").value;

        console.log(username);
        console.log(password);
        console.log(checkPassword);
        console.log(cnpj);
        console.log(email);
    });
});