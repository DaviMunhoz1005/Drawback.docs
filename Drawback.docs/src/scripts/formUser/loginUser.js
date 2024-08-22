import { handleTakeUserTokenButton } from "./../services/apiRequests.js"; 

document.getElementById("login").addEventListener('click', async function(event) {
    
    event.preventDefault();
    const formData = getFormData(); 
    const tokenCreated = await handleTakeUserTokenButton(formData);  
    
    if(tokenCreated) {

        window.location.replace("/Drawback.docs/src/public/index.html");
    } else {

        alertFromUserOrPasswordInvalid();
    }
});

function getFormData() {

    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
}

function alertFromUserOrPasswordInvalid() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Usuário ou Senha inválidos.",
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error("Invalid username or password.");
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
