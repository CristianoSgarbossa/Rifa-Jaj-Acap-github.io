const numerosComprados = []; // números que você marcou manualmente como comprados
let numerosSelecionados = []; // números que o usuário escolhe
const rifaConteudo = document.querySelector(".rifa-conteudo");

for (let i = 1; i <= 200; i++) {
  const box = document.createElement("div");
  box.classList.add("numero");
  box.textContent = i;

  // Se o número já estiver comprado, marca com X e impede seleção
  if (numerosComprados.includes(i)) {
    box.classList.add("comprado");
    box.textContent = "X";
  } else {
    // Adiciona evento de clique apenas se não estiver comprado
    box.addEventListener("click", () => {
      if (box.classList.contains("selecionado")) {
        box.classList.remove("selecionado");
        numerosSelecionados = numerosSelecionados.filter((n) => n !== i);
      } else {
        box.classList.add("selecionado");
        numerosSelecionados.push(i);
      }
      console.log("Números selecionados:", numerosSelecionados);
    });
  }

  rifaConteudo.appendChild(box);
}
// Botão WhatsApp
document.getElementById("btn-whatsapp").addEventListener("click", () => {
  if (numerosSelecionados.length > 0) {
    const mensagem = `Olá! Quero reservar os números: ${numerosSelecionados.join(
      ", "
    )} da rifa. Meus dados são:
Nome Completo:
Número de Telefone:`;

    const telefone = "5545999037080";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(url, "_blank");
  } else {
    alert("Selecione pelo menos um número antes de enviar.");
  }
});

const perguntasDuvida = document.querySelectorAll(".js-accordion-duvida dt");

perguntasDuvida.forEach((dt) => {
  dt.addEventListener("click", () => {
    const dd = dt.nextElementSibling;

    perguntasDuvida.forEach((otherDt) => {
      if (otherDt !== dt) {
        otherDt.classList.remove("ativo");
        otherDt.nextElementSibling.classList.remove("ativo");
      }
    });

    dt.classList.toggle("ativo");
    dd.classList.toggle("ativo");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    const destino = document.querySelector(id);

    if (destino) {
      destino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

document.classList("btn-participar").addEventListener("click", () => {
  const destino = document.querySelector("#rifa");
  destino.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
