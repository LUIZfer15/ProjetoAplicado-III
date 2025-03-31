document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
    carregarPedidos();
});

// Carregar produtos salvos no localStorage e exibir na tela "Menu"
function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const sectionItens = document.getElementById("itens");
    sectionItens.innerHTML = ""; // Limpa os itens antes de carregar

    produtos.forEach((produto, index) => {
        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" onclick="adicionar('${produto.nome}', ${parseFloat(produto.valor)})">
            <p>${produto.nome} <li>R$ ${parseFloat(produto.valor).toFixed(2)}</li></p>
            <button class="btn-deletar" onclick="deletarProduto(${index})">
            Deletar
            </button>
        `;

        sectionItens.appendChild(div);
    });
}

// Função para deletar um produto do localStorage e atualizar a tela
function deletarProduto(index) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    if (confirm(`Tem certeza que deseja excluir "${produtos[index].nome}"?`)) {
        produtos.splice(index, 1); // Remove o produto do array
        localStorage.setItem("produtos", JSON.stringify(produtos)); // Atualiza o localStorage
        carregarProdutos(); // Recarrega a lista de produtos na tela
    }
}

// Lista de pedidos
let listaPedidos = [];
let comandaCount = parseInt(localStorage.getItem('comandaCount'), 10) || 0;

// Adicionar item ao pedido
function adicionar(nome, preco) {
    listaPedidos.push({ nome, preco });
    atualizarLista();
}

// Atualizar Lista de Pedidos
function atualizarLista() {
    const listaElement = document.getElementById('lista-itens');
    listaElement.innerHTML = '';
    let total = 0;

    listaPedidos.forEach((pedido, index) => {
        const li = document.createElement('li');
        li.textContent = `${pedido.nome} - R$ ${pedido.preco.toFixed(2)}`;

        // Criar botão "Remover"
        const btnRemover = document.createElement('button');
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

    document.getElementById('precoTotal').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Confirmar Pedido e Criar Comanda
document.getElementById('btnConfirmar').addEventListener('click', () => {
    const metodoSelecionado = document.querySelector('input[name="paga"]:checked');
    const opcaoSelecionada = document.querySelector('input[name="opcao"]:checked');
    const mensagemErro = document.getElementById('mensagemErro');

    mensagemErro.textContent = '';

    if (listaPedidos.length === 0) {
        mensagemErro.textContent = 'Adicione itens ao pedido antes de confirmar!';
        return;
    }

    if (!metodoSelecionado) {
        mensagemErro.textContent = 'Selecione uma forma de pagamento!';
        return;
    }

    if (!opcaoSelecionada) {
        mensagemErro.textContent = 'Escolha se é para comer no local ou levar!';
        return;
    }

    // Criar nova comanda
    comandaCount += 1;
    localStorage.setItem('comandaCount', comandaCount);
    const comandaKey = `Comanda#${comandaCount}`;
    localStorage.setItem(comandaKey, JSON.stringify(listaPedidos));

    // Resetar lista de pedidos
    listaPedidos = [];
    atualizarLista();

    // Desmarcar opções
    metodoSelecionado.checked = false;
    opcaoSelecionada.checked = false;

    alert(`Comanda #${comandaCount} confirmada com sucesso!`);
});