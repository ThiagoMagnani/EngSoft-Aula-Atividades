let idades = [12, 15, 18, 20, 16, 25, 30, 17];

let maioresDeIdade = idades.filter(function (idade) {
  return idade >= 18;
});

console.log("Idades maiores ou iguais a 18:", maioresDeIdade);
