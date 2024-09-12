import { getExpiryToken } from "../services/apiRequests.js";
import { alertWarningRedirectToIndex } from "./alerts.js";

function checkTokenFromUser() {

    const expiryTime = getExpiryToken();     

    if(expiryTime == null) {

        alertWarningRedirectToIndex("Faça login para acessar essa página.");
        return false;
    }

    const currentTimeMillis = Date.now(); 
    const expiryTimeMillis = convertDateTimeToMillis(expiryTime); 
    if(currentTimeMillis > expiryTimeMillis) {

        alertWarningRedirectToIndex("Faça login para acessar essa página.");
        return false;
    }
        
    return true;
}

function convertDateTimeToMillis(dateTimeString) {
    
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
}

export { checkTokenFromUser };