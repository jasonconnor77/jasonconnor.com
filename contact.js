(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');

  const style = document.createElement('style');
  style.textContent = `
    .form-submit-row{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:4px}
    .form-status{font:600 16px/1.4 'Archivo',Arial,sans-serif;color:var(--navy)}
    .form-status.error{color:#8a2f2f}
    .contact-form button[disabled]{opacity:.65;cursor:wait}
    @media(max-width:720px){
      .form-submit-row{align-items:flex-start;flex-direction:column;gap:12px}
      .form-status{font-size:15px}
    }
  `;
  document.head.appendChild(style);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = '';
    status.classList.remove('error');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree submission failed');

      form.reset();
      status.textContent = 'Message sent. Thanks for reaching out.';
    } catch (error) {
      status.textContent = 'Message not sent. Please try again.';
      status.classList.add('error');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();