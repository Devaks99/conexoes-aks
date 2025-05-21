// ================================
// ANIMAÇÃO SEQUENCIAL DOS CARDS
// ================================
document.querySelectorAll(".social-card").forEach((card, index) => {
  const delay = 0.2 + index * 0.15;
  card.style.animationDelay = `${delay}s`;
});

// ================================
// MODO DARK E ANIMAÇÃO DE APARIÇÃO DO BODY
// ================================
window.addEventListener("load", () => {
  // 1) Carrega o tema
  loadTheme();
  // 2) Exibe o body
  document.body.style.opacity = "1";
  document.body.style.transform = "translateY(0)";
  // 3) Inicia Particles (carregadas desde o início, mas com opacidade reduzida)
  initParticles();
  // 4) Animação de texto
  typeWriterEffect();
});

// ================================
// MODAL DA FOTO DE PERFIL
// ================================
const profilePic = document.getElementById("profilePic");
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

profilePic.addEventListener("click", () => {
  modalOverlay.classList.add("active");
});
closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

// ================================
// INICIALIZA PARTÍCULAS
// (deixa opacidade menor no container, p/ efeito mais fraco no início)
// ================================
function initParticles() {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 900,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.2,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 4,
          size_min: 0.3,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 160,
        color: "#ffffff",
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: false,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          line_linked: {
            opacity: 0.5,
          },
        },
      },
    },
    retina_detect: true,
  });
}

// ================================
// EFEITO "MÁQUINA DE ESCREVER" + ONDA VERDE
// ================================
const typedTitleEl = document.getElementById("typedTitle");
let animationFinished = false; // Variável de controle para o replay

function typeWriterEffect() {
  animationFinished = false; // Define que a animação está em andamento

  /*
    1) Digita "Gabriel Inojosa"
    2) Apaga 2 letras ("sa"), ficando "Gabriel Inojo"
    3) Digita "za", virando "Gabriel Inojoza"
    4) Mantém "Gabriel Inojoza"
    5) Aparece "</ " e " >" com efeito de bolha
    6) Onda verde caractere a caractere
    7) Após onda verde, aumentamos opacidade das partículas
  */

  const textFull = "Ana Ca";
  const correction = "Karla";
  let currentText = "";
  let index = 0;

  const typingSpeed = 150;
  const backspaceSpeed = 90;
  const pauseBeforeBackspace = 550;
  const pauseAfterCorrection = 500;

  // 1) Digitar "Gabriel Inojosa"
  const typeInterval = setInterval(() => {
    currentText += textFull[index];
    typedTitleEl.innerHTML = currentText;
    index++;

    if (index === textFull.length) {
      clearInterval(typeInterval);
      setTimeout(backspaceAction, pauseBeforeBackspace);
    }
  }, typingSpeed);

  // 2) Apagar 2 letras => "sa"
  function backspaceAction() {
    let backspaceCount = 2;
    const backspaceInterval = setInterval(() => {
      if (backspaceCount > 0) {
        currentText = currentText.slice(0, -1);
        typedTitleEl.innerHTML = currentText;
        backspaceCount--;
      } else {
        clearInterval(backspaceInterval);
        // 3) Digitar "za"
        typeCorrection();
      }
    }, backspaceSpeed);
  }

  function typeCorrection() {
    let correctionIndex = 0;
    const correctionInterval = setInterval(() => {
      currentText += correction[correctionIndex];
      typedTitleEl.innerHTML = currentText;
      correctionIndex++;

      if (correctionIndex === correction.length) {
        clearInterval(correctionInterval);
        // 4) Já está "Gabriel Inojoza"
        setTimeout(insertAngleBrackets, pauseAfterCorrection);
      }
    }, typingSpeed);
  }

  // 5) Insere "</ " e " >" com bolha
  function insertAngleBrackets() {
    // Removendo o cursor apenas após a digitação completa (não afeta o replay, pois o cursor é restaurado)
    typedTitleEl.style.borderRight = "none";
    typedTitleEl.textContent = currentText;

    const leftBracket = document.createElement("span");
    leftBracket.classList.add("bubble-bracket", "left-bracket");
    leftBracket.textContent = "</ ";

    const rightBracket = document.createElement("span");
    rightBracket.classList.add("bubble-bracket", "right-bracket");
    rightBracket.textContent = " >";

    typedTitleEl.prepend(leftBracket);
    typedTitleEl.appendChild(rightBracket);

    // 6) Onda verde
    setTimeout(() => waveColorEffect(), 500);
  }
}

// Onda verde: cada caractere fica verde e depois volta
function waveColorEffect() {
  const text = typedTitleEl.textContent; // ex. "</ Gabriel Inojoza >"
  typedTitleEl.innerHTML = "";

  // Cria spans p/ cada char
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    typedTitleEl.appendChild(span);
  }

  const spans = typedTitleEl.querySelectorAll("span");
  spans.forEach((charSpan, i) => {
    setTimeout(() => {
      // Acende verde
      charSpan.style.color = "limegreen";
      // Depois de 150ms, volta ao normal
      setTimeout(() => {
        charSpan.style.color = "";
        // Se for último caractere, aumentamos opacidade das partículas
        if (i === spans.length - 1) {
          rampUpParticles();
        }
      }, 150);
    }, i * 70);
  });
}

// 7) Depois da onda verde, deixamos as partículas mais visíveis
function rampUpParticles() {
  const particlesContainer = document.getElementById("particles-js");
  /* Subimos a opacidade de 0.3 para 1, dando um ar mais "tech" */
  particlesContainer.style.opacity = "1";
  animationFinished = true; // Animação finalizada, permite replay
}

// Event listener para replay do efeito somente se a animação já estiver concluída
// Ao reiniciar, garantimos que o cursor (|) apareça durante a digitação
typedTitleEl.addEventListener("click", () => {
  if (animationFinished) {
    // Restaura o cursor para que o | seja exibido enquanto digita
    typedTitleEl.style.borderRight = "";
    typedTitleEl.innerHTML = "";
    typeWriterEffect();
  }
});


// ================================
// TOGGLE DE TEMA (DARK/LIGHT)
// ================================
const themeToggle = document.getElementById("themeToggle");
const themeToggleIcon = document.getElementById("themeToggleIcon");
let isDarkMode = false;


function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
    isDarkMode = true;
    themeToggleIcon.classList.remove("fa-moon");
    themeToggleIcon.classList.add("fa-sun");
  }
}


function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.documentElement.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    themeToggleIcon.classList.remove("fa-moon");
    themeToggleIcon.classList.add("fa-sun");
  } else {
    document.documentElement.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    themeToggleIcon.classList.remove("fa-sun");
    themeToggleIcon.classList.add("fa-moon");
  }
}

themeToggle.addEventListener("click", toggleTheme);