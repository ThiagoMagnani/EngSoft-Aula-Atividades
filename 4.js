let dado = prompt("Digite um dado:");

let resposta = confirm("Deseja verificar o tipo do dado?");

if (resposta) {
  if (dado !== "" && !isNaN(dado)) {
    document.write("Number");
  } else {
    document.write("String");
  }
} else {
  document.write("Obrigado por visitar esta página");
}