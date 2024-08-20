import { handleCreateAccountAndToken } from "./../services/apiRequests.js"; 

const registerButton = document.getElementById("register");

registerButton.addEventListener('click', async function(event) {

    event.preventDefault();
    const formData = getFormData(); 
    await handleCreateAccountAndToken(formData);  
    window.location.replace("/Drawback.docs/src/public/index.html");
});

function getFormData() {

    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("checkPassword").value;

    if(password === checkPassword) {

        return {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: password,
            cnpjCpf: document.getElementById("cpf").value
        };
    } else {

        throw new Error("As senhas informadas não coincidem");
    }
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

