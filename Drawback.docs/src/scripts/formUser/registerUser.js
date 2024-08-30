import { handleFindUser, handleFindByCnpjCpf, handleCreateAccountAndToken } from "./../services/apiRequests.js"; 
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

        alertError("Já existe um usuário com esse nome.");
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

async function checkCpfAlreadyExists(cpf) {
    
    const cpfExists = await handleFindByCnpjCpf(cpf);
    
    if(cpfExists) {
        
        alertError("Já existe um usuário com esse CPF.");
    } else {

        return true;
    }
}

