import { handleListDocuments, handleListDocumentsByName, handleSendDocument, handleUpdateDocument, handleUsePreviousVersion, handleDeleteDocuments, getToken } from "./../services/apiRequests.js";

async function documentListFromUser() {

    try {
        
        const listDocuments = await handleListDocuments();
        const blockDocumentList = document.getElementById("separation1");

        blockDocumentList.innerHTML = '';

        if (listDocuments.length === 0) {
            
            const docHtml = document.createElement("div");
            docHtml.className = "square"; 
            docHtml.onclick = showModal;

            docHtml.innerHTML = `
                <a class="designLink1">Adicionar</a>
                <button class="add" >+</button></div>
            `;

            blockDocumentList.appendChild(docHtml);
        } else {
            
            listDocuments.forEach(documentUser => {

                const docHtml = document.createElement("div");

                docHtml.innerHTML = `
                    <h3>${documentUser.name} (${documentUser.extension})</h3>
                    <p>Criação: ${documentUser.creation}</p>
                    <button class="downloadDocument" data-url="${documentUser.url}">Baixar</button>
                    <button class="deleteDocument" data-id="${documentUser.id}">Excluir</button>
                    <button class="editDocument" data-id="${documentUser.id}">Editar</button>
                `;

                blockDocumentList.appendChild(docHtml);
            });

            const docHtml = document.createElement("div");
            docHtml.className = "square"; 
            docHtml.onclick = showModal;

            docHtml.innerHTML = `
                <a class="designLink1">Adicionar</a>
                <button class="add" >+</button></div>
            `;

            blockDocumentList.appendChild(docHtml);
        }
    } catch(error) {

        console.error('Erro ao carregar documentos:', error);
    }
}

documentListFromUser();

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




/*

// Não sei se você vai salvar assim mas ta aí
function saveDocument() {
    var fileInput = document.getElementById('documentFile');
    var dateInput = document.getElementById('expirationDate');

    var file = fileInput.files[0]; 
    var expirationDate = dateInput.value; validade

    if (file && expirationDate) {
        // Forma de processar o arquivo e a data caso necessário
        console.log('Arquivo selecionado:', file.name);
        console.log('Data de validade:', expirationDate);
        alert('Documento salvo com sucesso!');
        hideModal();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        hideModal();
    }
}*/


