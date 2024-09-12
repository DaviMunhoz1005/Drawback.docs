import { alertFromSequencialToasts } from "./alerts.js";

function createProgressReports(listDocuments) {
        
    const reportsHtml = document.querySelector(".reports");
    reportsHtml.innerHTML = "";

    if(listDocuments.length <= 4) { 

        generateUpToFourFieldsOfProgress();
    } else {

        generateUpToMoreThanFourFieldsOfProgress();
    }

    function generateUpToFourFieldsOfProgress() {

        for(let i = 0; i < listDocuments.length; i++) { 

            const divReportHtml = document.createElement("div");
            divReportHtml.className = "report" + i;
            divReportHtml.id = "reportDocument";

            changeMarginTopFromBarDesingTwo(i);

            if(i == 1 || i == 2) {

                createHtmlFromMidFields(divReportHtml, i);
            } else {

                createHtmlFromFields(divReportHtml, i);
            }    

            reportsHtml.appendChild(divReportHtml);

            const divReport = document.querySelector(".report" + i);
            const tagReport = divReport.querySelector("label");          

            let documentName = listDocuments[i].name;

            if(documentName.length > 24) {

                documentName = documentName.slice(0, 21) + "...";
            }

            tagReport.textContent = documentName;                 

            checkValidityOfDocumentsToFillProgressBar(divReportHtml, i);
        }
    }

    function changeMarginTopFromBarDesingTwo(index) {
        
        if(index == 0) { 

            document.querySelector(".barDesign2").style.marginTop = "145px";
        } else if(index == 1) {

            document.querySelector(".barDesign2").style.marginTop = "96px";
        } else if(index == 2) {

            document.querySelector(".barDesign2").style.marginTop = "52px";
        } else {

            document.querySelector(".barDesign2").style.marginTop = "0px";
        }
    }

    function generateUpToMoreThanFourFieldsOfProgress() {
        
        document.querySelector(".barDesign2").style.marginTop = "0px";

        for(let i = 0; i < 3; i++) { 

            const divReportHtml = document.createElement("div");
            divReportHtml.className = "report" + i;
            divReportHtml.id = "reportDocument";

            if(i == 1 || i == 2) { 

                createHtmlFromMidFields(divReportHtml, i);
            } else { 

                createHtmlFromFields(divReportHtml, i);
            }    

            reportsHtml.appendChild(divReportHtml);

            const divReport = document.querySelector(".report" + i);
            const tagReport = divReport.querySelector("label");          

            let documentName = listDocuments[i].name;

            if(documentName.length > 24) {

                documentName = documentName.slice(0, 21) + "...";
            }

            tagReport.textContent = documentName;            

            checkValidityOfDocumentsToFillProgressBar(divReportHtml, i);
        }

        const divReportHtml = document.createElement("div");
        createHtmlFromFieldOthers(divReportHtml);

        reportsHtml.appendChild(divReportHtml);

        changingInfosFromFieldOthers();
        document.getElementById('offCanvasTest').classList.remove = "open";
    }

    function createHtmlFromMidFields(divReportHtml, index) {
        
        divReportHtml.innerHTML = `
                <label class="nameDocumentMid"></label><br>
                <div class="sameLine">
                    <div class="progress-bar" id="pbMid">
                        <progress value="0" max="1" id="firstProgress" class="specialBar"></progress>
                    </div> 
                    <span class="sizeAmount" id="a${index + 1}">(0/1)</span>
                </div>
                <br>
            `; 
    }

    function createHtmlFromFields(divReportHtml, index) {
        
        divReportHtml.innerHTML = `
                <label class="nameDocument"></label><br>
                <div class="sameLine">
                    <div class="progress-bar" id="pb1">
                        <progress value="0" max="1" id="firstProgress" class="specialBar"></progress>
                    </div> 
                    <span class="sizeAmount" id="a${index + 1}">(0/1)</span>
                </div>
                <br>
            `;
    }

    function checkValidityOfDocumentsToFillProgressBar(divReportHtml, index) {

        const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; 
    
        if(new Date(listDocuments[index].validity).getTime() > Date.now()) {

            if(new Date(listDocuments[index].validity).getTime() - Date.now() > oneMonthInMs) {

                divReportHtml.querySelector("progress").value = 1;
                document.getElementById(`a${index + 1}`).innerHTML = "(1/1)";
                return;
            }

            divReportHtml.querySelector("progress").value = 1;
            document.getElementById(`a${index + 1}`).innerHTML = "(1/1)";
            alertFromSequencialToasts(listDocuments[index].name, index + 1, false);
            return;
        } 

        alertFromSequencialToasts(listDocuments[index].name, index + 1, true);
    }  

    function createHtmlFromFieldOthers(divReportHtml) {

        divReportHtml.className = "report3";
        divReportHtml.id = "reportDocument";
    
        divReportHtml.innerHTML = `
            <a href="#" class="nameDocument">Abrir Off-Canvas</a><br>
            <div class="sameLine">
                <div class="progress-bar" id="pb1">
                    <progress value="0" max="0" class="specialBar"></progress>
                </div> 
                <span class="sizeAmount" id="a4"></span>
            </div>
            <br>
        `;

        const link = divReportHtml.querySelector('.nameDocument');
        const offCanvas = document.getElementById('offCanvasTest');
        const overlay = document.getElementById('overlay');
        const closeOffCanvas = document.querySelector('.close-off-canvas');
        
        console.log(offCanvas);
        if(link && offCanvas && overlay && closeOffCanvas) {

            link.addEventListener('click', function(event) {

                event.preventDefault(); 
                offCanvas.classList.add('open'); 
                overlay.classList.add('open'); 
            });
    
            closeOffCanvas.addEventListener('click', function() {
                
                offCanvas.className = 'off-canvas';
                overlay.classList.remove('open');
            });
    
            overlay.addEventListener('click', function() {

                offCanvas.className = 'off-canvas';
                overlay.classList.remove('open');
            });
        } else {

            console.error('Um ou mais elementos necessários não foram encontrados.');
        }
    }
    
    function changingInfosFromFieldOthers() {

        let countDocumentsValids = 0;
        
        const divReport = document.querySelector(".report3"); 
        const tagReport = divReport.querySelector("a");  
        document.getElementById("titleOffCanvas").textContent = "Outros Documentos"        

        tagReport.textContent = "Outros...";            
        tagReport.style.textDecoration = "underline";  
        tagReport.style.fontStyle = "italic";      

        const progressBar = document.querySelectorAll(".progress-bar")[3];
        const progressElement = progressBar.querySelector("progress");
        const divOffCanvas = document.querySelector(".contentDocuments");
        divOffCanvas.innerHTML = "";

        for(let i = 3; i < listDocuments.length; i++) {

            const documentName = listDocuments[i].name.length > 24 ? listDocuments[i].name.slice(0, 21) + "..." : listDocuments[i].name;
            const divDocumentOffCanvas = document.createElement("div");
            divDocumentOffCanvas.className = "documentFieldOffCanvas";

            if(new Date(listDocuments[i].validity).getTime() > Date.now()) {

                countDocumentsValids++;

                divDocumentOffCanvas.innerHTML = createHtmlFromOffCanvasDocuments(documentName, 1);
                divOffCanvas.appendChild(divDocumentOffCanvas);
            } else {

                alertFromSequencialToasts(listDocuments[i].name, i - 1);
                divDocumentOffCanvas.innerHTML = createHtmlFromOffCanvasDocuments(documentName, 0);
                divOffCanvas.appendChild(divDocumentOffCanvas);
            }
        }
        
        progressElement.value = countDocumentsValids;
        progressElement.max = listDocuments.length - 3;
        document.getElementById("a4").innerHTML = `(${countDocumentsValids}/${listDocuments.length - 3})`;
    }

    function createHtmlFromOffCanvasDocuments(documentName, itsOk) {
        
        return `
            <h3>${documentName}</h3>
            <div class="progress-bar" id="pb1">
                <progress value="${itsOk}" max="1" class="specialBar"></progress>
                <span class="sizeAmount">(${itsOk}/1)</span>
            </div> 
            <br>
        `;
    }
}

export { createProgressReports };