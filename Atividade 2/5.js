let notas = [8, 7, 6, 9];

let soma = 0;

for (let i = 0; i < notas.length; i++) {
  soma = soma + notas[i];
}

let media = soma / notas.length;

console.log("Média:", media);

if (media >= 7) {
  console.log("Aprovado");
} else {
  console.log("Reprovado");
}
