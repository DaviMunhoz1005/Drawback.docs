import { handleListDocuments } from "../services/apiRequests.js";
import { alertWarningRedirectToIndex, alertFromRequestAccepted, alertError } from "../components/alerts.js";
import { progressCircle } from "../components/progressCircle.js";
import { downloadDocument, deleteDocument, updateDocument, usePreviousVersionDocument, addNewDocument, infosUpdate } 
from "../components/buttonRequests.js";
import { checkTokenFromUser } from "../components/checkTokenFromUser.js";

let hasContentMessageAdded = false; 
let pogger = false;
document.getElementById("sendDocument").addEventListener('click', () => {

    addNewDocument();
    hideAddModal();
});

window.onload = function() {
    if (sessionStorage.getItem('documentUpdated')) {
        alertFromRequestAccepted("Documento Atualizado!");
        sessionStorage.removeItem('documentUpdated'); // Remove a chave para evitar múltiplos alertas
    }
};

documentListFromUser();

async function documentListFromUser() {

    checkLocalStorageForAlert();

    let totalFilesFromUser, filesWithValidityOk = 0;
    const blockDocumentList = document.getElementById("separation1");
    const blockDocumentList2 = document.getElementById("separation2");
    const progressionText = document.getElementById("progressionText");

    if(checkTokenFromUser()) {

        try {
        
            const listDocuments = await handleListDocuments();
            
            if(!listDocuments) {
    
                alertWarningRedirectToIndex("Ainda não foi permitido o seu vínculo com a Pessoa Jurídica.");
            }
    
            blockDocumentList.innerHTML = '';
    
            if(listDocuments.length === 0) {
                
                totalFilesFromUser = 0;
                return createAddNewFileHtml();
            }
                
            totalFilesFromUser = listDocuments.length;
            showFilesFromUserHtml(listDocuments);
        } catch(error) {
    
            console.error('Erro ao carregar documentos:', error);
        }
    }

    function createAddNewFileHtml() {

        const docHtml = document.createElement("div");
        docHtml.className = "square2"; 
        docHtml.onclick = showAddModal;
    
        docHtml.innerHTML = `
            <a class="designLink1">Adicionar</a>
            <button class="add">+</button>
        `;

        blockDocumentList.appendChild(docHtml);

        document.getElementById("wholeArea").style.display = "none";
        progressionText.innerHTML = "Adicione um Documento para começar a acompanhar seu progresso";
        progressionText.style.display = "inline"

        document.getElementById("wholeArea2").style.display = "none";
        document.getElementById("barDesign2").style.display = "none";

        
    }
    
    function showFilesFromUserHtml(array) {

        array.forEach((documentUser, index) => {

            const blockDocument = createBlockDocumentHtml(documentUser);
            blockDocumentList.appendChild(blockDocument);

            createSeparationForDocuments(index);

            function showOptModal() {
                document.getElementById("optModal").style.display = "block";
            
                document.querySelector(".buttonDownload").addEventListener('click', function() {
                    downloadDocument(documentUser.name + "." + documentUser.extension);
                });

                document.querySelector(".buttonUseLastVersion").addEventListener('click', async function() {
                    await usePreviousVersionDocument(documentUser.name);
                });              
            }

            blockDocument.querySelectorAll(".buttonDelete").forEach(button => {

                button.addEventListener('click', function() {

                    deleteDocument(documentUser.name);
                });
            });

            blockDocument.querySelectorAll(".optModal").forEach(button => {
                let documentNameDisplay = documentUser.name;
    
                if (documentNameDisplay.length > 24) {
                    documentNameDisplay = documentNameDisplay.slice(0, 21) + "(...)";
                }

                button.addEventListener('click', function() {
                    showOptModal();
                    document.querySelector('#documentNameEdit2').innerHTML = `<b><i>${documentNameDisplay + "." + documentUser.extension}</i></b>`;
                });
            });

            blockDocument.querySelectorAll(".buttonEdit").forEach(button => {

                button.addEventListener('click', function() {

                    showEditModal();

                    document.querySelector('#documentNameEdit').innerHTML = `<b><i>${documentUser.name + "." + documentUser.extension}</i></b>`;

                    document.getElementById('updateDocument').addEventListener('click', async () => {
              
                        const documentFile = document.getElementById("documentFileEdit").files[0];
                        const validity = document.getElementById("expirationDateEdit").value;

                        if(!documentFile || !validity) {

                            alertError("Preencha o Formulário de Edição corretamente para atualizar o Documento.");
                        } else if(documentFile.name !== documentUser.name + "." + documentUser.extension) {

                            alertError("Para Atualizar esse Documento é necessário que o Nome do Documento informado seja o mesmo.");
                        } else {

                            await updateDocument(documentFile, validity);

                            hideEditModal();
                            await documentListFromUser();
                        }
                    });
                });
            });
        


            blockDocument.querySelectorAll(".buttonInfosUpdate").forEach(button => {

                button.addEventListener('click', async function(event) {
                    
                    infosUpdate(event, documentUser);
                });
            });

            if(new Date(documentUser.validity).getTime() >= Date.now()) {
                filesWithValidityOk++;
            }
        });

        createAddNewFileHtml();
        progressCircle(array, totalFilesFromUser, filesWithValidityOk);
    }
    function formatDate(dateString) {
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString; // Retorna a data original se não estiver no formato esperado
    
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
    
        return `${day}/${month}/${year}`; // Retorna a data formatada
    }


    function createBlockDocumentHtml(documentUser, index) {
        const blockDocument = document.createElement("div");
        blockDocument.className = "square collapsed"; // Inicia como colapsado (60px de altura)
        let documentNameDisplay = documentUser.name;
    
        if (documentNameDisplay.length > 24) {
            documentNameDisplay = documentNameDisplay.slice(0, 21) + "...";
        }
    

        blockDocument.innerHTML = `
        <div class="container">  
            <a class="designLink1">
                <button class="buttonDelete">x</button>
                <span class="nom">${documentNameDisplay}</span>
                <i id="icon"></i>
            </a>
            <div class="barDesign13"><hr></div>
            <div class="contentINSANO">
                <div class="contentINSANO2">
                    <div class="opc"> <span class="optModal"><button>Opções</button></span> </div>
                    <div class="notification-container">
                        <span class="not"><button class="buttonInfosUpdate">Informações</button></span>
                        <label class="switch">
                            <input type="checkbox" id="toggleSwitch-${index}" class="toggleSwitch">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
                <div class="validityContainer">
                    <p class="textValidity">&nbsp;Validade:</p>
                    <span class="fieldValidity">${formatDate(documentUser.validity)}</span>
                </div>
            </div>
            <div class="barDesign14"><hr></div>
            <div class="contentJS"></div>
        </div>
    `;

        const toggleSwitch = blockDocument.querySelector(`#toggleSwitch-${index}`);
        toggleSwitch.addEventListener('change', function () {
            if (this.checked) {
                filesWithValidityOk++; // Aumenta o valor quando marcado
            } else {
                filesWithValidityOk--; // Diminui o valor quando desmarcado
            }
            console.log(`Arquivos com validade OK: ${filesWithValidityOk}`);
        });
    

        

        const icon = blockDocument.querySelector('#icon');
        icon.addEventListener('click', function(event) {
            const extraContent = blockDocument.querySelector('.extraContent');
            const extraButtons = blockDocument.querySelector('.extraButtons');
        
            extraContent.style.display = extraContent.style.display === 'none' ? 'block' : 'none';
            
            if (extraContent.style.display === 'block') {
                extraButtons.style.display = 'block';
                blockDocument.classList.toggle('collapsed');


                icon.classList.toggle('rotate-active');
            } else {
                extraButtons.style.display = 'none';
                blockDocument.classList.toggle('collapsed');


                icon.classList.toggle('rotate-active');
            }
        });
        
        const deleteButton = blockDocument.querySelector('.buttonDelete');
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); 
        });
        const contentJS = blockDocument.querySelector('.contentJS');

        contentJS.addEventListener('wheel', function(event) {
            event.preventDefault(); // Evita o comportamento padrão de rolagem

            // Define a quantidade de pixels para rolar
            const delta = event.deltaY * 0.48; // Ajuste o fator (0.5) conforme necessário
            contentJS.scrollBy({
                top: delta,
                behavior: 'smooth'
            });
        });
        
    
        return blockDocument;
    }

   

    function createSeparationForDocuments(index) { 
        let O = index;
    
        if ((index + 1) % 4 === 0) {
            const barHtml = `
                <div class="barDesign"><hr></div>
                <div class="siteSeparation"></div>
            `;
            blockDocumentList.insertAdjacentHTML('beforeend', barHtml);
            pogger = true; 
        } else {
            pogger = false; 
        }
    
        if (O < 4 && !hasContentMessageAdded) {
            while (!pogger) { // Enquanto pogger for false vapo reseba borabil
                const a = `
                    <span class="bara">
                        <div class="barDesign"><hr></div>
                        <div class="siteSeparation" id="pognog">Adicione mais documentos</div>
                    </span>
                `;
                blockDocumentList2.insertAdjacentHTML('beforeend', a);
                hasContentMessageAdded = true; 
                break; 
            }
        }
        while (pogger) {
            const messageElement = document.getElementById("pognog");
            const messageElement2 = document.getElementById("separation2");
            if (messageElement) {
                messageElement.parentElement.remove(); 
            }
            hasContentMessageAdded = false; 
            break; 
        }
    }
    
}




