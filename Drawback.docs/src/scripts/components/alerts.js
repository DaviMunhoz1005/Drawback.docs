function alertError(textAlert) {

    Swal.fire({
        title: "Algo deu errado!",
        text: `${textAlert}`,
        icon: "error",
        confirmButtonText: "Ok"
    }).then(() => {
        console.error(`${textAlert}`);
        return false;
    });
}

function alertWarningRedirectToIndex(textAlert) {

    Swal.fire({
        title: "Algo deu errado!",
        text: `${textAlert}`,
        icon: "warning",
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("/Drawback.docs/src/public/index.html");
            throw new Error(`${textAlert}`);
        }
    });
}

function alertWarningRedirectDocuments(textAlert) {

    Swal.fire({
        title: "Algo deu errado!",
        text: `${textAlert}`,
        icon: "error",
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("/Drawback.docs/src/public/pages/otherPages/documents.html");
            throw new Error(`${textAlert}`);
        }
    });
}

function alertFromRequestAccepted(textAlert) {

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
        title: `${textAlert}`
    });
}

function alertFromRequestDeny(titleAlert, textAlert) {
    
    Swal.fire({
        title: `${titleAlert}`,
        text: `${textAlert}`,
        icon: "success",
        confirmButtonText: 'Ok'
    });
}


export { alertError, alertWarningRedirectToIndex, alertWarningRedirectDocuments, alertFromRequestAccepted, alertFromRequestDeny };