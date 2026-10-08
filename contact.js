(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const subject = form.querySelector('#subject');
  if (!button || !status) return;

  const style = document.createElement('style');
  style.textContent = `
    .form-submit-row{
      display:grid!important;
      grid-template-columns:max-content minmax(0,1fr)!important;
      align-items:center!important;
      gap:14px!important;
      margin-top:6px!important;
      min-height:56px!important;
    }
    .form-status{
      display:none;
      align-items:center;
      justify-content:center;
      gap:10px;
      min-width:0;
      min-height:52px;
      padding:9px 14px 9px 10px;
      border:1px solid #b9dcc7;
      border-left:4px solid #2f7d4b;
      background:#eaf5ee;
      font:650 15px/1.35 'Archivo',Arial,sans-serif!important;
      color:#1f5d38!important;
      opacity:1!important;
      visibility:visible!important;
    }
    .form-status.show{display:flex!important}
    .form-status.success::before{
      content:'✓';
      display:inline-grid;
      place-items:center;
      flex:0 0 25px;
      width:25px;
      height:25px;
      border-radius:50%;
      background:#2f7d4b;
      color:#fff;
      font:800 15px/1 Arial,sans-serif;
    }
    .status-copy{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      text-align:center;
      line-height:1.3;
    }
    .status-copy span+span{margin-top:2px}
    .form-status.error{
      border-color:#e2bcbc!important;
      border-left-color:#8a2f2f!important;
      background:#f8ecec!important;
      color:#8a2f2f!important;
    }
    .form-status.error::before{
      content:'!';
      display:inline-grid;
      place-items:center;
      flex:0 0 25px;
      width:25px;
      height:25px;
      border-radius:50%;
      background:#8a2f2f;
      color:#fff;
      font:800 15px/1 Arial,sans-serif;
    }
    .contact-form button[disabled]{opacity:.65;cursor:wait}

    .custom-select{display:none;position:relative}
    .custom-select-menu{display:none}

    @media(max-width:720px){
      .form-submit-row{
        grid-template-columns:1fr!important;
        align-items:start!important;
        gap:12px!important;
      }
      .form-submit-row .button{justify-self:start}
      .form-status{font-size:15px!important;width:100%}

      .custom-select-native{display:none!important}
      .custom-select{display:block!important;width:100%}
      .custom-select-trigger{
        position:relative;
        width:100%;
        min-height:56px;
        padding:12px 44px 12px 0;
        border:0;
        border-bottom:1px solid #B9B4AD;
        border-radius:0;
        background:transparent;
        color:#101820;
        font:500 17px/1.35 'Archivo',Arial,sans-serif;
        text-align:left;
        -webkit-appearance:none;
        appearance:none;
      }
      .custom-select-trigger::after{
        content:'';
        position:absolute;
        right:5px;
        top:50%;
        width:9px;
        height:9px;
        border-right:2px solid #17324D;
        border-bottom:2px solid #17324D;
        transform:translateY(-68%) rotate(45deg);
        transition:transform .18s ease;
      }
      .custom-select.open .custom-select-trigger::after{
        transform:translateY(-28%) rotate(225deg);
      }
      .custom-select-trigger:focus{
        outline:0;
        border-bottom-color:#B87333;
      }
      .custom-select.invalid .custom-select-trigger{
        border-bottom-color:#9a3b3b;
      }
      .custom-select-error{
        display:none;
        margin-top:7px;
        color:#8a2f2f;
        font:600 13px/1.35 'Archivo',Arial,sans-serif;
      }
      .custom-select.invalid .custom-select-error{display:block}
      .custom-select-menu{
        position:absolute;
        z-index:600;
        left:0;
        right:0;
        top:calc(100% + 7px);
        display:none;
        max-height:286px;
        overflow:auto;
        -webkit-overflow-scrolling:touch;
        border:1px solid #d7d1ca;
        border-top:3px solid #B87333;
        background:#fff;
        box-shadow:0 18px 44px rgba(12,27,41,.18);
      }
      .custom-select.open .custom-select-menu{display:block}
      .custom-select.open-up .custom-select-menu{
        top:auto;
        bottom:calc(100% + 7px);
      }
      .custom-select-option{
        display:flex;
        align-items:center;
        width:100%;
        min-height:48px;
        padding:11px 15px;
        border:0;
        border-bottom:1px solid #ece8e3;
        background:#fff;
        color:#17324D;
        font:500 16px/1.3 'Archivo',Arial,sans-serif;
        text-align:left;
      }
      .custom-select-option:last-child{border-bottom:0}
      .custom-select-option[aria-selected="true"]{
        background:#F3EEE8;
        font-weight:700;
      }
      .custom-select-option:focus{
        outline:0;
        background:#F3EEE8;
      }
    }
  `;
  document.head.appendChild(style);

  let customSelect = null;
  let customTrigger = null;
  let customError = null;
  const mobileQuery = window.matchMedia('(max-width:720px)');

  const closeCustomSelect = () => {
    if (!customSelect || !customTrigger) return;
    customSelect.classList.remove('open', 'open-up');
    customTrigger.setAttribute('aria-expanded', 'false');
  };

  const syncCustomSelect = () => {
    if (!subject || !customSelect || !customTrigger) return;
    const selected = subject.options[subject.selectedIndex];
    customTrigger.textContent = subject.value ? selected.textContent : 'Select One';
    customSelect.querySelectorAll('.custom-select-option').forEach(option => {
      option.setAttribute('aria-selected', String(option.dataset.value === subject.value));
    });
  };

  if (subject) {
    subject.classList.add('custom-select-native');

    customSelect = document.createElement('div');
    customSelect.className = 'custom-select';

    customTrigger = document.createElement('button');
    customTrigger.type = 'button';
    customTrigger.className = 'custom-select-trigger';
    customTrigger.setAttribute('aria-haspopup', 'listbox');
    customTrigger.setAttribute('aria-expanded', 'false');
    customTrigger.setAttribute('aria-controls', 'subject-custom-list');

    const menu = document.createElement('div');
    menu.className = 'custom-select-menu';
    menu.id = 'subject-custom-list';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'Reason For Reaching Out');

    Array.from(subject.options).filter(option => option.value).forEach(option => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'custom-select-option';
      item.dataset.value = option.value;
      item.textContent = option.textContent;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      item.addEventListener('click', () => {
        subject.value = item.dataset.value;
        subject.dispatchEvent(new Event('change', { bubbles: true }));
        customSelect.classList.remove('invalid');
        syncCustomSelect();
        closeCustomSelect();
        customTrigger.focus();
      });
      menu.appendChild(item);
    });

    customError = document.createElement('div');
    customError.className = 'custom-select-error';
    customError.textContent = 'Please select a reason.';

    customSelect.append(customTrigger, menu, customError);
    subject.insertAdjacentElement('afterend', customSelect);
    syncCustomSelect();

    customTrigger.addEventListener('click', () => {
      if (!mobileQuery.matches) return;
      const opening = !customSelect.classList.contains('open');
      closeCustomSelect();
      if (!opening) return;

      const rect = customTrigger.getBoundingClientRect();
      const availableBelow = window.innerHeight - rect.bottom;
      const availableAbove = rect.top;
      if (availableBelow < 300 && availableAbove > availableBelow) {
        customSelect.classList.add('open-up');
      }
      customSelect.classList.add('open');
      customTrigger.setAttribute('aria-expanded', 'true');
    });

    document.addEventListener('click', event => {
      if (customSelect && !customSelect.contains(event.target)) closeCustomSelect();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeCustomSelect();
    });

    mobileQuery.addEventListener?.('change', closeCustomSelect);
  }

  const showStatus = (message, isError = false) => {
    status.classList.toggle('error', isError);
    status.classList.toggle('success', !isError);
    if (isError) {
      status.textContent = message;
    } else {
      status.innerHTML = '<span class="status-copy"><span>Message sent. Thank you for reaching out.</span><span>I’ll be in touch soon.</span></span>';
    }
    status.classList.add('show');
  };

  form.addEventListener('reset', () => {
    setTimeout(() => {
      customSelect?.classList.remove('invalid');
      syncCustomSelect();
    }, 0);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (mobileQuery.matches && subject && !subject.value) {
      customSelect?.classList.add('invalid');
      customTrigger?.focus();
      return;
    }
    if (!form.reportValidity()) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = '';
    status.classList.remove('show', 'success', 'error');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree submission failed');

      showStatus('success');
      form.reset();
    } catch (error) {
      showStatus('Message not sent. Please try again.', true);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();