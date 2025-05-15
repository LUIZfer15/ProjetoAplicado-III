// Carregar os produtos
document.addEventListener("DOMContentLoaded", function () {
  carregarProdutos();
  carregarPedidos();
});

// Carregar produtos salvos no localStorage e exibir na tela "Menu"
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
    )}</li></p>`;

    sectionItens.appendChild(div);
  });
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

// Limpar todos os itens do carrinho
document.getElementById("btnLimpar").addEventListener("click", function () {
  if (confirm("Tem certeza que deseja limpar o carrinho?")) {
    const lista = document.getElementById("lista-itens");
    lista.innerHTML = ""; // Remove todos os itens
    atualizarContador();
    atualizarTotal();
  }
});

// Adicionar Produto ao "Carrinho"
function adicionar(nome, valor) {
  const lista = document.getElementById("lista-itens");

  const li = document.createElement("li");
  li.classList.add("item-carrinho");

  li.innerHTML = `
    ${nome} - R$ ${valor.toFixed(2)}
    <button class="remover"><i class="bi bi-x"></i></button>
  `;

  // Remover item ao clicar no botão
  li.querySelector(".remover").addEventListener("click", function () {
    li.remove();
    atualizarContador();
    atualizarTotal();
  });

  lista.appendChild(li);

  atualizarContador();
  atualizarTotal();
}

function atualizarContador() {
  const itemCount = document.querySelectorAll("#lista-itens li").length;
  const contador = document.querySelector(".carrinho .valor");
  if (contador) {
    contador.textContent = `(${itemCount})`;
  }
}

function atualizarTotal() {
  const itens = document.querySelectorAll("#lista-itens li");
  let total = 0;

  itens.forEach((item) => {
    const texto = item.textContent.replace("Remover", "").trim();
    const valorTexto = texto.split("R$")[1];
    const valor = parseFloat(valorTexto.replace(",", "."));
    if (!isNaN(valor)) {
      total += valor;
    }
  });

  const totalDiv = document.getElementById("precoTotal");
  totalDiv.textContent = `Valor Total: R$ ${total
    .toFixed(2)
    .replace(".", ",")}`;
}
