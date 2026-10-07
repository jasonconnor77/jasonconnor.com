(() => {
  const polish = document.createElement('style');
  polish.textContent = `
    /* Final refinement pass — preserve visual language, improve hierarchy */

    /* Use real logo in the header everywhere */
    .brand-monogram{
      width:58px!important;
      height:58px!important;
      border:0!important;
      font-size:0!important;
      background:url('assets/jc-logo.png') center/contain no-repeat!important;
    }
    .brand-monogram:after{display:none!important}

    /* Remove small templated labels above page heroes */
    .page-hero>.container>.eyebrow,
    .hero-copy>.eyebrow{display:none!important}

    /* One consistent bronze / mono hierarchy */
    .philosophy-number,
    .metric-no,
    .capability .num,
    .principle .num,
    .system-section .eyebrow,
    .timeline-item .years,
    .role-head span,
    .case-company,
    .section-intro .eyebrow{
      font:600 14px/1.25 'IBM Plex Mono',monospace!important;
      letter-spacing:.07em!important;
      color:var(--copper)!important;
    }
    .section-intro .eyebrow.light{color:var(--copper2)!important}
    .question-row>span:first-child{
      font:600 14px/1.25 'IBM Plex Mono',monospace!important;
      color:var(--copper)!important;
    }
    .question-row>span:last-child{
      font:600 13px/1.25 'IBM Plex Mono',monospace!important;
      letter-spacing:.07em!important;
    }
    .page-meta{font-size:12px!important;font-weight:500!important}

    /* Hero proof strip */
    .hero-foot{margin-top:34px!important;padding-top:22px!important}
    .hero-foot strong{font-size:30px!important;line-height:1!important}
    .hero-foot span{font-size:12px!important;line-height:1.35!important;font-weight:600!important;color:rgba(255,255,255,.68)!important}
    .hero-foot div:nth-child(3) span{text-transform:none!important}

    /* Selected-work result copy must match the rest of the site body text */
    .case-result{
      font-family:'Archivo',Arial,sans-serif!important;
      font-size:17px!important;
      font-weight:400!important;
      line-height:1.5!important;
      color:var(--muted)!important;
    }
    .case-result strong{
      display:block!important;
      margin-bottom:7px!important;
      font-size:36px!important;
      line-height:1!important;
      color:var(--navy)!important;
    }

    /* Keep impact values on one line */
    .metric-row{grid-template-columns:180px minmax(360px,390px) 1fr}
    .metric-value{white-space:nowrap}

    /* Interior page scale — Experience remains benchmark */
    .page-hero{padding:132px 0 58px}
    .page-hero .h1{font-size:clamp(40px,4.4vw,64px);max-width:930px}
    .page-hero .lead{font-size:clamp(17px,1.5vw,21px);margin-top:20px}
    .page-meta{margin-top:28px}

    /* Experience: tighter flow and stronger hierarchy */
    .experience-block{gap:52px!important;padding:42px 0!important}
    .experience-block:first-child{padding-top:0!important}
    .experience-meta{top:108px!important}
    .company-name{font-size:27px!important;line-height:1.1!important}
    .location{font-size:15px!important;margin-top:5px!important}
    .role{padding-bottom:36px!important}
    .role+.role{padding-top:8px!important}
    .role-head{padding-bottom:15px!important}
    .role-head h3{font-size:34px!important;line-height:1.05!important}
    .role>p{font-size:18px!important;line-height:1.55!important;color:#43515d!important}
    .role ul{margin:20px 0 0!important;padding-left:24px!important;color:#52606c!important}
    .role li{margin:0 0 10px!important;line-height:1.52!important}
    .role li::marker{color:var(--copper)}
    .role-results{margin-top:24px!important;gap:12px!important}
    .role-result{padding:22px!important;border:1px solid #ded2c4!important;border-left:4px solid var(--copper)!important;background:#efe7dc!important}
    .role-result strong{font-size:28px!important;line-height:1.05!important}
    .role-result span{font-size:16px!important;line-height:1.45!important}

    /* Footer */
    .footer-top{grid-template-columns:minmax(0,1fr) auto;gap:48px;align-items:end;padding-bottom:38px}
    .footer-title{font-size:clamp(28px,3vw,44px);max-width:650px}
    .footer-nav{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:12px 24px}
    .footer-nav a{font-size:13px}

    /* Systems flow: flatter, less diagram-like */
    .flow{gap:0}
    .flow-row{padding:18px 0;border-top:1px solid rgba(255,255,255,.14)}
    .flow-box{border:0!important;background:transparent!important;padding:0!important}
    .flow-final{border:0!important;border-top:1px solid rgba(184,115,51,.65)!important;background:transparent!important;padding:20px 0 0!important;margin-top:4px}

    @media(min-width:721px){
      .hero,.hero-grid{min-height:0!important}
      .hero-grid{grid-template-columns:minmax(0,1.22fr) minmax(300px,.58fr);gap:64px}
      .hero-copy{padding:126px 0 42px!important}
      .display{font-size:clamp(46px,5.3vw,78px)}
      .hero-copy .lead{font-size:clamp(18px,1.55vw,22px);margin-top:24px}
      .hero-portrait{height:500px!important;align-self:center;margin:88px 0 28px!important;border:1px solid rgba(255,255,255,.08)}
      .hero-portrait img{object-position:center 18%}
    }

    @media(max-width:1000px) and (min-width:721px){
      .metric-row{grid-template-columns:110px minmax(300px,340px) 1fr;gap:24px}
      .footer-top{grid-template-columns:1fr;align-items:start}
      .footer-nav{justify-content:flex-start}
    }

    @media(max-width:720px){
      .brand-monogram{width:48px!important;height:48px!important}
      .page-hero{padding:104px 0 46px}
      .page-hero .h1{font-size:clamp(36px,10vw,48px)}
      .page-hero .lead{font-size:16px}
      .philosophy-number,.metric-no,.capability .num,.principle .num,.system-section .eyebrow,.timeline-item .years,.role-head span,.case-company,.section-intro .eyebrow{font-size:13px!important}
      .question-row>span:first-child,.question-row>span:last-child{font-size:12px!important}
      .metric-value{font-size:clamp(42px,12vw,56px);white-space:nowrap}
      .case-result{font-size:16px!important}
      .case-result strong{font-size:34px!important}
      .experience-block{padding:34px 0!important;gap:24px!important}
      .role{padding-bottom:28px!important}
      .role-head h3{font-size:30px!important}
      .role>p{font-size:17px!important}
      .role-result strong{font-size:25px!important}
      .role-result span{font-size:15px!important}
      .footer-top{grid-template-columns:1fr;gap:30px}
      .footer-title{font-size:30px}
      .footer-nav{justify-content:flex-start;gap:14px 22px}
      .hero,.hero-grid,.hero-copy{min-height:auto!important}
      .hero-copy{padding:108px 0 28px!important}
      .hero-foot strong{font-size:25px!important}
      .hero-foot span{font-size:10px!important}
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

  const skuLabel = document.querySelector('.hero-foot div:nth-child(3) span');
  if (skuLabel) skuLabel.textContent = 'SKUs STABILIZED';
})();
