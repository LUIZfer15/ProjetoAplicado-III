let listaPedidos = [];
let comandaCount = parseInt(localStorage.getItem('comandaCount'), 10) || 0;

const precos = {
    'Pizza': 30.00,
    'Hamburguer': 25.00,
    'Sushi': 50.00,
    'Salada': 20.00,
    'Açai': 15.00,
    'Coca-Cola': 7.00
};

function adicionar(item) {
    listaPedidos.push({ nome: item, preco: precos[item] });
    atualizarLista();
}

// Atualizar Lista
function atualizarLista() {
    const listaElement = document.getElementById('lista-itens');
    listaElement.innerHTML = '';
    let total = 0;

    listaPedidos.forEach((pedido, index) => {
        const li = document.createElement('li');
        li.textContent = `${pedido.nome} - R$ ${pedido.preco.toFixed(2)}`;

        // Criar botão "Remover" com ícone de lixeira
        const btnRemover = document.createElement('button');
        btnRemover.innerHTML = '<i class="bi bi-trash3"></i>';
        btnRemover.style.marginLeft = '10px';
        btnRemover.style.cursor = 'pointer';
        btnRemover.style.border = 'none';
        btnRemover.style.background = 'transparent';
        btnRemover.style.color = 'black';
        btnRemover.style.fontSize = '16px';

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

// Botão Confirmar
document.getElementById('btnConfirmar').addEventListener('click', () => {
    const metodoSelecionado = document.querySelector('input[name="paga"]:checked');
    const opcaoSelecionada = document.querySelector('input[name="opcao"]:checked');
    const mensagemErro = document.getElementById('mensagemErro');

    mensagemErro.textContent = '';

    if (listaPedidos.length === 0) {
        mensagemErro.textContent = 'Por favor, adicione Itens ao pedido antes de confirmar!';
        return;
    }

    if (!metodoSelecionado) {
        mensagemErro.textContent = 'Por favor, selecione uma Forma de Pagamento antes de confirmar!';
        return;
    }

    if (!opcaoSelecionada) {
        mensagemErro.textContent = 'Por favor, selecione a Opção Comer no Local ou Para Levar antes de confirmar!';
        return;
    }

    comandaCount += 1;
    localStorage.setItem('comandaCount', comandaCount);

    const comandaKey = `Comanda#${comandaCount}`;
    localStorage.setItem(comandaKey, JSON.stringify(listaPedidos));

    listaPedidos = [];
    atualizarLista();

    metodoSelecionado.checked = false;
    opcaoSelecionada.checked = false;

    alert('Comanda Confirmada!');
});