const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    navigation.classList.remove('is-open');
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');

emailjs.init({
  publicKey: 'JG4wybbpmMojzZWUb',
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  submitButton.disabled = true;
  formStatus.textContent = 'Enviando mensaje...';
  formStatus.classList.remove('is-ready');

  try {
    await emailjs.sendForm('primary_service', 'template_aqwt2bd', contactForm);
    formStatus.textContent = '¡Mensaje enviado! Gracias por escribirme.';
    formStatus.classList.add('is-ready');
    contactForm.reset();
  } catch (error) {
    console.error('No se pudo enviar el mensaje:', error);
    formStatus.textContent = 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.';
  } finally {
    submitButton.disabled = false;
  }
});
