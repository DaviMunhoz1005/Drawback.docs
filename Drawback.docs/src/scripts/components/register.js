document.getElementById("toglePassword").addEventListener('click', () => {

    const inputPassword = document.getElementById('password');
    const iconSvg = document.getElementById('svgIcon');

    if(inputPassword.type === 'password') {

        inputPassword.type = 'text';
        iconSvg.classList.add('icon-visible');
        iconSvg.classList.remove('icon-hidden');
    } else {

        inputPassword.type = 'password';
        iconSvg.classList.add('icon-hidden');
        iconSvg.classList.remove('icon-visible');
    }
});

document.getElementById("toglCheckPassword").addEventListener('click', () => {

    const inputPassword = document.getElementById('checkPassword');
    const iconSvg = document.getElementById('svgIconCheck');

    if(inputPassword.type === 'password') {

        inputPassword.type = 'text';
        iconSvg.classList.add('icon-visible');
        iconSvg.classList.remove('icon-hidden');
    } else {
        
        inputPassword.type = 'password';
        iconSvg.classList.add('icon-hidden');
        iconSvg.classList.remove('icon-visible');
    }
});