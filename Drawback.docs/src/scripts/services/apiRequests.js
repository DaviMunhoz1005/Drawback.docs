const url = 'http://localhost:8080';


// USERS


async function handleFindUser(username) {

    return await findUser(username);
}

async function findUser(username) {
    
    let userExists;
    const response = await fetch(`${url}/user/findUser?username=${username}`);
    
    if(response.ok) {
        
        const responseText = await response.text();

        if(responseText) { 

            
            const responseJson = JSON.parse(responseText);
            userExists = responseJson.length !== 0;
        } else {

            userExists = false;
        }
    } else {

        await handleApiResponse(response);
    }

    return userExists;
}

async function handleFindByCnpjCpf(cnpjCpf) {

    return await findByCnpjCpf(cnpjCpf);
}

async function findByCnpjCpf(cnpjCpf) {
    
    let cnpjCpfExists;
    const response = await fetch(`${url}/user/findCnpjCpf?cnpjCpf=${cnpjCpf}`)

    if(response.ok) {
        
        const responseText = await response.text();

        if(responseText) { 

            const responseJson = JSON.parse(responseText);
            cnpjCpfExists = responseJson.length !== 0;
        } else {

            cnpjCpfExists = false;
        }
    } else {
        
        await handleApiResponse(response);
    }

    return cnpjCpfExists;
}

async function handleFindByCnae(cnae) {
    
    return await findByCnae(cnae);
}

async function findByCnae(cnae) {
    
    let cnaeExists;
    const response = await fetch(`${url}/user/findCnae?cnae=${cnae}`)

    if(response.ok) {
        
        const responseText = await response.text();

        if(responseText) { 

            const responseJson = JSON.parse(responseText);
            cnaeExists = responseJson.length !== 0;
        } else {

            cnaeExists = false;
        }
    } else {
        
        await handleApiResponse(response);
    }

    return cnaeExists;
}

async function handlelFindByNameCorporateReason(nameCorporateReason) {
    
    return await findByNameCorporateReason(nameCorporateReason);
}

async function findByNameCorporateReason(nameCorporateReason) {
    
    let nameCorporateReasonExists;
    const response = await fetch(`${url}/user/findNameCorporateReason?nameCorporateReason=${nameCorporateReason}`)

    if(response.ok) {
        
        const responseText = await response.text();

        if(responseText) { 

            const responseJson = JSON.parse(responseText);
            nameCorporateReasonExists = responseJson.length !== 0;
        } else {

            nameCorporateReasonExists = false;
        }
    } else {
        
        await handleApiResponse(response);
    }

    return nameCorporateReasonExists;
}

async function handleCreateAccountAndToken(data) {

    const userCreated = await createUser(data);
    await handleTakeUserToken(getUsernameAndPassword(data));
    return userCreated;
}

async function createUser(data) {

    let userCreated;
    const response = await fetch(`${url}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if(response.ok) {

        userCreated = true;
    } else {

        userCreated = false;
        await handleApiResponse(response);
    }

    return userCreated;
}

function getUsernameAndPassword(data) {

    return JSON.stringify({
        username: data.username,
        password: data.password
    });
}

async function handleTakeUserToken(data) {

    try {

        const tokenExists = false;
        const token = await takeUserToken(data);
        if(token) {

            localStorage.setItem("authToken", JSON.stringify(token));
            return !tokenExists;
        }
        
        return tokenExists;
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

            const responseText = await response.text();

            if(responseText) { 

                const responseJson = JSON.parse(responseText);
                return responseJson;
            }

            return false;
        } else {

            await handleApiResponse(response);
        }
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
    }
}

async function handleTakeUserTokenButton(data) {

    try {

        const tokenExists = await handleTakeUserToken(getUsernameAndPassword(data));
        return tokenExists;
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
    } catch(error) {

        console.error("Erro ao deletar usuário:", error.message);
    }
}

async function deleteUser() {

    try {

        const response = await fetch(`${url}/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(response.ok) {

            return await response.json();
        } else {

            await handleApiResponse(response);
        }
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
    }
}

async function handleListOfUsersToLink() {

    try {

        const listEmployees = await listOfUsersToLink();
        return listEmployees;
    } catch(error) {

        console.error("Erro ao listar usuários que querem se vincular:", error.message);
    }
}

