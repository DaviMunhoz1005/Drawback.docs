import { handleTakeUserTokenButton } from "./../services/apiRequests.js"; 

const loginButton = document.getElementById("login");

loginButton.addEventListener('click', async function(event) {
        
    event.preventDefault();
    const formData = getFormData(); 
    await handleTakeUserTokenButton(formData);  
    window.location.replace("/Drawback.docs/src/public/index.html");
});

function getFormData() {

    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
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


