let visor = document.getElementById("visor");
let conta = document.getElementById("conta");

let expressao = "";
let resultadoMostrado = false;

function adicionarNumero(numero) {
    if (resultadoMostrado) {
        expressao = "";
        conta.innerText = "";
        resultadoMostrado = false;
    }

    expressao += numero;
    mostrarExpressao();
}

function adicionarOperador(operador) {
    if (expressao == "") return;

    if (resultadoMostrado) {
        resultadoMostrado = false;
    }

    let ultimo = expressao[expressao.length - 1];

    if (ultimo == "+" || ultimo == "-" || ultimo == "*" || ultimo == "/" || ultimo == "%") {
        expressao = expressao.slice(0, -1);
    }

    expressao += operador;
    mostrarExpressao();
}

function mostrarExpressao() {
    let texto = expressao;

    texto = texto.replaceAll("*", "×");
    texto = texto.replaceAll("/", "÷");
    texto = texto.replaceAll("-", "−");

    visor.innerText = texto;
}

function calcular() {
    if (expressao == "") return;

    try {
        let contaFeita = expressao;
        let resultado;

        if (expressao.includes("%")) {
            let partes = expressao.split("%");

            let numero1 = Number(partes[0]);
            let numero2 = Number(partes[1]);

            resultado = numero1 / 100 * numero2;
        } else {
            resultado = eval(expressao);
        }

        if (!isFinite(resultado)) {
            visor.innerText = "Erro";
            expressao = "";
            conta.innerText = "";
            resultadoMostrado = false;
            return;
        }

        conta.innerText = formatarConta(contaFeita);
        visor.innerText = resultado;

        expressao = resultado.toString();
        resultadoMostrado = true;

    } catch {
        visor.innerText = "Erro";
        expressao = "";
        conta.innerText = "";
        resultadoMostrado = false;
    }
}

function limpar() {
    expressao = "";
    conta.innerText = "";
    visor.innerText = "0";
    resultadoMostrado = false;
}

function maisMenos() {
    if (expressao == "") return;

    if (!isNaN(expressao)) {
        expressao = (Number(expressao) * -1).toString();
        mostrarExpressao();
    }
}

function porcentagem() {
    adicionarOperador("%");
}

function adicionarVirgula() {
    if (resultadoMostrado) {
        expressao = "";
        conta.innerText = "";
        resultadoMostrado = false;
    }

    let partes = expressao.split(/[+\-*/%]/);
    let ultimoNumero = partes[partes.length - 1];

    if (!ultimoNumero.includes(".")) {
        if (ultimoNumero == "") {
            expressao += "0";
        }

        expressao += ".";
        mostrarExpressao();
    }
}

function formatarConta(texto) {
    texto = texto.replaceAll("*", "×");
    texto = texto.replaceAll("/", "÷");
    texto = texto.replaceAll("-", "−");

    return texto;
}