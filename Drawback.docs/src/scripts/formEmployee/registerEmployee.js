import { handleFindUser, handleFindByCnpjCpf, handleCreateAccountAndToken } from "./../services/apiRequests.js"; 
import { alertError } from "../components/alerts.js";

document.getElementById("register").addEventListener('click', async function(event) {

    event.preventDefault();
    const formData = await getFormData(); 

    if(await handleCreateAccountAndToken(formData)) {

        sessionStorage.setItem('registerSuccess', true);
        window.location.replace("/Drawback.docs/src/public/pages/otherPages/documents.html");
    } else {

        alertError("Não é possível ser funcionário de uma conta do tipo Pessoa Física.");
    }
});

async function getFormData() {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("checkPassword").value;
    const cnpj = document.getElementById("cnpj").value;

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

        alertError("Já existe um usuário com esse nome.");
    } else {

        return true;
    }
}

function checkCharsFromEmail(email) {

    if(email.includes("@")) {

        return true;
    } else {
        
        alertError("O email precisa ter o caractere \"@\".");
        return false
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

async function checkCnpjExists(cnpj) { // ver se realmente existe, fazer o contrário
    
    const cnpjExists = await handleFindByCnpjCpf(cnpj);
    
    if(cnpjExists) {
        
        return true;
    } else {

        alertError("Não existe um usuário com esse CNPJ.");
    }
}