  document.getElementById('year').textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const filterBtns = document.querySelectorAll('.filter-btn');
  const tourCards = document.querySelectorAll('.tour-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      tourCards.forEach(card => {
        card.style.display = (f === 'all' || card.dataset.region === f) ? '' : 'none';
      });
    });
  });

  function sendTransferQuote(e){
    e.preventDefault();
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('tdate').value;
    const time = document.getElementById('ttime').value;
    const pax = document.getElementById('pax').value.trim();
    const dateFmt = date ? date.split('-').reverse().join('/') : 'a combinar';
    const text = `Olá! Quero cotar um transfer.\nPartida: ${origin}\nDestino: ${destination}\nData: ${dateFmt}\nHorário: ${time || 'a combinar'}\nPassageiros: ${pax}`;
    window.open(`https://wa.me/558335087774?text=${encodeURIComponent(text)}`, '_blank');
    return false;
  }

  function sendToWhatsApp(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const tour = document.getElementById('tour').value;
    const msg = document.getElementById('msg').value.trim();
    const text = `Olá! Meu nome é ${name} (${phone}). Tenho interesse em: ${tour}. ${msg}`;
    window.open(`https://wa.me/558335087774?text=${encodeURIComponent(text)}`, '_blank');
    return false;
  }
