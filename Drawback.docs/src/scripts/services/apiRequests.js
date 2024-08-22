const url = 'http://localhost:8080';


// USERS


async function handleFindUser(username) {

    const response = await findUser(username);
    return response;
}

async function findUser(username) {
    
    let result;
    const response = await fetch(`${url}/user/findUser?username=${username}`);
    
    if(response.ok) {
        
        const responseText = await response.text();

        if(!responseText) { 

            result = false;
        } else {

            const responseJson = JSON.parse(responseText);
            result = responseJson.length !== 0;
        }
    } else {

        await handleApiResponse(response);
    }

    return result;
}

async function handleFindByCnpjCpf(cnpjCpf) {

    const response = await findByCnpjCpf(cnpjCpf);
    return response;
}

async function findByCnpjCpf(cnpjCpf) {
    
    let result;
    const response = await fetch(`${url}/user/findCnpjCpf?cnpjCpf=${cnpjCpf}`)

    if(response.ok) {
        
        const responseText = await response.text();

        if(!responseText) { 

            result = false;
        } else {

            const responseJson = JSON.parse(responseText);
            result = responseJson.length !== 0;
        }
    } else {
        
        await handleApiResponse(response);
    }

    return result;
}

async function handleFindByCnae(cnae) {
    
    const response = await findByCnae(cnae);
    return response;
}

async function findByCnae(cnae) {
    
    let result;
    const response = await fetch(`${url}/user/findCnae?cnae=${cnae}`)

    if(response.ok) {
        
        const responseText = await response.text();

        if(!responseText) { 

            result = false;
        } else {

            const responseJson = JSON.parse(responseText);
            result = responseJson.length !== 0;
        }
    } else {
        
        await handleApiResponse(response);
    }

    return result;
}

async function handlelFindByNameCorporateReason(nameCorporateReason) {
    
    const response = await findByNameCorporateReason(nameCorporateReason);
    return response;
}

async function findByNameCorporateReason(nameCorporateReason) {
    
    let result;
    const response = await fetch(`${url}/user/findNameCorporateReason?nameCorporateReason=${nameCorporateReason}`)

    if(response.ok) {
        
        const responseText = await response.text();

        if(!responseText) { 

            result = false;
        } else {

            const responseJson = JSON.parse(responseText);
            result = responseJson.length !== 0;
        }
    } else {
        
        await handleApiResponse(response);
    }

    return result;
}

async function handleCreateAccountAndToken(data) {

    const response = await createUser(data);
    const dataForToken = getUsernameAndPassword(data);
    await handleTakeUserToken(dataForToken);
    return response;
}

async function createUser(data) {

    let result;
    const response = await fetch(`${url}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if(response.ok) {

        result = true;
    } else {

        result = false;
    }

    return result;
}

function getUsernameAndPassword(data) {

    return JSON.stringify({
        username: data.username,
        password: data.password
    });
}

async function handleTakeUserToken(data) {

    try {

        const token = await takeUserToken(data);
        localStorage.setItem("authToken", JSON.stringify(token));
    } catch(error) {

        console.error("Erro ao criar token de acesso:", error.message);
    }
}

async function takeUserToken(data) {

    try {

        const response = await fetch(`${url}/user/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: data
        });

        if(response.ok) {

            return await response.json();
        } else {

            handleApiResponse(response);
        }
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleTakeUserTokenButton(data) {

    try {

        const dataForToken = getUsernameAndPassword(data);
        await handleTakeUserToken(dataForToken);
    } catch(error) {

        console.error("Erro ao processar a requisição:", error.message);
    }
}

function getToken() {

    const tokenString = localStorage.getItem("authToken");
    
    if(tokenString) {

        const tokenObject = JSON.parse(tokenString);
        return tokenObject.accessToken;
    }
    return null; 
}

function getExpiryToken() {

    const tokenString = localStorage.getItem("authToken");
    
    if(tokenString) {

        const tokenObject = JSON.parse(tokenString);
        return tokenObject.expiresIn;
    }
    return null; 
}

async function handleDeleteUser() {

    try {

        const userDeleted = await deleteUser();
        console.log(userDeleted);
    } catch(error) {

        console.error("Erro ao deletar usuário:", error.message);
    }
}

