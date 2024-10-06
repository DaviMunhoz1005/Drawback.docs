function formatCNAE(input) {
    let cnae = input.value.replace(/\D/g, '');
    if (cnae.length > 6) {
        cnae = cnae.slice(0, 6);
    }
    if (cnae.length > 2) {
        cnae = cnae.replace(/(\d{2})(\d)/, '$1.$2');
    }
    if (cnae.length > 5) {
        cnae = cnae.replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2-$3');
    }
    input.value = cnae;
}

function formatCNPJ(input) {
    let cnpj = input.value.replace(/\D/g, '');
    if (cnpj.length > 14) {
        cnpj = cnpj.slice(0, 14);
    }
    if (cnpj.length > 2) {
        cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    }
    if (cnpj.length > 5) {
        cnpj = cnpj.replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (cnpj.length > 8) {
        cnpj = cnpj.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
    }
    if (cnpj.length > 12) {
        cnpj = cnpj.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
    input.value = cnpj;
}

function formatCPF(input) {

    let cpf = input.value.replace(/\D/g, '');

    if(cpf.length > 11) {

        cpf = cpf.slice(0, 11);
    }
    if(cpf.length > 3) {

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if(cpf.length > 6) {

        cpf = cpf.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if(cpf.length > 9) {

        cpf = cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    input.value = cpf;
}