import { 
    handleDownloadDocument, handleDeleteDocuments, handleUpdateDocument, handleUsePreviousVersion, handleSendDocument, handleListDocuments, handleListUpdateInfos 
} 
from "../services/apiRequests.js";
import { alertWarningRedirectDocuments, alertFromRequestAccepted } from "./alerts.js";
import { checkTokenFromUser } from "./checkTokenFromUser.js";
import { documentListFromUser } from "../otherPages/documents.js";
import { openCloseOffCanvas } from "./offCanvas.js";

async function downloadDocument(documentNameWithExtension) {
        
    checkTokenFromUser();
    await handleDownloadDocument(documentNameWithExtension);
}

async function deleteDocument(documentName) {
    
    checkTokenFromUser();
    Swal.fire({
        title: "Tem Certeza?",
        text: "O documento será excluído permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar', 
        customClass: {
            cancelButton: 'swal2-cancel-button-red' 
        }
    }).then(async (result) => {
        if(result.isConfirmed) {
            
            if(await handleDeleteDocuments(documentName)) {

                await documentListFromUser(); 
                return alertFromRequestAccepted("Documento Excluído!");
            } 

            alertWarningRedirectDocuments("Você não tem permissão para essa ação.");
        } 
    });
}

async function updateDocument(documentFile, validity) {

    checkTokenFromUser();

    try {

        if(await handleUpdateDocument(documentFile, validity)) {

            sessionStorage.setItem('documentUpdated', 'true');
            window.location.reload();
            return; 
        } 

        alertWarningRedirectDocuments("Você não tem permissão para essa ação.");
    } catch(error) {

        console.error('Erro ao atualizar o documento ', error);
    }
}    

async function usePreviousVersionDocument(documentName) {
    
    checkTokenFromUser();
    Swal.fire({
        title: "Tem Certeza?",
        text: "O documento atual será sobrescrito pela versão anterior.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar', 
        customClass: {
            cancelButton: 'swal2-cancel-button-red' 
        }
    }).then(async (result) => {
        if(result.isConfirmed) {
            
            const statusCodeRequest = await handleUsePreviousVersion(documentName)
            if(statusCodeRequest == 403) {

                alertWarningRedirectDocuments("Você não tem a permissão necessária para essa ação.");
            } else if(statusCodeRequest == 400){

                alertWarningRedirectDocuments("Essa é a primeira versão do Documento.");
            } else {

                await documentListFromUser();
                alertFromRequestAccepted("Backup Concluído!");
            }
        } 
    });
}

async function addNewDocument() {
    
    try {
        checkTokenFromUser();
        const documentFile = document.getElementById("documentFile").files[0];
        const validity = document.getElementById("expirationDate").value;

        const documentList = await handleListDocuments();
        
        if(!documentFile || !validity) {

            return alertError("Preencha o Formulário de Adição corretamente para adicionar o Documento.");
        }

        for(const document of documentList) {
            
            if(documentFile.name === `${document.name}.${document.extension}`) {
    
                alertError("Não é possível adicionar dois Documentos com o mesmo nome.");
                return;
            }
        }
    
        const documentAddSuccess = await handleSendDocument(documentFile, validity);
    
        if(!documentAddSuccess) {
    
            alertError("Não é permitido que o nome do documento possua \".\" além da própria extensão.");
    
            setTimeout(() => {
                documentListFromUser();
            }, 6000);

            return;
        }
    
        documentListFromUser();
    } catch(error) {

        console.error('Erro ao adicionar um novo documento:', error);
    }
}

async function infosUpdate(event, documentUser) {
    
    checkTokenFromUser();

    openCloseOffCanvas(event);

    document.getElementById("titleOffCanvas").textContent = "Infos. Atualizações"; 
    const divOffCanvas = document.querySelector(".contentDocuments");
    divOffCanvas.innerHTML = "";

    const listInfosUpdates = await handleListUpdateInfos(documentUser.name);
                    const documentName = documentUser.name.length > 24 ? documentUser.name.slice(0, 21) + "..." : documentUser.name;

    divOffCanvas.innerHTML = `
        <h3>${documentName}</h3>
    `;

    for(let json of listInfosUpdates) {

        const divInfosUpdate = document.createElement('div');

        divInfosUpdate.innerHTML = `
            <div>
                <br>
                <p><span id="textInfoUpdate"><i><b>Versão:</b></i></span> ${json.version}</p>
                <p><span id="textInfoUpdate"><i><b>Data de Criação:</b></i></span> ${json.creation}</p>
                <p>${json.updated == null ? "" : `
                    <span id="textInfoUpdate"><i><b>Data de Atualização:</b></i></span> ${json.updated}
                    `}</p>
            </div>
        `;

        divOffCanvas.appendChild(divInfosUpdate);
    }   
}

export { downloadDocument, deleteDocument, updateDocument, usePreviousVersionDocument, addNewDocument, infosUpdate };