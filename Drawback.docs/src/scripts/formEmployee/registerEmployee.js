import { handleFindUser, handleFindByCnpjCpf, handleCreateAccountAndToken } from "./../services/apiRequests.js"; 
import { alertError } from "../components/alerts.js";

document.getElementById("register").addEventListener('click', async function(event) {

    event.preventDefault();
    const formData = await getFormData(); 

    if(await handleCreateAccountAndToken(formData)) {

        sessionStorage.setItem('registerSuccess', true);
        window.location.replace("/Drawback.docs/src/public/pages/otherPages/documents.html");
        return;
    } 

    return alertError("Não é possível ser funcionário de uma conta do tipo Pessoa Física.");
});

async function getFormData() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const checkPassword = document.getElementById("checkPassword").value.trim();
    let cnpj = document.getElementById("cnpj").value.trim();

    cnpj = cnpj.replace(/\//g, "").replace(/\./g, "").replace(/-/g, "");

    if(await checkUsernameAlreadyExists(username) && 
    checkCharsFromEmail(email) &&
    checkPasswordExistOrNull(password, checkPassword) && 
    await checkCnpjExists(cnpj)) {

        return {
            username: username,
            email: email,
            password: password,
            cnpjCpf: cnpj
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

async function checkCnpjExists(cnpj) { 
    
    if(cnpj.length < 14) {

        alertError("O CNPJ deve conter 14 números.")
        return false;
    } 

    const cnpjExists = await handleFindByCnpjCpf(cnpj);
    
    if(cnpjExists) {
        
        return true;
    }

    return alertError("Não existe um usuário com esse CNPJ.");
}