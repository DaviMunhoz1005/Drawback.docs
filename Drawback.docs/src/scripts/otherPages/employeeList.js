import { handleListOfUsersToLink, handleAllowEmployee, handleDeleteUser, getExpiryToken } from "../services/apiRequests.js";

employeeList();

async function employeeList() {

    checkTokenFromUser();
    const bodyCentralHtml = document.getElementById("content");
    const textTitle = document.getElementById("textTitle");

    try {

        const listEmployee = await handleListOfUsersToLink();

        if(!listEmployee) {

            alertFromAccountTypeEmployee();
        } else {

            if(listEmployee.length === 0) {

                textTitle.innerHTML = "Não existe usuários que querem se vincular a Você";
            } else {
    
                listEmployee.forEach(employee => {
    
                    createInfosHtml(employee);
                });
            }
        }
    } catch(error) {

        console.error("Erro ao listar funcionários " + error);
    }

    function createInfosHtml(employee) {

        textTitle.innerHTML = "Funcionários que querem se vincular a Você";

        const barHtmlBefore = createBarDesignHtml();
        const barHtmlAfter = createBarDesignHtml();
        const employeeHtml = createEmployeeHtml(employee);
    
        bodyCentralHtml.appendChild(barHtmlBefore);
        bodyCentralHtml.appendChild(employeeHtml);
        bodyCentralHtml.appendChild(barHtmlAfter);

        document.querySelectorAll('.accept, .reject').forEach(button => {
            button.addEventListener('click', async function() {

                const action = button.classList.contains('accept') ? allowEmployee : denyEmployee;
                await action(button.value);
            });
        });
    }

    function createBarDesignHtml() {

        const barHtml = document.createElement("div");
        barHtml.className = "barDesign";
        barHtml.innerHTML = `<hr>`;

        return barHtml;
    }

    function createEmployeeHtml(employee) {
        
        const employeeHtml = document.createElement("div");
        employeeHtml.className = "validate"; 
    
        employeeHtml.innerHTML = `
            <div class="infos">
                <p class="name">${employee.username}</p>
                <p class="email">${employee.email}</p>
            </div>
            <div class="buttons">
                <button class="accept" value="${employee.username}">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 7L9 17.5L5 13.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> 
                    </svg>
                </button>
                <button class="reject" value="${employee.username}">
                    <svg viewBox="0 -0.5 17 17" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.016,0.06 C4.616,0.06 1.047,3.629 1.047,8.029 C1.047,12.429 4.615,15.998 9.016,15.998 C13.418,15.998 16.985,12.429 16.985,8.029 C16.985,3.629 13.418,0.06 9.016,0.06 L9.016,0.06 Z M3.049,8.028 C3.049,4.739 5.726,2.062 9.016,2.062 C10.37,2.062 11.616,2.52 12.618,3.283 L4.271,11.631 C3.508,10.629 3.049,9.381 3.049,8.028 L3.049,8.028 Z M9.016,13.994 C7.731,13.994 6.544,13.583 5.569,12.889 L13.878,4.58 C14.571,5.555 14.982,6.743 14.982,8.028 C14.981,11.317 12.306,13.994 9.016,13.994 L9.016,13.994 Z" class="icon-path"></path>
                    </svg>
                </button>
            </div>
                `;
        
        return employeeHtml;
    }

    async function allowEmployee(username) {

        try {
            
            const employeeAllowed = await handleAllowEmployee(username);

            if(employeeAllowed) {

                alertFromEmployeeAllowed(username);
                employeeList();
            } else {

                alertFromSystemError();
            }
        } catch(error) {
            
            console.error("Erro ao permitir usuário " + error);
        }
    }

    async function denyEmployee(username) {
        
        try {
            
            // const employeeDeleted = await handleDeleteUser(username);

            if(true) {

                alertFromEmployeeDeny();
            } else {

                alertFromSystemError();
            }
        } catch(error) {
            
            console.error("Erro ao proibir usuário " + error);
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

function alertFromAccountTypeEmployee() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Sua conta é do tipo Funcionário, você não tem acesso a essa página.",
        icon: "error",
        confirmButtonText: 'Ok'
    }).then((result) => {
        if(result.isConfirmed) {
            window.location.replace("/Drawback.docs/src/public/pages/otherPages/documents.html");
            throw new Error("Your account is of type Employee, you do not have access to this page");
        }
    });
}

function alertFromEmployeeAllowed(username) {
    
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
        title: `O pedido de ${username} foi permitido!`
    });
}

function alertFromSystemError() {
    
    Swal.fire({
        title: "Algo deu errado!",
        text: "Algum erro no sistema ocorreu.",
        icon: "error",
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("/Drawback.docs/src/public/pages/otherPages/employeeList.html");
            throw new Error("Some system error has occurred");
        }
    });
}

function alertFromEmployeeDeny(username) {
    
    Swal.fire({
        title: "Pedido Negado!",
        text: `Caso queria permitir o usuário ${username} vamos deixar o pedido nessa lista.`,
        icon: "success",
        confirmButtonText: 'Ok'
    });
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