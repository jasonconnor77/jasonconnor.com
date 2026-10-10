(() => {
  /* Honor site preference: no pinch zoom. */
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) viewport.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no');

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    nav?.classList.remove('open');
    menuButton?.classList.remove('active');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.classList.toggle('active', open);
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('pointerdown', event => {
    if (!window.matchMedia('(max-width:720px)').matches || !nav?.classList.contains('open')) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (nav.contains(target) || menuButton?.contains(target)) return;
    closeMenu();
  });

  /* Header/footer navigation should always open the destination at the top. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const forceTop = sessionStorage.getItem('jcForceTop') === '1';
  if (forceTop) {
    sessionStorage.removeItem('jcForceTop');
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    setTimeout(() => window.scrollTo(0, 0), 0);
  }
  window.addEventListener('pageshow', () => {
    if (forceTop) window.scrollTo(0, 0);
  });
  document.querySelectorAll('.site-header a, .site-footer a').forEach(link => {
    link.addEventListener('click', () => sessionStorage.setItem('jcForceTop', '1'));
  });

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

  /* Site-wide brand descriptor. */
  const descriptor = 'Manufacturing Operations · Production Leadership · Operational Turnarounds';
  document.querySelectorAll('.brand-text span').forEach(el => { el.textContent = descriptor; });
  document.querySelectorAll('.footer-bottom>span:last-child').forEach(el => { el.textContent = descriptor; });

  /* Keep Jason Connor attached to the footer statement on every page. */
  document.querySelectorAll('.footer-top>div:first-child').forEach(block => {
    let label = block.querySelector('.eyebrow');
    if (!label) {
      label = document.createElement('p');
      label.className = 'eyebrow light';
      block.prepend(label);
    }
    label.textContent = 'Jason Connor';
  });

  const skuLabel = document.querySelector('.hero-foot div:nth-child(3) span');
  if (skuLabel) skuLabel.textContent = 'SKUs STABILIZED';

  /* Stronger, more specific homepage Selected Work copy */
  const caseDescriptions = [
    'Led daily production, reset priorities around demand, material, labor, and capacity, and built real-time visibility across a large standard product line.',
    'Reworked machine loading and sequencing around actual capacity, labor, material availability, downtime, and changing customer demand.',
    'Redesigned receiving, staging, job-specific material organization, shortage visibility, and supplier follow-up to improve production readiness.',
    'Supported rapid growth in SKU count, annual production volume, and inventory while maintaining tight material control and 99.2% inventory accuracy.'
  ];
  document.querySelectorAll('.case-grid .case>p').forEach((el, i) => {
    if (caseDescriptions[i]) el.textContent = caseDescriptions[i];
  });

  /* Keep the final Home Systems conclusion wording consistent without rewriting card copy. */
  const flowFinal = document.querySelector('.systems-band .flow-final');
  if (flowFinal) {
    const strong = flowFinal.querySelector('strong');
    const span = flowFinal.querySelector('span');
    if (strong) strong.textContent = 'The goal is faster, better operating decisions.';
    if (span) span.textContent = 'A useful system turns ERP and shop-floor data into a clear answer managers can act on without digging through reports.';
  }

  /* Keep website footer aligned with the business-card brand language */
  document.querySelectorAll('.footer-title').forEach(el => {
    el.textContent = 'Manufacturing leadership built around people, clear priorities, disciplined execution, accountability, and measurable results.';
  });
})();