async function deleteUser() {

    try {

        const token = getToken();
        const response = await fetch(`${url}/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        handleApiResponse(response);

        return await response.json();
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleListOfUsersToLink() {

    try {

        const listEmployees = await listOfUsersToLink();
        console.log(listEmployees);
    } catch(error) {

        console.error("Erro ao listar usuários que querem se vincular:", error.message);
    }
}

async function listOfUsersToLink() {

    try {
        
        const token = getToken();
        const response = await fetch(`${url}/user/allowUserLink`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        handleApiResponse(response);

        return await response.json();
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleAllowEmployee() {
    
    try {

        const usernameEmployee = document.getElementById("employeeName").value;        
        const employee = await allowEmployee(usernameEmployee);
        console.log(employee);
    } catch(error) {
        
        console.error("Erro ao permitir funcionário para vínculo:", error.message);
    }
}

async function allowEmployee(username) {
    
    try {

        const token = getToken();
        const response = await fetch(`${url}/user/allowUserLink?usernameToAllowLinking=${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        handleApiResponse(response);

        return await response.json();
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}


// DOCUMENT


async function handleListDocuments() {
    
    try {
        
        const documentList = await listDocuments();
        return documentList;
    } catch(error) {

        console.error("Erro ao listar documentos do usuário:", error.message);
    }
}

async function listDocuments() {
    
    try {
        
        const token = getToken();
        const response = await fetch(`${url}/document/find`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok) {

            return await response.json();
        } else {

            handleApiResponse(response);
        } 
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleListDocumentsByName() {
    
    try {
        
        const documentName = document.getElementById("nameDocument").value; 
        const documentListByName = await listDocumentsByName(documentName);
        
        console.log(documentListByName);
    } catch(error) {

        console.error("Erro ao listar documentos por nome do usuário:", error.message);
    }
}

async function listDocumentsByName(documentName) {
    
    try {
        
        const token = getToken();
        const response = await fetch(`${url}/document/findName?documentName=${documentName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        handleApiResponse(response);

        return await response.json();
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleSendDocument(userDocument, validity) {

    try {

        const validityDocument = {
            validity: getFormattedDate(validity)
        };

        const documentSaved = await sendDocument(userDocument, validityDocument);
        console.log(documentSaved);
    } catch(error) {

        console.error("Erro ao enviar um documento:", error.message);
    }
}

async function sendDocument(userDocument, validityDocument) {

    try {

        const token = getToken();
        const formData = new FormData();

        formData.append('document', userDocument);
        formData.append('documentRequest', new Blob(
            [JSON.stringify(validityDocument)], 
            { type: 'application/json' })
        );

        const response = await fetch(`${url}/document/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: formData
        });
        
        handleApiResponse(response);

        return await response.json();
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleUpdateDocument() {

    try {

        const userDocumentUpload = document.getElementById("userDocumentUpload").files[0]; 

        const validityDocument = {
            validity: getFormattedDate("validityUpload")
        };
        
        const documentUploaded = await updateDocument(userDocumentUpload, validityDocument);
        console.log(documentUploaded);
    } catch(error) {

        console.error("Erro ao atualizar documento:", error.message);
    }
}

async function updateDocument(userDocument, validityDocument) {

    try {

        const token = getToken();
        const formData = new FormData();

        formData.append('document', userDocument);
        formData.append('documentRequest', new Blob(
            [JSON.stringify(validityDocument)], 
            { type: 'application/json' })
        );

        const response = await fetch(`${url}/document/upload`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: formData
        });
        
        handleApiResponse(response);

        return await response.json();
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

function getFormattedDate(dateInput) {

    const dateObject = new Date(dateInput);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
    const day = String(dateObject.getDate()).padStart(2, '0'); 

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

async function handleUsePreviousVersion() {
    
    try {
        
        const documentName = document.getElementById("nameDocumentPreviousVersion").value;

        await usePreviousVersion(documentName);
        console.log("Funcionou");
    } catch(error) {

        console.error("Erro ao pegar versão anterior do documento:", error.message);
    }
}

async function usePreviousVersion(documentName) {
    
    try {
        
        const token = getToken();
        const response = await fetch(`${url}/document/previousVersion?documentName=${documentName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        handleApiResponse(response);
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleDeleteDocuments() {
    
    try {
        
        const documentName = document.getElementById("nameDocumentToDelete").value; 
        await deleteDocuments(documentName);
        console.log("Funcionou");
    } catch(error) {

        console.error("Erro ao deletar documento:", error.message);
    }
}

async function deleteDocuments(documentName) {
    
    try {
        
        const token = getToken();
        const response = await fetch(`${url}/document?documentName=${documentName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        handleApiResponse(response);
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}

async function handleDownloadDocument() {

    try {

        const documentName = document.getElementById("nameDocumentDownload").value; 
        await downloadDocument(documentName);
    } catch(error) {

        console.error("Erro ao Baixar documento:", error.message);
    }
}

async function downloadDocument(documentName) {

    try {

        const token = getToken();
        const response = await fetch(`${url}/document/download/${documentName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        handleApiResponse(response);

        if (!response.ok) {

            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const blob = await response.blob(); 
        const blobUrl = window.URL.createObjectURL(blob); 

        const link = document.createElement('a');
        link.href = blobUrl; 
        link.download = documentName; 
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link); 

        window.URL.revokeObjectURL(blobUrl); 
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
        throw error;
    }
}


// CHECK RESPONSE API


async function handleApiResponse(response) {

    const errorData = await response.json();
    console.log(`${errorData.status} - ${errorData.title} - ${errorData.cause}`);
    return errorData;
}


// TAKE TOKEN STORAGE IN THE 

export { 
    handleFindUser, handleFindByCnpjCpf, handleFindByCnae, handlelFindByNameCorporateReason, handleCreateAccountAndToken, handleTakeUserTokenButton, handleDeleteUser, handleListOfUsersToLink, handleAllowEmployee, handleListDocuments, handleListDocumentsByName, handleSendDocument, handleUpdateDocument, handleUsePreviousVersion, handleDeleteDocuments, handleDownloadDocument, getToken, getExpiryToken
};