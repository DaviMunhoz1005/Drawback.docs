import { handleListDocuments } from "../services/apiRequests.js";
import { alertWarningRedirectToIndex, alertFromRequestAccepted, alertError } from "../components/alerts.js";
import { progressCircle } from "../components/progressCircle.js";
import { downloadDocument, deleteDocument, updateDocument, usePreviousVersionDocument, addNewDocument, infosUpdate } 
from "../components/buttonRequests.js";
import { checkTokenFromUser } from "../components/checkTokenFromUser.js";

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
        docHtml.className = "square"; 
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

            blockDocument.querySelectorAll(".buttonDownload").forEach(button => {

                button.addEventListener('click', function() {

                    downloadDocument(documentUser.name + "." + documentUser.extension);
                });
            });
        
            blockDocument.querySelectorAll(".buttonDelete").forEach(button => {

                button.addEventListener('click', function() {

                    deleteDocument(documentUser.name);
                });
            });
        
            blockDocument.querySelectorAll(".buttonEdit").forEach(button => {

                button.addEventListener('click', function() {

                    showEditModal();

                    document.querySelector('#documentNameEdit').innerHTML = `<b><i>${documentUser.name + "." + documentUser.extension}</i></b>`;

                    document.getElementById('updateDocument').addEventListener('click', async () => {
                        const documentName = document.getElementById("documentName").value;
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
        
            blockDocument.querySelectorAll(".buttonUseLastVersion").forEach(button => {

                button.addEventListener('click', async function() {

                    await usePreviousVersionDocument(documentUser.name);
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

    function createBlockDocumentHtml(documentUser) {
        
        const blockDocument = document.createElement("div");
        blockDocument.className = "square";
        let documentNameDisplay = documentUser.name;
    
        if(documentNameDisplay.length > 24) {

            documentNameDisplay = documentNameDisplay.slice(0, 21) + "...";
        }

        blockDocument.innerHTML = `
            <a class="designLink1">${documentNameDisplay}</a>
            <p class="textValidity">Validade <p class="fieldValidity">${documentUser.validity}</p></p>
            <br>
            <button>
                <svg class="buttonDownload" width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button>
                <svg class="buttonDelete" width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button>
                <svg class="buttonEdit" width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"/>
                </svg>
            </button>
            <button>
                <svg class="buttonUseLastVersion" width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#000000" fill-rule="evenodd" d="M20 10a1 1 0 0 1-1 1h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 1 1zM7 14.019zm5 2.001a1 1 0 0 1-1 1 1.021 1.021 0 0 1-.79-.38l-.04-.06A6.177 6.177 0 0 0 7 14.15 3.663 3.663 0 0 0 6 14v1.02a.976.976 0 0 1-.55.87 1 1 0 0 1-1.05-.09l-4-3a1 1 0 0 1 0-1.6l4-3a.99.99 0 0 1 1.05-.09.988.988 0 0 1 .55.87V10c2.15 0 5.91 3.1 6 6.02zM20 14a1 1 0 0 1-1 1h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 1 1zm0-12a1 1 0 0 1-1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1z"/> <path fill="#000000" fill-rule="evenodd" d="M24 2v20a2.006 2.006 0 0 1-2 2H8a2.006 2.006 0 0 1-2-2v-3a1 1 0 0 1 2 0v2.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-19a.487.487 0 0 0-.49-.5H8.5a.5.5 0 0 0-.5.5V5a1 1 0 0 1-2 0V2a2.006 2.006 0 0 1 2-2h14a2.006 2.006 0 0 1 2 2z"/>
                </svg>
            </button>
            <button>
                <svg class="buttonInfosUpdate" width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="info-square"> <g> <rect data-name="--Rectangle" fill="none" height="20" id="_--Rectangle" rx="2" ry="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="20" x="2" y="2"/> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="12" y2="16"/> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="8"/> </g> </g> </g> </g>
                </svg>
            </button>
        `;

        return blockDocument;
    }

    function createSeparationForDocuments(index) {
        
        if((index + 1) % 4 === 0) {

            const barHtml = `
                <div class="barDesign"><hr></div>
                <div class="siteSeparation"></div>
            `;
            blockDocumentList.insertAdjacentHTML('beforeend', barHtml);
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

window.showEditModal = function() {

    document.getElementById('editModal').style.display = 'block';
    document.getElementById('black').style.display = 'block';
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

export { documentListFromUser };