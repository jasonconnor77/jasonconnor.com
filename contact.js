(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  if (!button || !status) return;

  const style = document.createElement('style');
  style.textContent = `
    .form-submit-row{
      display:flex!important;
      align-items:center!important;
      gap:18px!important;
      flex-wrap:wrap!important;
      margin-top:6px!important;
      min-height:56px!important;
    }
    .form-status{
      display:none;
      align-items:center;
      gap:10px;
      min-height:46px;
      padding:10px 15px 10px 11px;
      border:1px solid #b9dcc7;
      border-left:4px solid #2f7d4b;
      background:#eaf5ee;
      font:650 16px/1.35 'Archivo',Arial,sans-serif!important;
      color:#1f5d38!important;
      opacity:1!important;
      visibility:visible!important;
    }
    .form-status.show{display:inline-flex!important}
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
    @media(max-width:720px){
      .form-submit-row{align-items:flex-start!important;flex-direction:column!important;gap:12px!important}
      .form-status{font-size:15px!important;width:100%}
    }
  `;
  document.head.appendChild(style);

  const showStatus = (message, isError = false) => {
    status.textContent = message;
    status.classList.toggle('error', isError);
    status.classList.toggle('success', !isError);
    status.classList.add('show');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
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

      showStatus("Message sent. Thanks for reaching out — I’ll be in touch soon.");
      form.reset();
    } catch (error) {
      showStatus('Message not sent. Please try again.', true);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();