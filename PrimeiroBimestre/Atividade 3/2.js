function verificarAprovacao(nota) {
  if (nota >= 7) {
    return "Aprovado";
  } else {
    return "Reprovado";
  }
}

console.log(verificarAprovacao(8));
console.log(verificarAprovacao(5));
