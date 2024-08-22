import { handleFindUser, handleFindByCnpjCpf, handleCreateAccountAndToken } from "./../services/apiRequests.js"; 

const registerButton = document.getElementById("register");

registerButton.addEventListener('click', async function(event) {

    event.preventDefault();
    const formData = await getFormData(); 
    const response = await handleCreateAccountAndToken(formData);  

    if(response) {

        window.location.replace("/Drawback.docs/src/public/index.html");
    }
});

async function getFormData() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("checkPassword").value;
    const cnpjCpf = document.getElementById("cpf").value;

    const booleanUsername = await checkUsernameAlreadyExists(username);
    const booleanPassword = checkPasswordExistOrNull(password, checkPassword);
    const booleanCnpjCpf = await checkCnpjCpfAlreadyExists(cnpjCpf);

    if(booleanUsername && booleanPassword && booleanCnpjCpf) {

        return {
            username: username,
            email: document.getElementById("email").value,
            password: password,
            cnpjCpf: cnpjCpf
        };
    }
}

async function checkUsernameAlreadyExists(username) {

    const response = await handleFindUser(username);
    
    if(response) {

        Swal.fire({
            title: "Algo deu errado!",
            text: "Já existe um usuário com esse nome.",
            icon: "error",
            confirmButtonText: "Ok"
        }).then(() => {
            console.error("There is already a user with that name");
            return false;
        });
    } else {

        return true;
    }
}

function checkPasswordExistOrNull(password, checkPassword) {
    
    if(password == "") {

        return alertFromPasswordExecption();  
    } else if(password != checkPassword) {

        return alertFromCheckPasswordException();
    } else {

        return true;
    }
}

async function checkCnpjCpfAlreadyExists(cnpjCpf) {
    
    const response = await handleFindByCnpjCpf(cnpjCpf);
    
    if(response) {
    
        Swal.fire({
            title: "Algo deu errado!",
            text: "Já existe um usuário com esse CPF.",
            icon: "error",
            confirmButtonText: "Ok"
        }).then(() => {
            console.error("There is already a user with that CPF");
            return false;
        });
    } else {

        return true;
    }
}

function alertFromPasswordExecption() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Não é permitido uma senha vazia.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("An empty password is not allowed");
        return false
    });
}

function alertFromCheckPasswordException() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "As senhas informadas não coincidem.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("As senhas informadas não coincidem");
        return false;
    });
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

