// Criar novo produto
document.addEventListener("DOMContentLoaded", function () {
  const btnSalvar = document.querySelector(".btn");
  const inputNome = document.getElementById("nome");
  const inputValor = document.getElementById("valor");
  const inputImagem = document.getElementById("product-image");
  const imgArea = document.querySelector(".img-area");

  // Abrir seleção de imagem ao clicar no botão
  document.querySelector(".select-img").addEventListener("click", () => {
    inputImagem.click();
  });

  // Exibir a imagem selecionada
  inputImagem.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imgArea.innerHTML = `<img src="${event.target.result}" alt="Produto">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Formatar nome do produto: Primeira letra maiúscula, restante minúsculo
  document.getElementById("nome").addEventListener("input", function (e) {
    let valor = e.target.value.trim().toLowerCase(); // Converte tudo para minúsculo
    if (valor.length > 0) {
      valor = valor.charAt(0).toUpperCase() + valor.slice(1); // Primeira letra maiúscula
    }
    e.target.value = valor;
  });

  // Formatar o valor automaticamente
  inputValor.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    inputValor.value = valor
      ? `R$ ${(parseFloat(valor) / 100).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`
      : "R$ 0,00";
  });

  // Salvar novo produto
  btnSalvar.addEventListener("click", function () {
    const nome = inputNome.value.trim();
    let valor = inputValor.value.replace("R$", "").replace(",", ".").trim();
    const imagem = imgArea.querySelector("img")?.src;

    if (!nome || !valor || !imagem) {
      alert("Preencha todos os campos e adicione uma imagem!");
      return;
    }

    const produto = { nome, valor, imagem };
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto salvo com sucesso!");
    window.location.href = "../Html/menu.html"; // Redireciona para a tela de menu
  });
});
