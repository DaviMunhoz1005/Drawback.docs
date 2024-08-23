import { handleFindUser, handlelFindByNameCorporateReason, handleFindByCnpjCpf, handleFindByCnae, handleCreateAccountAndToken } 
from "./../services/apiRequests.js"; 

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
    const nameCorporateReason = document.getElementById("nameCorporateReason").value;
    const cnpj = document.getElementById("cnpj").value;
    const cnae = document.getElementById("cnae").value;

    if(await checkUsernameAlreadyExists(username) && 
    await checkNameCorporateReasonAlreadyExists(nameCorporateReason) &&
    checkPasswordExistOrNull(password, checkPassword) && 
    await checkCnpjAlreadyExists(cnpj) && 
    await checkCnaeAlreadyExists(cnae)) {

        return {
            username: username,
            nameCorporateReason : nameCorporateReason,
            email: document.getElementById("email").value,
            password: password,
            cnpjCpf: cnpj, 
            cnae : cnae
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

async function checkNameCorporateReasonAlreadyExists(nameCorporateReason) {
    
    const nameCorporateReasonExists = await handlelFindByNameCorporateReason(nameCorporateReason);

    if(nameCorporateReasonExists) {

        alertFromNameCorporateReasonAlreadyExists();
    } else {

        return true;
    }
}

function alertFromNameCorporateReasonAlreadyExists() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Já existe um usuário com esse razão social.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("There is already a user with that social reason");
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

async function checkCnpjAlreadyExists(cnpj) {
    
    const cnpjExists = await handleFindByCnpjCpf(cnpj);
    
    if(cnpjExists) {
        
        alertFromCnpjAlreadyExists();
    } else {

        return true;
    }
}

function alertFromCnpjAlreadyExists() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Já existe um usuário com esse CNPJ.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("There is already a user with that CNPJ");
        return false;
    });
}

async function checkCnaeAlreadyExists(cnae) {
    
    const cnaeExists = await handleFindByCnae(cnae);

    if(cnaeExists) {

        alertFromCnaeAlreadyExists();
    } else {

        return true;
    }
}

function alertFromCnaeAlreadyExists() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Já existe um usuário com essa CNAE.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("There is already a user with that CNPJ");
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
