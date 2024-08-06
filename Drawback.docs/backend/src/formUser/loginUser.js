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