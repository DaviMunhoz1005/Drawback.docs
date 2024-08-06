document.addEventListener('DOMContentLoaded', () => {
    
    const registerButton = document.getElementById("register");

    registerButton.addEventListener('click', function(event) {
        event.preventDefault(); // não atualiza a página quando é clicado o botão 

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const checkPassword = document.getElementById("checkPassword").value;
        const cnpj = document.getElementById("cnpj").value;
        const nameCorporateReason = document.getElementById("nameCorporateReason").value;
        const cnae = document.getElementById("cnae").value;

        console.log(username);
        console.log(password);
        console.log(checkPassword);
        console.log(cnpj);
        console.log(email);
        console.log(nameCorporateReason);
        console.log(cnae);
    });
});