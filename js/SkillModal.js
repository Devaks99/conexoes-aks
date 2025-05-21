// ===================== CONSTANTES =====================
const MODAL_SELECTOR = '#skillModal';
const IMAGE_SELECTOR = '#skillMapImage';
const DOWNLOAD_INFO_SELECTOR = '.download-info';
const ANIMATION_DURATION = 300;

// ===================== MODAL HANDLER =====================
const ModalManager = {
  // Referências DOM
  elements: {
    modal: document.querySelector(MODAL_SELECTOR),
    image: document.querySelector(IMAGE_SELECTOR),
    downloadInfo: document.querySelector(DOWNLOAD_INFO_SELECTOR)
  },

  // Inicialização
  init() {
    this.registerEventListeners();
  },

  // Controle do Modal
  openModal() {
    this.elements.modal.classList.remove('closing');
    this.elements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    this.elements.modal.classList.add('closing');
    setTimeout(() => {
      this.elements.modal.classList.remove('active', 'closing');
      document.body.style.overflow = 'auto';
    }, ANIMATION_DURATION);
  },

  // Event Listeners
  registerEventListeners() {
    // Fechar com clique fora
    window.addEventListener('click', (e) => {
      if (e.target === this.elements.modal) this.closeModal();
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }
};

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => ModalManager.init());

// ===================== EXPOSIÇÃO GLOBAL (para HTML) =====================
window.openSkillMapModal = () => ModalManager.openModal();
window.closeSkillMapModal = () => ModalManager.closeModal();