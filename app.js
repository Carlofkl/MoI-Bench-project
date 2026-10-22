(() => {
  const config = window.MOI_BENCH_CONFIG || {};
  const toast = document.getElementById('toast');
  let toastTimer;
  function notify(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
  }
  document.querySelectorAll('[data-resource]').forEach(link => {
    const key = link.dataset.resource;
    const value = config[key]?.trim();
    if (value && /^https:\/\//i.test(value)) {
      link.href = value;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.classList.remove('pending');
      link.removeAttribute('aria-disabled');
      link.querySelector('small')?.remove();
    } else {
      const message = `${key === 'github' ? 'GitHub repository' : 'Paper'} coming soon.`;
      link.addEventListener('click', e => { e.preventDefault(); notify(message); });
      link.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); notify(message); }
      });
    }
  });
  const examples = window.MOI_BENCH_EXAMPLES || {};
  const tabs = [...document.querySelectorAll('[data-example]')];
  function selectTab(tab) {
    tabs.forEach(t => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
    const all = tab.dataset.example === 'all';
    document.getElementById('all-comparison').hidden = !all;
    const gallery = document.getElementById('example-gallery');
    gallery.hidden = all;
    gallery.replaceChildren();
    if (!all) {
      (examples[tab.dataset.example] || []).forEach(item => {
        const button = document.createElement('button');
        button.className = 'zoomable sample-card' + (item.width / item.height > 4 ? ' wide-example' : '');
        button.dataset.image = item.src;
        button.dataset.caption = item.alt;
        button.setAttribute('aria-label', 'Enlarge ' + item.alt);
        const image = document.createElement('img');
        image.src = item.src; image.alt = item.alt;
        image.width = item.width; image.height = item.height;
        image.loading = 'lazy';
        button.append(image);gallery.append(button);
      });
    }
    document.getElementById('example-panel').setAttribute('aria-labelledby', tab.id);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { e.preventDefault(); selectTab(tabs[next]); tabs[next].focus(); }
    });
  });
  const dialog = document.getElementById('lightbox');
  document.addEventListener('click', event => {
    const button = event.target.closest('.zoomable');
    if (!button) return;
    const image = document.getElementById('lightbox-image');
    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    document.getElementById('lightbox-caption').textContent = button.dataset.caption;
    document.getElementById('original-image').href = button.dataset.image;
    dialog.showModal(); document.body.classList.add('modal-open');
    dialog.querySelector('.lightbox-scroll').scrollTo(0, 0);
  });
  document.getElementById('close-lightbox').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  const bibtex = config.bibtex?.trim();
  const copy = document.getElementById('copy-citation');
  if (bibtex) {
    document.getElementById('bibtex').textContent = bibtex;
    copy.disabled = false;
  }
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      document.getElementById('copy-status').textContent = 'BibTeX copied.';
      copy.textContent = 'Copied!';
      setTimeout(() => { copy.textContent = 'Copy BibTeX'; }, 2000);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('bibtex'));
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      notify('Citation selected. Press Ctrl+C or ⌘C to copy.');
    }
  });
})();
