import { handleFindUser, handleFindByCnpjCpf, handleCreateAccountAndToken } 
from "./../services/apiRequests.js"; 

document.getElementById("register").addEventListener('click', async function(event) {

    event.preventDefault();
    const formData = await getFormData(); 

    if(await handleCreateAccountAndToken(formData)) {

        window.location.replace("/Drawback.docs/src/public/pages/otherPages/documents.html");
    } else {

        alertFromTryToLinkCpfExeption();
    }
});

async function getFormData() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("checkPassword").value;
    const cnpj = document.getElementById("cnpj").value;

    if(await checkUsernameAlreadyExists(username) && 
    checkPasswordExistOrNull(password, checkPassword) && 
    await checkCnpjAlreadyExists(cnpj)) {

        return {
            username: username,
            email: document.getElementById("email").value,
            password: password,
            cnpjCpf: cnpj
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

async function checkCnpjAlreadyExists(cnpj) { // ver se realmente existe, fazer o contrário
    
    const cnpjExists = await handleFindByCnpjCpf(cnpj);
    
    if(cnpjExists) {
        
        return true;
    } else {

        alertFromNonExistCnpjExeption();
    }
}

function alertFromNonExistCnpjExeption() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Não existe um usuário com esse CNPJ.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("There is no user with this CNPJ");
        return false;
    });
}

function alertFromTryToLinkCpfExeption() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Não é possível ser funcionário de uma conta do tipo Pessoa Física.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("It is not possible to be an employee of an Individual account type");
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