import { handleFindUser, handleFindByCnpjCpf, handleCreateAccountAndToken } from "./../services/apiRequests.js"; 

document.getElementById("register").addEventListener('click', async function(event) {
    
    event.preventDefault();
    const formData = await getFormData(); 

    if(await handleCreateAccountAndToken(formData)) {

        window.location.replace("/Drawback.docs/src/public/pages/otherPages/documents.html");
    }
});

async function getFormData() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("checkPassword").value;
    const cpf = document.getElementById("cpf").value;

    if(await checkUsernameAlreadyExists(username) && 
    checkPasswordExistOrNull(password, checkPassword) && 
    await checkCpfAlreadyExists(cpf)) {

        return {
            username: username,
            email: document.getElementById("email").value,
            password: password,
            cnpjCpf: cpf
        };
    }
}

async function checkUsernameAlreadyExists(username) {

    const userExists = await handleFindUser(username);
    
    if(userExists) {

        alertFromUserAlreadyExists();
    } else {

        return true;
    }
}

function alertFromUserAlreadyExists() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Já existe um usuário com esse nome.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("There is already a user with that name");
        return false;
    });
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

async function checkCpfAlreadyExists(cpf) {
    
    const cpfExists = await handleFindByCnpjCpf(cpf);
    
    if(cpfExists) {
        
        alertFromCpfAlreadyExists();
    } else {

        return true;
    }
}

function alertFromCpfAlreadyExists() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Já existe um usuário com esse CPF.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("There is already a user with that CPF");
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

