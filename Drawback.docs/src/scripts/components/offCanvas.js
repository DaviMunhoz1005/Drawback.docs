function openCloseOffCanvas(event) {

    const offCanvas = document.getElementById('offCanvasTest');
    const overlay = document.getElementById('overlay');
    const closeOffCanvas = document.querySelector('.close-off-canvas');

    if(offCanvas && overlay && closeOffCanvas) {

        event.preventDefault(); 
        offCanvas.classList.add('open'); 
        overlay.classList.add('open'); 

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

function openCloseOffCanvasWithLink(divReportHtml, method) {

        const link = divReportHtml.querySelector('.nameDocument');
        const offCanvas = document.getElementById('offCanvasTest');
        const overlay = document.getElementById('overlay');
        const closeOffCanvas = document.querySelector('.close-off-canvas');

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

export { openCloseOffCanvas, openCloseOffCanvasWithLink };