import { handleListDocuments, handleListDocumentsByName, handleSendDocument, handleUpdateDocument, handleUsePreviousVersion, handleDeleteDocuments, getExpiryToken } from "./../services/apiRequests.js";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

Toast.fire({
    icon: "success",
    title: "Login feito com sucesso!"
});

documentListFromUser();

document.getElementById("sendDocument").addEventListener('click', () => {

    addNewDocument();
    hideModal();
});

async function documentListFromUser() {

    const blockDocumentList = document.getElementById("separation1");

    try {
        
        
        const listDocuments = await handleListDocuments();
        blockDocumentList.innerHTML = '';

        if (listDocuments.length === 0) {
            
            createAddNewFileHtml();
        } else {
            
            showFilesFromUserHtml(listDocuments);
            createAddNewFileHtml();
        }
    } catch(error) {

        console.error('Erro ao carregar documentos:', error);
    }

    function createAddNewFileHtml() {

        const docHtml = document.createElement("div");
        docHtml.className = "square"; 
        docHtml.onclick = showModal;
    
        docHtml.innerHTML = `
            <a class="designLink1">Adicionar</a>
            <button class="add" >+</button></div>
        `;
    
        blockDocumentList.appendChild(docHtml);
    }
    
    function showFilesFromUserHtml(array) {
    
        array.forEach(documentUser => {
    
            const docHtml = document.createElement("div");
            docHtml.className = "square"; 
    
            docHtml.innerHTML = `
                <a class="designLink1">${documentUser.name} (${documentUser.extension})</a>
                <p>Criação: ${documentUser.creation}</p>
                <button>Baixar</button>
                <button>Excluir</button>
                <button>Editar</button>
                <button>Usar Versão Anterior</button>
            `;
    
            blockDocumentList.appendChild(docHtml);
        });
    }
}

async function addNewDocument() {
    
    try {
        
        const documentFile = document.getElementById("documentFile").files[0];
        const validity = document.getElementById("expirationDate").value;

        await handleSendDocument(documentFile, validity);
        setTimeout(2000, documentListFromUser());
    } catch(error) {
        
        console.error('Erro ao adicionar um novo documento:', error);
    }
}

function progressBar() {

    let totalAmount, progress, number, amount, size, counter; 

    totalAmount = 1;
    progress = 7;

    number = document.getElementById("number");
    amount = document.querySelectorAll(".amountSquares");

    size = (472 / progress);

    for (counter = 0; counter < totalAmount; counter++);
        
    number.innerHTML = counter + "/" + progress;
    document.body.style.setProperty('--size', 472 - size * totalAmount);
}

progressBar();

let y = 0;

window.showModal = function() {

    document.getElementById('modal').style.display = 'block';
    document.getElementById('black').style.display = 'block';
    y++;
    if(y>=2){
            document.getElementById('modal').style.display = 'none';
            document.getElementById('black').style.display = 'none';
            y=0;
    }
};

window.hideModal = function() {

    document.getElementById('modal').style.display = 'none';   
    document.getElementById('black').style.display = 'none';
    y=0;
};

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