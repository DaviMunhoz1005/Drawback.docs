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
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("checkPassword").value;
    const nameCorporateReason = document.getElementById("nameCorporateReason").value;
    const cnpj = document.getElementById("cnpj").value;
    const cnae = document.getElementById("cnae").value;

    if(await checkUsernameAlreadyExists(username) && 
    checkCharsFromEmail(email) &&
    await checkNameCorporateReasonAlreadyExists(nameCorporateReason) &&
    checkPasswordExistOrNull(password, checkPassword) && 
    await checkCnpjAlreadyExists(cnpj) && 
    await checkCnaeAlreadyExists(cnae)) {

        return {
            username: username,
            nameCorporateReason : nameCorporateReason,
            email: email,
            password: password,
            cnpjCpf: cnpj, 
            cnae : cnae
        };
    } 
}

async function checkUsernameAlreadyExists(username) {

    const userExists = await handleFindUser(username);
    
    if(userExists) {

        return alertError("Já existe um usuário com esse nome.");
    }

    return true;
}

function checkCharsFromEmail(email) {

    if(email.includes("@")) {

        return true;
    } 
        
    alertError("O email precisa ter o caractere \"@\".");
    return false
}

async function checkNameCorporateReasonAlreadyExists(nameCorporateReason) {
    
    if(/\D/.test(nameCorporateReason)) {

        const nameCorporateReasonExists = await handlelFindByNameCorporateReason(nameCorporateReason);

        if(nameCorporateReasonExists) {

            return alertError("Já existe um usuário com esse razão social.");
        } 

        return true;
    } 

    alertError("A Razão Social precisa contar letras.");
    return false;
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
    
    if(/\D/.test(cnpj)) {

        alertError("O CNPJ deve conter apenas números.");
        return false;
    } 

    const cnpjExists = await handleFindByCnpjCpf(cnpj);
    
    if(cnpjExists) {
            
        return alertError("Já existe um usuário com esse CNPJ.");
    }

    return true;
}

async function checkCnaeAlreadyExists(cnae) {
    
    if(/\D/.test(cnae)) {

        alertError("A CNAE deve conter apenas números.");
        return false;
    } 

    const cnaeExists = await handleFindByCnae(cnae);

    if(cnaeExists) {

        return alertError("Já existe um usuário com essa CNAE.");
    }

    return true;
}