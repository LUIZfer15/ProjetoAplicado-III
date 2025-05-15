document.addEventListener("DOMContentLoaded", function () {
  carregarProdutos();
  carregarPedidos();
});

// Carregar pedidos selecionados no localStorage e exibir na tela "Menu"
function carregarProdutos() {
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const sectionItens = document.getElementById("pedidos");
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

// Lista de pedidos
let listaPedidos = [];
let comandaCount = parseInt(localStorage.getItem("comandaCount"), 10) || 0;

// Adicionar item ao pedido
function adicionar(nome, preco) {
  listaPedidos.push({ nome, preco });
  atualizarLista();
}

// Atualizar Lista de Pedidos
function atualizarLista() {
  const listaElement = document.getElementById("lista-itens");
  listaElement.innerHTML = "";
  let total = 0;

  listaPedidos.forEach((pedido, index) => {
    const li = document.createElement("li");
    li.textContent = `${pedido.nome} - R$ ${pedido.preco.toFixed(2)}`;

    // Criar botão "Remover"
    const btnRemover = document.createElement("button");
    btnRemover.innerHTML = '<i class="bi bi-trash3"></i>';
    btnRemover.classList.add("btn-remover");

    btnRemover.onclick = () => {
      listaPedidos.splice(index, 1);
      atualizarLista();
    };

    li.appendChild(btnRemover);
    listaElement.appendChild(li);
    total += pedido.preco;
  });

  document.getElementById(
    "precoTotal"
  ).textContent = `Total: R$ ${total.toFixed(2)}`;
}
