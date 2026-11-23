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

  /* On mobile, only the tertiary tagline and bottom padding collapse.
     Hold one expanded-size page spacer to prevent layout jumping, while
     Career's pinned company and role follow the current header height. */
  const mobileHeaderQuery = window.matchMedia('(max-width:720px)');
  let subtitleMuted = false;
  let expandedHeaderHeight = 0;
  let previousWidth = window.innerWidth;
  let measureFrame = 0;

  const measureHeader = () => {
    measureFrame = 0;
    if (!header || !mobileHeaderQuery.matches) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--jc-mobile-header-height', `${height}px`);
    // Reconcile the spacer whenever the fully expanded header is at the top.
    // Fonts and iPhone viewport settling can change its intrinsic height after
    // the first measurement; leave the spacer untouched during scrolling.
    if (!subtitleMuted && (expandedHeaderHeight === 0 || window.scrollY <= 1) &&
        Math.abs(expandedHeaderHeight - height) > 1) {
      expandedHeaderHeight = height;
      document.documentElement.style.setProperty('--jc-mobile-header-expanded-height', `${height}px`);
    }
  };
  const scheduleHeaderMeasure = () => {
    if (!measureFrame) measureFrame = requestAnimationFrame(measureHeader);
  };
  const updateSubtitle = () => {
    if (!header) return;
    if (!mobileHeaderQuery.matches) {
      subtitleMuted = false;
      header.classList.remove('subtitle-muted');
      return;
    }
    const scroll = Math.max(0, window.scrollY || 0);
    // Different thresholds on the way down/up prevent flicker.
    if (!subtitleMuted && scroll > 110) subtitleMuted = true;
    else if (subtitleMuted && scroll < 40) subtitleMuted = false;
    header.classList.toggle('subtitle-muted', subtitleMuted);
    scheduleHeaderMeasure();
  };
  const updateHeader = () => {
    if (!header) return;
    if (mobileHeaderQuery.matches) {
      header.classList.remove('mobile-compact', 'scrolled');
      measureHeader();
      updateSubtitle();
    } else {
      header.classList.remove('mobile-compact', 'subtitle-muted');
      header.classList.toggle('scrolled', window.scrollY > 18);
    }
  };
  if ('ResizeObserver' in window && header) {
    new ResizeObserver(scheduleHeaderMeasure).observe(header);
  }
  window.addEventListener('resize', () => {
    if (mobileHeaderQuery.matches && window.innerWidth !== previousWidth) {
      header?.classList.remove('subtitle-muted');
      subtitleMuted = false;
      expandedHeaderHeight = 0;
      measureHeader();
    }
    previousWidth = window.innerWidth;
    updateHeader();
  }, { passive:true });
  window.addEventListener('scroll', () => {
    if (mobileHeaderQuery.matches) updateSubtitle();
    else updateHeader();
  }, { passive:true });
  mobileHeaderQuery.addEventListener?.('change', () => {
    subtitleMuted = false;
    header?.classList.remove('subtitle-muted');
    expandedHeaderHeight = 0;
    updateHeader();
  });
  document.fonts?.ready?.then(() => {
    if (mobileHeaderQuery.matches && !subtitleMuted) expandedHeaderHeight = 0;
    scheduleHeaderMeasure();
  });
  updateHeader();

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