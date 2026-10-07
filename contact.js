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
      min-height:52px!important;
    }
    .form-status{
      display:none;
      align-items:center;
      min-height:42px;
      padding:10px 14px;
      border-left:3px solid var(--copper);
      background:#f1e9df;
      font:600 16px/1.35 'Archivo',Arial,sans-serif!important;
      color:var(--navy)!important;
      opacity:1!important;
      visibility:visible!important;
    }
    .form-status.show{display:inline-flex!important}
    .form-status.error{
      border-left-color:#8a2f2f!important;
      background:#f5e7e7!important;
      color:#8a2f2f!important;
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
    status.classList.add('show');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = '';
    status.classList.remove('show', 'error');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree submission failed');

      showStatus('Message sent. Thanks for reaching out.');
      form.reset();
    } catch (error) {
      showStatus('Message not sent. Please try again.', true);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();