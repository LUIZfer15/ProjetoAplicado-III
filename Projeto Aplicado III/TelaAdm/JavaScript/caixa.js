// Expandir perfil
var iconExp = document.querySelector("#icon");
var perfilExp = document.querySelector(".dados");

iconExp.addEventListener("click", function () {
  perfilExp.classList.toggle("expPerfil");
});

// Expandir carrinho
var carrinhoExp = document.querySelector("#carrinho");
var profileSide = document.querySelector(".pedidos");

carrinhoExp.addEventListener("click", function () {
  profileSide.classList.toggle("expCarrinho");
});

// Fechar quando clicar fora
document.addEventListener("click", function (e) {
  if (!perfilExp.contains(e.target) && e.target !== iconExp) {
    perfilExp.classList.remove("expPerfil");
  }
});
