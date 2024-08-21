import { handleCreateAccountAndToken } from "./../services/apiRequests.js"; 

const registerButton = document.getElementById("register");

registerButton.addEventListener('click', async function(event) {

    event.preventDefault();
    const formData = getFormData(); 
    await handleCreateAccountAndToken(formData);  
});

function getFormData() {

    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("checkPassword").value;

    if(password == "") {

        Swal.fire({
            title: "Algo deu errado!",
            text: "Não é permitido uma senha vazia.",
            icon: "error",
            confirmButtonText: "Ok"
        }).then(() => {
            throw new Error("An empty password is not allowed");
        });
    } else if(password === checkPassword) {

        return {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: password,
            cnpjCpf: document.getElementById("cpf").value
        };
    } else {

        Swal.fire({
            title: "Algo deu errado!",
            text: "As senhas informadas não coincidem.",
            icon: "error",
            confirmButtonText: "Ok"
        }).then(() => {
            throw new Error("As senhas informadas não coincidem");
        });
    }
}

let x = 0;

window.hideSelectionsForms = function() {
    document.getElementById('modalentrar').style.display = 'none';
    x = 0;
};

window.showSelectionsForms = function() {
    document.getElementById('modalentrar').style.display = 'block';
    x++;
    if (x >= 2) {
        window.hideSelectionsForms(); 
    }
};

