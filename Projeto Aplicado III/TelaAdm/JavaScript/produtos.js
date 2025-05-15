document.addEventListener("DOMContentLoaded", function () {
  carregarProdutos();
  carregarPedidos();
});

// Carregar produtos salvos no localStorage e exibir na tela "Produtos"
function carregarProdutos() {
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const sectionItens = document.getElementById("itens");
  sectionItens.innerHTML = ""; // Limpa os itens antes de carregar

  produtos.forEach((produto, index) => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
            <img src="${produto.imagem}" alt="${
      produto.nome
    }" onclick="adicionar('${produto.nome}', ${parseFloat(produto.valor)})">
            <p>${produto.nome} <li>R$ ${parseFloat(produto.valor).toFixed(
      2
    )}</li></p>
            <button class="btn-deletar" onclick="deletarProduto(${index})">
            Deletar
            </button>
        `;

    sectionItens.appendChild(div);
  });
}

// Função para deletar um produto do localStorage e atualizar a tela
function deletarProduto(index) {
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  if (confirm(`Tem certeza que deseja excluir "${produtos[index].nome}"?`)) {
    produtos.splice(index, 1); // Remove o produto do array
    localStorage.setItem("produtos", JSON.stringify(produtos)); // Atualiza o localStorage
    carregarProdutos(); // Recarrega a lista de produtos na tela
  }
}

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
