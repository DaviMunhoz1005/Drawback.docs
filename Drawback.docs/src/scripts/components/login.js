import { handleTakeUserTokenButton } from "./../services/apiRequests.js"; 
import { alertError } from "./alerts.js";

document.getElementById("login").addEventListener('click', async function(event) {
    
    event.preventDefault();
    const formData = getFormData(); 
    const tokenCreated = await handleTakeUserTokenButton(formData);  
    
    if(tokenCreated) {

        sessionStorage.setItem('loginSuccess', true);
        window.location.replace("/Drawback.docs/src/public/pages/otherPages/documents.html");
        return;
    } 

    return alertError("Usuário ou Senha inválidos.");
});

function getFormData() {

    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
}
