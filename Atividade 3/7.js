const readline = require("readline");

const entrada = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function verificarResposta(resposta) {
  if (resposta.toLowerCase() === "brasil") {
    return "Resposta correta!";
  } else {
    return "Tente novamente!";
  }
}

entrada.question("Qual é o país onde você mora? ", function (resposta) {
  console.log(verificarResposta(resposta));
  entrada.close();
});
