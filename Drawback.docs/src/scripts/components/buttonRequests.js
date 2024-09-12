import { handleDownloadDocument, handleDeleteDocuments, handleUpdateDocument, handleUsePreviousVersion } from "../services/apiRequests.js";
import { alertWarningRedirectDocuments, alertFromRequestAccepted } from "./alerts.js";
import { checkTokenFromUser } from "./checkTokenFromUser.js";
import { documentListFromUser } from "../otherPages/documents.js";

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

export { downloadDocument, deleteDocument, updateDocument, usePreviousVersionDocument };