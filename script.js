(() => {
  /* Honor site preference: no pinch zoom. */
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) viewport.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no');

  /* Keep the public Home URL clean: jasonconnor.com instead of /index.html. */
  if (/\/index\.html$/i.test(window.location.pathname)) {
    const cleanPath = window.location.pathname.replace(/index\.html$/i, '');
    history.replaceState(null, '', `${cleanPath}${window.location.search}${window.location.hash}`);
  }
  document.querySelectorAll('a[href="index.html"]').forEach(link => {
    link.setAttribute('href', '/');
  });

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  /* Career is the public page name and URL. Keep any older Experience links working cleanly. */
  document.querySelectorAll('a[href="experience.html"]').forEach(link => {
    link.setAttribute('href', 'career.html');
  });

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

})();