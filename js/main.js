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

  // Dynamic Date Constraint for Date Pickers
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${yyyy}-${mm}-${dd}`;

  const tdateInput = document.getElementById('tdate');
  if (tdateInput) {
    tdateInput.setAttribute('min', formattedToday);
  }

  // Conditional Origin Details
  const originSelect = document.getElementById('origin');
  const originDetailsContainer = document.getElementById('origin_details_container');
  if (originSelect && originDetailsContainer) {
    originSelect.addEventListener('change', () => {
      if (originSelect.value === 'Hotel / Pousada' || originSelect.value === 'Outro endereço') {
        originDetailsContainer.classList.remove('hidden');
      } else {
        originDetailsContainer.classList.add('hidden');
      }
    });
  }

  function clearErrors() {
    document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
  }

  function showError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.classList.add('error-border');
      el.focus();
    }
  }

  function sendTransferQuote(e){
    e.preventDefault();
    clearErrors();

    const origin = document.getElementById('origin').value.trim();
    let originDetails = '';

    if (origin === 'Hotel / Pousada' || origin === 'Outro endereço') {
        originDetails = document.getElementById('origin_details').value.trim();
        if (originDetails.length === 0) {
            showError('origin_details');
            return false;
        }
    }

    const destination = document.getElementById('destination').value.trim();
    if (destination.length === 0) {
        showError('destination');
        return false;
    }

    const date = document.getElementById('tdate').value;
    const time = document.getElementById('ttime').value;
    const pax = document.getElementById('pax').value.trim();

    // Require Date
    if (!date) {
        showError('tdate');
        return false;
    }

    // Check if the selected date and time are in the past
    const now = new Date();
    // If no time is provided, don't check for past time on the same day.
    // Only block if the selected date is strictly before today.
    // Since 'min' attribute handles the date selection in UI, this is an extra check.
    if (time) {
        const selectedDateTime = new Date(`${date}T${time}`);
        if (selectedDateTime < now) {
            showError('tdate');
            showError('ttime');
            return false;
        }
    } else {
        const selectedDateOnly = new Date(`${date}T00:00:00`);
        const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (selectedDateOnly < todayDateOnly) {
            showError('tdate');
            return false;
        }
    }

    const dateFmt = date ? date.split('-').reverse().join('/') : 'a combinar';
    let originText = origin;
    if (originDetails) {
        originText += ` (${originDetails})`;
    }

    const text = `Olá! Quero cotar um transfer.\nPartida: ${originText}\nDestino: ${destination}\nData: ${dateFmt}\nHorário: ${time || 'a combinar'}\nPassageiros: ${pax}`;
    window.open(`https://wa.me/558335087774?text=${encodeURIComponent(text)}`, '_blank');
    return false;
  }

  function sendToWhatsApp(e){
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    if (name.length === 0) {
        showError('name');
        return false;
    }

    const phone = document.getElementById('phone').value.trim();
    if (phone.length === 0) {
        showError('phone');
        return false;
    }

    const tour = document.getElementById('tour').value;
    const msg = document.getElementById('msg').value.trim();

    const text = `Olá! Meu nome é ${name} (${phone}). Tenho interesse em: ${tour}. ${msg}`;
    window.open(`https://wa.me/558335087774?text=${encodeURIComponent(text)}`, '_blank');
    return false;
  }
