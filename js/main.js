
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

const filterBtns = document.querySelectorAll('.filter-btn');
const tourCards = document.querySelectorAll('.tour-card');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => {
    b.classList.toggle('active', b === btn);
    b.setAttribute('aria-pressed', String(b === btn));
  });
  let count = 0;
  tourCards.forEach(card => {
    card.hidden = btn.dataset.filter !== 'all' && card.dataset.region !== btn.dataset.filter;
    if (!card.hidden) count++;
  });
  document.getElementById('filterStatus').textContent = count + (count === 1 ? ' passeio encontrado.' : ' passeios encontrados.');
}));

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
  form.querySelectorAll('input').forEach(field => {
    field.addEventListener('input', () => {
      if (field.validity.valid && field.value.trim()) clearError(field);
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
  form.querySelectorAll('input').forEach(field => {
    if (field.disabled) return;
    clearError(field);
    if (!field.validity.valid || (field.required && !field.value.trim())) {
      showError(field, errorMessage(field));
      firstInvalid ||= field;
    }
  });
  if (firstInvalid) { firstInvalid.focus(); return false; }
  return true;
}
function openWhatsApp(message) {
  window.open('https://wa.me/558335087774?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
}
document.getElementById('transferForm').addEventListener('submit', e => {
  e.preventDefault();
  if (!validate(e.currentTarget)) return;
  if (new Date(date.value + 'T' + time.value) < new Date()) {
    showError(time, 'Escolha uma data e um horário futuros.');
    time.focus();
    return;
  }
  const departure = origin.value + (details.disabled ? '' : ' (' + details.value.trim() + ')');
  openWhatsApp(`Olá! Quero cotar um transfer.\nPartida: ${departure}\nDestino: ${document.getElementById('destination').value.trim()}\nData: ${date.value.split('-').reverse().join('/')}\nHorário: ${time.value}\nPassageiros: ${document.getElementById('pax').value}`);
});
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  if (!validate(e.currentTarget)) return;
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const tour = document.getElementById('tour').value;
  const msg = document.getElementById('msg').value.trim();
  openWhatsApp(`Olá! Meu nome é ${name} (${phone}). Tenho interesse em: ${tour}. ${msg}`);
});
