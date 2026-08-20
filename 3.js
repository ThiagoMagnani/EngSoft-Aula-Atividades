let numero = Number(prompt("Digite um número inteiro positivo:"));
let fatorial = 1;

for (let contador = 1; contador <= numero; contador++) {
  fatorial = fatorial * contador;
}

alert("O fatorial de " + numero + " é " + fatorial);
