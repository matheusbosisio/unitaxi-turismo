
document.getElementById('year').textContent = new Date().getFullYear();
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const mobile = window.matchMedia('(max-width: 1024px)');
function setMenu(open, restoreFocus = false) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  if (restoreFocus) navToggle.focus();
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.addEventListener('click', e => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobile.matches && navLinks.classList.contains('open')) {
    setMenu(false, navLinks.contains(document.activeElement));
  }
});
mobile.addEventListener('change', () => {
  const focusWasInside = navLinks.contains(document.activeElement);
  setMenu(false, mobile.matches && focusWasInside);
});

let selectedCategory = 'all';
const filterBtns = document.querySelectorAll('.filter-btn');
const tourCards = document.querySelectorAll('.tour-card');
function renderFilter(category) {
  selectedCategory = category;
  filterBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.filter === selectedCategory);
    b.setAttribute('aria-pressed', String(b.dataset.filter === selectedCategory));
  });
  let count = 0;
  tourCards.forEach(card => {
    card.hidden = selectedCategory !== 'all' && card.dataset.region !== selectedCategory;
    if (!card.hidden) count++;
  });
  document.getElementById('filterStatus').textContent = count + (count === 1 ? ' passeio encontrado.' : ' passeios encontrados.');
}
filterBtns.forEach(btn => btn.addEventListener('click', () => renderFilter(btn.dataset.filter)));

const origin = document.getElementById('origin');
const details = document.getElementById('origin_details');
const date = document.getElementById('tdate');
const time = document.getElementById('ttime');
function localDate(now = new Date()) {
  return now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
}
function clearError(field) {
  field.classList.remove('error-border');
  field.removeAttribute('aria-invalid');
  const error = document.getElementById(field.id + '-error');
  if (error) { error.hidden = true; error.textContent = ''; }
}
function showError(field, message) {
  field.classList.add('error-border');
  field.setAttribute('aria-invalid', 'true');
  const error = document.getElementById(field.id + '-error');
  if (error) { error.textContent = message; error.hidden = false; }
}
function syncOrigin() {
  const needsDetails = ['Hotel / Pousada', 'Outro endereço'].includes(origin.value);
  document.getElementById('origin_details_container').classList.toggle('hidden', !needsDetails);
  details.required = needsDetails;
  details.disabled = !needsDetails;
  if (!needsDetails) clearError(details);
}
origin.addEventListener('change', syncOrigin);
syncOrigin();
date.min = localDate();
date.addEventListener('focus', () => { date.min = localDate(); });
const fieldLimits = { name: 100, phone: 30, destination: 200, origin_details: 200, msg: 2000 };
function cleanText(value) {
  return value.normalize('NFC').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
}
function validPhone(value) {
  if (!/^\+?[\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}
function fieldError(field) {
  const value = cleanText(field.value);
  if (field.required && !value) return errorMessage(field);
  if (fieldLimits[field.id] && value.length > fieldLimits[field.id]) {
    return 'Use no máximo ' + fieldLimits[field.id] + ' caracteres.';
  }
  if (field.id === 'phone' && value && !validPhone(value)) {
    return 'Informe um telefone com DDD ou código do país, usando de 8 a 15 dígitos.';
  }
  if (!field.validity.valid) return errorMessage(field);
  return '';
}
function errorMessage(field) {
  if (field.validity.rangeUnderflow) return 'Escolha uma data a partir de hoje.';
  if (field.validity.badInput) return 'Informe um valor válido.';
  const messages = {
    origin_details: 'Informe o nome do hotel ou o endereço completo.',
    destination: 'Informe o destino.',
    tdate: 'Informe a data do transfer.',
    ttime: 'Informe o horário do transfer.',
    name: 'Informe seu nome.',
    phone: 'Informe seu telefone.'
  };
  return messages[field.id] || 'Preencha este campo.';
}
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('invalid', e => showError(e.target, errorMessage(e.target)), true);
  form.querySelectorAll('input, textarea, select').forEach(field => {
    if (fieldLimits[field.id] && !document.getElementById(field.id + '-error')) {
      const error = document.createElement('p');
      error.id = field.id + '-error';
      error.className = 'field-error';
      error.hidden = true;
      field.insertAdjacentElement('afterend', error);
      const describedBy = field.getAttribute('aria-describedby');
      field.setAttribute('aria-describedby', [describedBy, error.id].filter(Boolean).join(' '));
    }
    field.addEventListener('input', () => {
      if (!fieldError(field)) clearError(field);
    });
  });
});
[date,time].forEach(field => field.addEventListener('input', () => {
  const selected = new Date(date.value + 'T' + time.value);
  if (date.value && time.value && selected >= new Date()) {
    clearError(date); clearError(time);
  }
}));
function validate(form) {
  let firstInvalid;
  date.min = localDate();
  form.querySelectorAll('input, textarea, select').forEach(field => {
    if (field.disabled) return;
    clearError(field);
    const message = fieldError(field);
    if (message) {
      showError(field, message);
      firstInvalid ||= field;
    }
  });
  if (firstInvalid) { firstInvalid.focus(); return false; }
  return true;
}
const WHATSAPP_NUMBER = '558335087774';
function whatsappUrl(message) {
  const url = new URL('https://wa.me/' + WHATSAPP_NUMBER);
  if (message) url.searchParams.set('text', message);
  return url.href;
}
function openWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}
// Keep existing button messages while centralizing the destination number.
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
  const current = new URL(link.href);
  link.href = whatsappUrl(current.searchParams.get('text'));
});
document.getElementById('transferForm').addEventListener('submit', e => {
  e.preventDefault();
  if (!validate(e.currentTarget)) return;
  const departureTime = new Date(date.value + 'T' + time.value);
  if (!Number.isFinite(departureTime.getTime()) || departureTime <= new Date()) {
    showError(time, 'Escolha uma data e um horário futuros.');
    time.focus();
    return;
  }
  const departure = origin.value + (details.disabled ? '' : ' (' + cleanText(details.value) + ')');
  openWhatsApp(`Olá! Quero cotar um transfer.\nPartida: ${departure}\nDestino: ${cleanText(document.getElementById('destination').value)}\nData: ${date.value.split('-').reverse().join('/')}\nHorário: ${time.value}\nPassageiros: ${document.getElementById('pax').value}`);
});
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  if (!validate(e.currentTarget)) return;
  const name = cleanText(document.getElementById('name').value);
  const phone = cleanText(document.getElementById('phone').value);
  const tour = document.getElementById('tour').value;
  const msg = cleanText(document.getElementById('msg').value);
  openWhatsApp(`Olá! Meu nome é ${name} (${phone}). Tenho interesse em: ${tour}. ${msg}`);
});
