(() => {
  const form = document.querySelector('#contactForm');
  const dialog = document.querySelector('#bookingDialog');
  if (!form || !dialog) return;

  const config = window.RR_SITE_CONFIG || {};
  const isEnglish = () => document.documentElement.lang === 'en';
  const text = (pt, en) => isEnglish() ? en : pt;
  function publicUrl(value, host, pathPattern) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === host && !url.username &&
        !url.password && !url.port && pathPattern.test(url.pathname) ? url : null;
    } catch { return null; }
  }
  const bookingUrl = publicUrl(config.bookingUrl, 'calendly.com', /^\/[^/]+(?:\/[^/]+)?\/?$/);
  const endpoint = publicUrl(config.contactEndpoint, 'formspree.io', /^\/f\/[A-Za-z0-9]+\/?$/);
  const submitLabel = form.querySelector('[type=submit] span');
  const formNote = form.querySelector('small span');
  const status = document.querySelector('#contactStatus');
  const submit = form.querySelector('[type=submit]');
  const embed = document.querySelector('#bookingEmbed');
  const unavailable = document.querySelector('#bookingUnavailable');
  const fallback = document.querySelector('#bookingFallback');
  const external = document.querySelector('#bookingExternal');
  let state = '';
  let pending = false;

  const messages = {
    sending: ['A enviar a sua mensagem…', 'Sending your message…'],
    success: ['Mensagem enviada. Obrigado pelo contacto.', 'Message sent. Thank you for getting in touch.'],
    error: ['Não foi possível confirmar o envio. Os seus dados foram mantidos; tente novamente ou contacte-nos por email.', 'We could not confirm delivery. Your details have been kept; try again or contact us by email.'],
    config: ['O envio ainda não está disponível. Contacte-nos através do endereço de email indicado.', 'Sending is not available yet. Please contact us at the email address shown.'],
  };
  function render() {
    if (endpoint) {
      submitLabel.textContent = pending ? text('A enviar…', 'Sending…') : text('Enviar mensagem', 'Send message');
      formNote.textContent = text('A mensagem é enviada através do Formspree. Utilize este formulário apenas para o primeiro contacto; não envie documentos ou dados fiscais sensíveis.', 'Your message is sent through Formspree. Use this form for initial enquiries only; do not send documents or sensitive tax information.');
    }
    status.textContent = messages[state] ? messages[state][isEnglish() ? 1 : 0] : '';
    status.dataset.state = state;
    unavailable.hidden = Boolean(bookingUrl);
    fallback.hidden = !bookingUrl;
    const frame = embed.querySelector('iframe');
    if (frame) frame.title = text('Agenda de marcações', 'Meeting booking calendar');
    if (!bookingUrl) {
      document.querySelector('.booking-cta p').textContent = text('A agenda online estará disponível em breve. Entretanto, pode pedir uma reunião pelo formulário.', 'The online calendar will be available soon. In the meantime, you can request a meeting using the form.');
    }
  }

  document.querySelector('#openBooking').addEventListener('click', () => {
    if (dialog.open) return;
    if (bookingUrl) {
      const url = new URL(bookingUrl.href);
      url.searchParams.set('embed_domain', location.hostname);
      url.searchParams.set('embed_type', 'Inline');
      const frame = document.createElement('iframe');
      frame.src = url.href;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      embed.replaceChildren(frame);
      external.href = bookingUrl.href;
    }
    render();
    dialog.showModal();
    document.body.classList.add('booking-open');
  });
  document.querySelector('#closeBooking').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('booking-open');
    embed.replaceChildren();
  });

  // Capture configured submissions before the existing mailto handler.
  // With no endpoint, the original email-app workflow stays available.
  form.addEventListener('submit', async event => {
    if (!config.contactEndpoint) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (pending) return;
    if (!endpoint) { state = 'config'; render(); return; }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    pending = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    state = 'sending';
    render();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint.href, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'), email: data.get('email'),
          service: data.get('service'), message: data.get('message'),
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission failed');
      state = 'success';
      form.reset();
    } catch { state = 'error'; }
    finally {
      clearTimeout(timeout);
      pending = false;
      submit.disabled = false;
      form.removeAttribute('aria-busy');
      render();
    }
  }, true);

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render();
})();
