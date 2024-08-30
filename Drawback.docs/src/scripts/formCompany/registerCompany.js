import { handleFindUser, handlelFindByNameCorporateReason, handleFindByCnpjCpf, handleFindByCnae, handleCreateAccountAndToken } 
from "./../services/apiRequests.js"; 
import { alertError } from "../components/alerts.js";

document.getElementById("register").addEventListener('click', async function(event) {

    event.preventDefault();
    const formData = await getFormData(); 

    if(await handleCreateAccountAndToken(formData)) {

        sessionStorage.setItem('registerSuccess', true);
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

        alertError("Já existe um usuário com esse nome.");
    } else {

        return true;
    }
}

async function checkNameCorporateReasonAlreadyExists(nameCorporateReason) {
    
    const nameCorporateReasonExists = await handlelFindByNameCorporateReason(nameCorporateReason);

    if(nameCorporateReasonExists) {

        alertError("Já existe um usuário com esse razão social.");
    } else {

        return true;
    }
}

function checkPasswordExistOrNull(password, checkPassword) {
    
    if(password == "") {

        return alertError("Não é permitido uma senha vazia.");  
    } else if(password != checkPassword) {

        return alertError("As senhas informadas não coincidem.");
    } else {

        return true;
    }
}

async function checkCnpjAlreadyExists(cnpj) {
    
    const cnpjExists = await handleFindByCnpjCpf(cnpj);
    
    if(cnpjExists) {
        
        alertError("Já existe um usuário com esse CNPJ.");
    } else {

        return true;
    }
}

async function checkCnaeAlreadyExists(cnae) {
    
    const cnaeExists = await handleFindByCnae(cnae);

    if(cnaeExists) {

        alertError("Já existe um usuário com essa CNAE.");
    } else {

        return true;
    }
}