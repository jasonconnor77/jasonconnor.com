(() => {
  const polish = document.createElement('style');
  polish.textContent = `
    /* refinement pass — preserve existing visual language, improve scale/readability */
    .metric-row{grid-template-columns:180px minmax(360px,390px) 1fr}
    .metric-value{white-space:nowrap}
    .metric-no,
    .capability .num,
    .principle .num,
    .system-section .eyebrow,
    .philosophy-number{font-size:13px!important;font-weight:600!important;letter-spacing:.08em!important}
    .question-row>span{font-size:12px}
    .timeline-item .years,
    .role-head span{font:600 14px/1.2 'IBM Plex Mono',monospace!important;color:var(--copper)!important;letter-spacing:.07em!important;text-transform:uppercase}
    .timeline-item .years{display:inline-block;margin-bottom:4px}
    .page-meta{font-size:12px}

    .page-hero{padding:132px 0 58px}
    .page-hero .h1{font-size:clamp(40px,4.4vw,64px);max-width:930px}
    .page-hero .lead{font-size:clamp(17px,1.5vw,21px);margin-top:20px}
    .page-meta{margin-top:28px}

    .footer-top{grid-template-columns:minmax(0,1fr) auto;gap:48px;align-items:end;padding-bottom:38px}
    .footer-title{font-size:clamp(28px,3vw,44px);max-width:650px}
    .footer-nav{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:12px 24px}
    .footer-nav a{font-size:13px}

    .flow{gap:0}
    .flow-row{padding:18px 0;border-top:1px solid rgba(255,255,255,.14)}
    .flow-box{border:0!important;background:transparent!important;padding:0!important}
    .flow-final{border:0!important;border-top:1px solid rgba(184,115,51,.65)!important;background:transparent!important;padding:20px 0 0!important;margin-top:4px}

    @media(min-width:721px){
      .hero{min-height:680px}
      .hero-grid{min-height:680px;grid-template-columns:minmax(0,1.22fr) minmax(300px,.58fr);gap:64px}
      .hero-copy{padding:132px 0 64px}
      .display{font-size:clamp(46px,5.3vw,78px)}
      .hero-copy .lead{font-size:clamp(18px,1.55vw,22px);margin-top:24px}
      .hero-foot{margin-top:38px}
      .hero-portrait{height:520px;align-self:center;margin-top:56px;margin-bottom:24px;border:1px solid rgba(255,255,255,.08)}
      .hero-portrait img{object-position:center 18%}
    }

    @media(max-width:1000px) and (min-width:721px){
      .metric-row{grid-template-columns:110px minmax(300px,340px) 1fr;gap:24px}
      .footer-top{grid-template-columns:1fr;align-items:start}
      .footer-nav{justify-content:flex-start}
    }

    @media(max-width:720px){
      .page-hero{padding:104px 0 46px}
      .page-hero .h1{font-size:clamp(36px,10vw,48px)}
      .page-hero .lead{font-size:16px}
      .timeline-item .years,.role-head span{font-size:13px!important}
      .metric-no,.capability .num,.principle .num,.system-section .eyebrow,.philosophy-number{font-size:12px!important}
      .metric-value{font-size:clamp(42px,12vw,56px);white-space:nowrap}
      .footer-top{grid-template-columns:1fr;gap:30px}
      .footer-title{font-size:30px}
      .footer-nav{justify-content:flex-start;gap:14px 22px}
    }
  `;
  document.head.appendChild(polish);

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
})();
