let numero = Number(prompt("Digite um número inteiro positivo:"));
let primo = true;

if (numero < 2) {
  primo = false;
} else {
  for (let divisor = 2; divisor < numero; divisor++) {
    if (numero % divisor === 0) {
      primo = false;
      break;
    }
  }
}

if (primo) {
  alert("O número é primo.");
} else {
  alert("O número não é primo.");
}
