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
    .section-intro .eyebrow,
    .contact-copy>.eyebrow{
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
    .impact-meta span{font-size:15px!important;font-weight:600!important;color:var(--copper2)!important;letter-spacing:.08em!important}

    /* Hero proof strip */
    .hero-foot{margin-top:34px!important;padding-top:22px!important}
    .hero-foot strong{font-size:30px!important;line-height:1!important}
    .hero-foot span{font-size:12px!important;line-height:1.35!important;font-weight:600!important;color:rgba(255,255,255,.68)!important}
    .hero-foot div:nth-child(3) span{text-transform:none!important}

    /* Selected Work must carry the same visual weight as the rest of the site */
    .case{padding:42px!important}
    .case h3{font-size:34px!important;line-height:1.08!important;margin:24px 0 16px!important}
    .case>p{font-size:18px!important;line-height:1.55!important;color:#495864!important;margin:0!important}
    .case-result{
      margin-top:28px!important;
      padding-top:22px!important;
      font-family:'Archivo',Arial,sans-serif!important;
      font-size:17px!important;
      font-weight:400!important;
      line-height:1.5!important;
      color:var(--muted)!important;
    }
    .case-result strong{
      display:block!important;
      margin-bottom:8px!important;
      font-size:38px!important;
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

    /* Experience: compact continuous flow */
    .experience-block{gap:52px!important;padding:26px 0!important}
    .experience-block:first-child{padding-top:0!important}
    .experience-meta{top:108px!important}
    .company-name{font-size:27px!important;line-height:1.1!important}
    .location{font-size:15px!important;margin-top:5px!important}
    .role{padding-bottom:16px!important;margin:0!important}
    .role+.role{padding-top:0!important;margin-top:8px!important}
    .role-head{padding-bottom:15px!important}
    .role-head h3{font-size:34px!important;line-height:1.05!important}
    .role>p{font-size:18px!important;line-height:1.55!important;color:#43515d!important}
    .role ul{margin:20px 0 0!important;padding-left:24px!important;color:#52606c!important}
    .role li{margin:0 0 10px!important;line-height:1.52!important}
    .role li::marker{color:var(--copper)}
    .role-results{margin-top:24px!important;margin-bottom:0!important;gap:12px!important}
    .role-result{padding:22px!important;border:1px solid #ded2c4!important;border-left:4px solid var(--copper)!important;background:#efe7dc!important}
    .role-result strong{font-size:28px!important;line-height:1.05!important}
    .role-result span{font-size:16px!important;line-height:1.45!important}

    /* Footer */
    .footer-top{grid-template-columns:minmax(0,1fr) auto;gap:48px;align-items:end;padding-bottom:38px}
    .footer-title{font-size:clamp(28px,3vw,44px);max-width:760px}
    .footer-nav{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:12px 24px}
    .footer-nav a{font-size:13px}

    /* Systems & Tools: same typography strength as the rest of the homepage */
    .systems-layout{grid-template-columns:.9fr 1.1fr!important;gap:72px!important}
    .systems-copy .eyebrow{
      font:600 14px/1.25 'IBM Plex Mono',monospace!important;
      letter-spacing:.07em!important;
      color:var(--copper2)!important;
    }
    .systems-copy>p{
      font-size:19px!important;
      line-height:1.55!important;
      color:rgba(255,255,255,.78)!important;
      max-width:650px!important;
    }
    .systems-copy .button{font-size:14px!important}
    .flow{gap:0!important;border-top:1px solid rgba(255,255,255,.18)!important}
    .flow-row{
      padding:25px 0!important;
      border-top:0!important;
      border-bottom:1px solid rgba(255,255,255,.14)!important;
      gap:24px!important;
    }
    .flow-box{border:0!important;background:transparent!important;padding:0!important}
    .flow-box strong{
      display:block!important;
      font-size:20px!important;
      line-height:1.25!important;
      font-weight:720!important;
      color:white!important;
    }
    .flow-box span{
      display:block!important;
      margin-top:8px!important;
      font-size:16px!important;
      line-height:1.48!important;
      color:rgba(255,255,255,.7)!important;
    }
    .flow-arrow{font-size:18px!important;color:var(--copper2)!important}
    .flow-final{
      border:0!important;
      border-top:1px solid rgba(184,115,51,.7)!important;
      background:transparent!important;
      padding:26px 0 0!important;
      margin-top:0!important;
    }
    .flow-final strong{
      display:block!important;
      font-size:21px!important;
      line-height:1.3!important;
      color:white!important;
    }
    .flow-final span{
      display:block!important;
      margin-top:9px!important;
      font-size:16px!important;
      line-height:1.5!important;
      color:rgba(255,255,255,.7)!important;
    }

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
      .systems-layout{grid-template-columns:1fr!important;gap:48px!important}
    }

    @media(max-width:720px){
      .brand-monogram{width:48px!important;height:48px!important}
      .page-hero{padding:104px 0 46px}
      .page-hero .h1{font-size:clamp(36px,10vw,48px)}
      .page-hero .lead{font-size:16px}
      .philosophy-number,.metric-no,.capability .num,.principle .num,.system-section .eyebrow,.timeline-item .years,.role-head span,.case-company,.section-intro .eyebrow,.contact-copy>.eyebrow{font-size:13px!important}
      .question-row>span:first-child,.question-row>span:last-child{font-size:12px!important}
      .impact-meta span{font-size:14px!important}
      .metric-value{font-size:clamp(42px,12vw,56px);white-space:nowrap}
      .case{padding:28px 24px!important}
      .case h3{font-size:29px!important}
      .case>p{font-size:17px!important}
      .case-result{font-size:16px!important}
      .case-result strong{font-size:34px!important}
      .experience-block{padding:20px 0!important;gap:22px!important}
      .role{padding-bottom:12px!important}
      .role+.role{margin-top:4px!important}
      .role-head h3{font-size:30px!important}
      .role>p{font-size:17px!important}
      .role-result strong{font-size:25px!important}
      .role-result span{font-size:15px!important}
      .footer-top{grid-template-columns:1fr;gap:30px}
      .footer-title{font-size:30px}
      .footer-nav{justify-content:flex-start;gap:14px 22px}
      .systems-layout{grid-template-columns:1fr!important;gap:40px!important}
      .systems-copy>p{font-size:17px!important}
      .flow-row{grid-template-columns:1fr!important;padding:22px 0!important;gap:16px!important}
      .flow-box strong{font-size:18px!important}
      .flow-box span{font-size:15px!important}
      .flow-arrow{transform:rotate(90deg);text-align:center;font-size:16px!important}
      .flow-final strong{font-size:19px!important}
      .flow-final span{font-size:15px!important}
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

  /* Systems & Tools should read like operating content, not diagram captions */
  const systemBoxes = document.querySelectorAll('.systems-band .flow-box');
  const systemCopy = [
    ['ERP / shop-floor data', 'Orders · due dates · inventory · routings · current status'],
    ['Operational logic', 'Priorities · shortages · capacity · exceptions · operating risk'],
    ['Google Sheets / Apps Script', 'Automation · live views · workflow · decision support'],
    ['Management views', 'What needs attention, who owns it, and what happens next']
  ];
  systemBoxes.forEach((box, i) => {
    if (!systemCopy[i]) return;
    const strong = box.querySelector('strong');
    const span = box.querySelector('span');
    if (strong) strong.textContent = systemCopy[i][0];
    if (span) span.textContent = systemCopy[i][1];
  });
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