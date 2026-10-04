let homens = 0;
let mulheres = 0;

function atualizar() {
    document.getElementById("homens").value = homens;
    document.getElementById("mulheres").value = mulheres;
    document.getElementById("total").value = homens + mulheres;
}

function adicionarHomem() {
    homens++;
    atualizar();
}

function removerHomem() {
    if (homens > 0) {
        homens--;
        atualizar();
    }
}

function adicionarMulher() {
    mulheres++;
    atualizar();
}

function removerMulher() {
    if (mulheres > 0) {
        mulheres--;
        atualizar();
    }
}

function resetar() {
    homens = 0;
    mulheres = 0;
    atualizar();
}