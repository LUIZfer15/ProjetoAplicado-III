document.getElementById('btnConfirmar').addEventListener('click', () => {
    const metodoSelecionado = document.querySelector('input[name="paga"]:checked');
    const opcaoSelecionada = document.querySelector('input[name="opcao"]:checked');
    const mensagemErro = document.getElementById('mensagemErro');
    const qrCodeContainer = document.getElementById('qrcode'); // Div para exibir o QR Code

    mensagemErro.textContent = '';

    if (listaPedidos.length === 0) {
        mensagemErro.textContent = 'Por favor, adicione itens ao pedido antes de confirmar!';
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

 
    if (metodoSelecionado.value === 'pix') {
        const valorTotal = listaPedidos.reduce((acc, pedido) => acc + pedido.preco, 0).toFixed(2);
        const pixData = {
            chave: "seu-cnpj-ou-email", 
            nome: "Restaurante Exemplo",
            valor: valorTotal,
            descricao: "Pagamento do pedido"
        };

    
        QRCode.toCanvas(qrCodeContainer, JSON.stringify(pixData), function (error) {
            if (error) {
                console.error(error);
                mensagemErro.textContent = 'Erro ao gerar QR Code do Pix.';
            } else {
                alert(`Pagamento via Pix de R$ ${valorTotal} gerado!`);
            }
        });
    } else {

        alert("Pagamento com " + metodoSelecionado.value + " confirmado!");
    }

    comandaCount += 1;
    localStorage.setItem('comandaCount', comandaCount);
    const comandaKey = `Comanda#${comandaCount}`;
    localStorage.setItem(comandaKey, JSON.stringify(listaPedidos));

    listaPedidos = [];
    atualizarLista();

    metodoSelecionado.checked = false;
    opcaoSelecionada.checked = false;
});
