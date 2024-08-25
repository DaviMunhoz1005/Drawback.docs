import { handleListDocuments, handleSendDocument, getExpiryToken } from "../services/apiRequests.js";

document.getElementById("sendDocument").addEventListener('click', () => {

    addNewDocument();
    hideModal();
});

documentListFromUser();

async function documentListFromUser() {

    let totalFilesFromUser, filesWithValidityOk = 0;
    const blockDocumentList = document.getElementById("separation1");
    const progressionText = document.getElementById("progressionText");

    if(checkTokenFromUser()) {

        try {
        
            const listDocuments = await handleListDocuments();
            
            if(!listDocuments) {
    
                alertFromEmployeeDoesNotLinked();
            }
    
            blockDocumentList.innerHTML = '';
    
            if (listDocuments.length === 0) {
                
                totalFilesFromUser = 0;
                createAddNewFileHtml();
            } else {
                
                totalFilesFromUser = listDocuments.length;
                showFilesFromUserHtml(listDocuments);
            }
        } catch(error) {
    
            console.error('Erro ao carregar documentos:', error);
        }
    }

    function createAddNewFileHtml() {

        const docHtml = document.createElement("div");
        docHtml.className = "square"; 
        docHtml.onclick = showModal;
    
        docHtml.innerHTML = `
            <a class="designLink1">Adicionar</a>
            <button class="add">+</button>
        `;

        blockDocumentList.appendChild(docHtml);

        document.getElementById("wholeArea").style.display = "none";
        progressionText.innerHTML = "Adicione um Documento para começar a acompanhar seu progresso";
        progressionText.style.display = "inline"
    }
    
    function showFilesFromUserHtml(array) {

        array.forEach((documentUser, index) => {

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

            if(new Date(documentUser.validity).getTime() >= Date.now()) {
                
                filesWithValidityOk++;
            }

            if((index + 1) % 4 === 0) {

                const barHtml = `
                    <div class="barDesign"><hr></div>
                    <div class="siteSeparation"></div>
                `;
                blockDocumentList.insertAdjacentHTML('beforeend', barHtml);
            }
        });

        createAddNewFileHtml();

        progressionText.innerHTML = "Progresso";
        progressionText.style.display = "flex"
        progressCircle();
    }

    function progressCircle() {

        document.getElementById("wholeArea").style.display = "";
        let totalAmount, progress, number, size, counter; 
    
        totalAmount = filesWithValidityOk | 0; 
        progress = totalFilesFromUser | 0;
    
        number = document.getElementById("number");
    
        size = (472 / progress);
    
        for (counter = 0; counter < totalAmount; counter++);
            
        number.innerHTML = counter + "/" + progress;
        document.body.style.setProperty('--size', 472 - size * totalAmount);

        updateProgressBar();
    }

    function updateProgressBar(array) {
        
        // const nameDocumentProgressBar = document.getElementById("firstDocument");
        const progressBar = document.getElementById("pb1");
        const valueProgressBar = document.getElementById("firstProgress").value;

        //nameDocumentProgressBar.innerHTML = array[0].name; 

        if(valueProgressBar == 1) {

            progressBar.style.backgroundColor = "#98a5eb";
            document.getElementById("a1").innerHTML = "(1/1)";
        } else {

            progressBar.style.backgroundColor = "#e4e6f2";
            document.getElementById("a1").innerHTML = "(0/1)";
        }
    }
}

function checkTokenFromUser() {

    const expiryTime = getExpiryToken();     

    if(expiryTime == null) {

        alertFromExpiresTokenException();
        return false;
    }

    const currentTimeMillis = Date.now(); 
    const expiryTimeMillis = convertDateTimeToMillis(expiryTime); 
    if (currentTimeMillis > expiryTimeMillis) {

        alertFromExpiresTokenException();
        return false;
    } else {
        
        alertFromTokenAccepted();
        return true;
    }
}

function alertFromExpiresTokenException() {

    Swal.fire({
        title: "Algo deu errado!",
        text: "Faça login para acessar essa página.",
        icon: "warning",
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("/Drawback.docs/src/public/index.html");
            throw new Error("Log in to access this page.");
        }
    });
}

function convertDateTimeToMillis(dateTimeString) {
    
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
}

function alertFromTokenAccepted() {

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
        title: "Sucesso!"
    });
}

function alertFromEmployeeDoesNotLinked() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Ainda não foi permitido o seu vínculo com a Pessoa Jurídica.",
        icon: "warning",
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("/Drawback.docs/src/public/index.html");
            throw new Error("Log in to access this page.");
        }
    });
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