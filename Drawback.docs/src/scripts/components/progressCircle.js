import { createProgressReports } from "./progressReport.js";

function progressCircle(listDocuments, totalFilesFromUser, filesWithValidityOk) {

    progressionText.innerHTML = "Progresso";
    progressionText.style.display = "flex"
    document.getElementById("wholeArea2").style.display = "";
    document.getElementById("barDesign2").style.display = "";

    document.getElementById("wholeArea").style.display = "";
    let totalAmount, progress, number, size, counter; 

    totalAmount = filesWithValidityOk | 0; 
    progress = totalFilesFromUser | 0;

    number = document.getElementById("number");

    size = (472 / progress);

    for (counter = 0; counter < totalAmount; counter++);
        
    number.innerHTML = counter + "/" + progress;
    document.body.style.setProperty('--size', 472 - size * totalAmount);

    createProgressReports(listDocuments);
}

export { progressCircle };