async function listOfUsersToLink() {

    try {
        
        const response = await fetch(`${url}/user/allowUserLink`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(response.ok) {

            return await response.json();
        } else {

            await handleApiResponse(response);
            return false;
        }
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
    }
}

async function handleAllowEmployee(username) {
    
    try {
    
        return await allowEmployee(username);
    } catch(error) {
        
        console.error("Erro ao permitir funcionário para vínculo:", error.message);
    }
}

async function allowEmployee(username) {
    
    try {

        const response = await fetch(`${url}/user/allowUserLink?usernameToAllowLinking=${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        
        if(response.ok) {

            return true;
        } else {

            await handleApiResponse(response);
            return false;
        }        
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
    }
}


// DOCUMENT


async function handleListDocuments() {
    
    try {
        
        return await listDocuments();
    } catch(error) {

        console.error("Erro ao listar documentos do usuário:", error.message);
    }
}

async function listDocuments() {
    
    try {
        
        let isNotEmployee;
        const response = await fetch(`${url}/document/find`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(response.ok) {

            return await response.json();
        } else {

            isNotEmployee = await handleApiResponse(response);
            return isNotEmployee;
        } 
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
    }
}

async function handleListDocumentsByName() {
    
    try {
        
        const documentListByName = await listDocumentsByName(document.getElementById("nameDocument").value);
        console.log(documentListByName);
    } catch(error) {

        console.error("Erro ao listar documentos por nome do usuário:", error.message);
    }
}

async function listDocumentsByName(documentName) {
    
    try {
        
        const response = await fetch(`${url}/document/findName?documentName=${documentName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(response.ok) {

            return await response.json();
        } else {

            await handleApiResponse(response);
        } 
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
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

        const formData = new FormData();

        formData.append('document', userDocument);
        formData.append('documentRequest', new Blob(
            [JSON.stringify(validityDocument)], 
            { type: 'application/json' })
        );

        const response = await fetch(`${url}/document/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}` 
            },
            body: formData
        });
        
        if(response.ok) {

            return await response.json();
        } else {

            await handleApiResponse(response);
        } 
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
    }
}

async function handleUpdateDocument() {

    try {

        const validityDocument = {
            validity: getFormattedDate("validityUpload")
        };
        
        const documentUploaded = await updateDocument(document.getElementById("userDocumentUpload").files[0], validityDocument);
        console.log(documentUploaded);
    } catch(error) {

        console.error("Erro ao atualizar documento:", error.message);
    }
}

async function updateDocument(userDocument, validityDocument) {

    try {

        const formData = new FormData();

        formData.append('document', userDocument);
        formData.append('documentRequest', new Blob(
            [JSON.stringify(validityDocument)], 
            { type: 'application/json' })
        );

        const response = await fetch(`${url}/document/upload`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}` 
            },
            body: formData
        });
        
        if(response.ok) {

            return await response.json();
        } else {

            await handleApiResponse(response);
        } 
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
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

        await usePreviousVersion(document.getElementById("nameDocumentPreviousVersion").value);
        console.log("Funcionou");
    } catch(error) {

        console.error("Erro ao pegar versão anterior do documento:", error.message);
    }
}

async function usePreviousVersion(documentName) {
    
    try {
        
        const response = await fetch(`${url}/document/previousVersion?documentName=${documentName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(!response.ok) {

            await handleApiResponse(response);
        }
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
    }
}

async function handleDeleteDocuments() {
    
    try {
        
        await deleteDocuments(document.getElementById("nameDocumentToDelete").value);
        console.log("Funcionou");
    } catch(error) {

        console.error("Erro ao deletar documento:", error.message);
    }
}

async function deleteDocuments(documentName) {
    
    try {
        
        const response = await fetch(`${url}/document?documentName=${documentName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(response.ok) {

            await handleApiResponse(response);
        }
    } catch(error) {
        
        console.error("Erro ao realizar a requisição:", error.message);
    }
}

async function handleDownloadDocument() {

    try {

        await downloadDocument(document.getElementById("nameDocumentDownload").value);
    } catch(error) {

        console.error("Erro ao Baixar documento:", error.message);
    }
}

async function downloadDocument(documentName) {

    try {

        const response = await fetch(`${url}/document/download/${documentName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        await handleApiResponse(response);

        if (response.ok) {

            const blob = await response.blob(); 
            const blobUrl = window.URL.createObjectURL(blob); 

            const link = document.createElement('a');
            link.href = blobUrl; 
            link.download = documentName; 
            document.body.appendChild(link);
            link.click(); 
            document.body.removeChild(link); 

            window.URL.revokeObjectURL(blobUrl); 
        } else {

            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
    } catch(error) {

        console.error("Erro ao realizar a requisição:", error.message);
    }
}


// CHECK RESPONSE API


async function handleApiResponse(response) {

    const errorData = await response.json();
    console.log(`${errorData.statusCode} - ${errorData.title} - ${errorData.cause}`);
    return errorData.statusCode != 400;
}

export { 
    handleFindUser, handleFindByCnpjCpf, handleFindByCnae, handlelFindByNameCorporateReason, handleCreateAccountAndToken, handleTakeUserTokenButton, handleDeleteUser, handleListOfUsersToLink, handleAllowEmployee, handleListDocuments, handleListDocumentsByName, handleSendDocument, handleUpdateDocument, handleUsePreviousVersion, handleDeleteDocuments, handleDownloadDocument, getToken, getExpiryToken
};