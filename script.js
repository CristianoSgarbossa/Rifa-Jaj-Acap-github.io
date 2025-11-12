const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

// Configuração do canvas para cobrir toda a página
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Inicializa o canvas
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Configuração das estrelas
const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000);
const stars = [];
const shootingStars = [];

// Cria estrelas com diferentes tamanhos e brilhos
function createStar() {
  const size = Math.random() * 1.5;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: size,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.8 + 0.2, // Garante que todas as estrelas sejam visíveis
    flicker: Math.random() * 0.05,
  };
}

// Cria estrelas cadentes ocasionais
function createShootingStar() {
  return {
    x: Math.random() * canvas.width,
    y: 0,
    speedX: (Math.random() + 0.5) * 5,
    speedY: (Math.random() + 0.5) * 5,
    size: Math.random() * 2 + 1,
    life: 100,
    decay: Math.random() * 0.5 + 0.1,
    tail: [],
  };
}

// Inicializa as estrelas
for (let i = 0; i < starCount; i++) {
  stars.push(createStar());
}

// Animação principal
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha um gradiente de fundo para dar profundidade
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    Math.max(canvas.width, canvas.height) / 2
  );
  gradient.addColorStop(0, "rgba(27, 39, 53, 0.1)");
  gradient.addColorStop(1, "rgba(9, 10, 15, 1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Atualiza e desenha estrelas normais
  stars.forEach((star, i) => {
    star.x += star.speedX;
    star.y += star.speedY;
    star.opacity += (Math.random() - 0.5) * star.flicker;

    // Mantém a opacidade dentro de limites visíveis
    star.opacity = Math.max(0.2, Math.min(1, star.opacity));

    // Reposiciona estrelas que saíram da tela
    if (
      star.x < 0 ||
      star.x > canvas.width ||
      star.y < 0 ||
      star.y > canvas.height
    ) {
      stars[i] = createStar();
    }

    // Desenha a estrela
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();

    // Adiciona um brilho extra para estrelas maiores
    if (star.radius > 1) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.3})`;
      ctx.fill();
    }
  });

  // Chance de criar uma estrela cadente
  if (Math.random() < 0.003) {
    shootingStars.push(createShootingStar());
  }

  // Atualiza e desenha estrelas cadentes
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const star = shootingStars[i];

    // Adiciona posição à cauda
    star.tail.unshift({ x: star.x, y: star.y });
    if (star.tail.length > 20) star.tail.pop();

    // Atualiza posição
    star.x += star.speedX;
    star.y += star.speedY;
    star.life -= star.decay;

    // Desenha a cauda
    for (let j = 0; j < star.tail.length; j++) {
      const point = star.tail[j];
      const alpha = (1 - j / star.tail.length) * (star.life / 100);

      ctx.beginPath();
      ctx.arc(
        point.x,
        point.y,
        star.size * (1 - j / star.tail.length),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    // Remove estrelas cadentes que terminaram seu ciclo
    if (star.life <= 0 || star.x > canvas.width || star.y > canvas.height) {
      shootingStars.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();

const links = document.querySelectorAll(".header-menu a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let atual = "";

  sections.forEach((sec) => {
    const topo = sec.offsetTop;
    const altura = sec.clientHeight;

    if (scrollY >= topo - altura / 3) {
      atual = sec.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("ativo");
    if (link.getAttribute("href") === "#" + atual) {
      link.classList.add("ativo");
    }
  });
});

// ===== Mudar estilo do header ao rolar =====
const header = document.querySelector(".header-bg");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const numerosComprados = [66, 67]; // números que você marcou manualmente como comprados
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
