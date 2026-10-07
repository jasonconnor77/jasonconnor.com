(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.classList.toggle('active', open);
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.classList.remove('active');
    document.body.classList.remove('menu-open');
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const company = String(data.get('company') || '').trim();
    const subjectChoice = String(data.get('subject') || 'Website inquiry').trim();
    const message = String(data.get('message') || '').trim();
    const reply = String(data.get('reply') || '').trim();

    if (!name || !message || !reply) {
      status.style.display = 'block';
      status.textContent = 'Please complete your name, reply email, and message.';
      return;
    }

    const user = 'jason';
    const host = 'jasonconnor.com';
    const address = `${user}@${host}`;
    const subject = `Website: ${subjectChoice}`;
    const body = [
      `Name: ${name}`,
      company ? `Company: ${company}` : '',
      `Reply email: ${reply}`,
      '',
      message
    ].filter(Boolean).join('\n');

    status.style.display = 'block';
    status.textContent = 'Opening your email application with the message prepared.';
    window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
