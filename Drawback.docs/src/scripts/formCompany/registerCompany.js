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

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const checkPassword = document.getElementById("checkPassword").value.trim();
    const nameCorporateReason = document.getElementById("nameCorporateReason").value.trim();
    let cnpj = document.getElementById("cnpj").value.trim();
    let cnae = document.getElementById("cnae").value.trim();

    cnpj = cnpj.replace(/\//g, "").replace(/\./g, "").replace(/-/g, "");
    cnae = cnae.replace(/\./g, "").replace(/-/g, "");

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

    if(cnpj.length < 14) {

        alertError("O CNPJ deve conter 14 números.")
        return false;
    } 

    const cnpjExists = await handleFindByCnpjCpf(cnpj);
    
    if(cnpjExists) {
            
        return alertError("Já existe um usuário com esse CNPJ.");
    }

    return true;
}

async function checkCnaeAlreadyExists(cnae) {

    if(cnae.length < 6) {

        alertError("O CNAE deve conter 6 números.")
        return false;
    } 

    const cnaeExists = await handleFindByCnae(cnae);

    if(cnaeExists) {

        return alertError("Já existe um usuário com essa CNAE.");
    }

    return true;
}