function checkLocalStorageForAlert() {

    if(sessionStorage.getItem('loginSuccess')) {

        alertFromRequestAccepted("Usuário Logado com Sucesso!");
        sessionStorage.removeItem('loginSuccess'); 
    } else if(sessionStorage.getItem('registerSuccess')) {

        alertFromRequestAccepted("Usuário Cadastrado com Sucesso!");
        sessionStorage.removeItem('registerSuccess'); 
    }
}

let y = 0;

window.showAddModal = function() {

    document.getElementById('addModal').style.display = 'block';
    document.getElementById('black').style.display = 'block';
    y++;
    if(y>=2){
            document.getElementById('addModal').style.display = 'none';
            document.getElementById('black').style.display = 'none';
            y=0;
    }
};

window.hideAddModal = function() {

    document.getElementById('addModal').style.display = 'none';   
    document.getElementById('black').style.display = 'none';
    y=0;
};

let z = 0;
let k = 0;

window.showEditModal = function() {

    document.getElementById('editModal').style.display = 'block';
    document.getElementById('black').style.display = 'block';
    document.getElementById('optModal').style.display = 'none';
    document.getElementById('black').style.display = 'none';
    k=0;
    z++;
    if(z>=2){
            document.getElementById('editModal').style.display = 'none';
            document.getElementById('black').style.display = 'none';
            z=0;
    }
};

window.hideEditModal = function() {

    document.getElementById('editModal').style.display = 'none';  
    document.getElementById('black').style.display = 'none';
    z=0;
};

window.showOptModal = function() {

    document.getElementById('optModal').style.display = 'block';
    document.getElementById('black').style.display = 'block';
    k++;
    if(k>=2){
            document.getElementById('optModal').style.display = 'none';
            document.getElementById('black').style.display = 'none';
            k=0;
    }
};

window.hideOptModal = function() {

    document.getElementById('optModal').style.display = 'none';  
    document.getElementById('black').style.display = 'none';
    k=0;
};


export { documentListFromUser };