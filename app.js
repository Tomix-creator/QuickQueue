(() => {
  const STORAGE_KEY = 'quickqueue.entries.v1';
  const form = document.querySelector('#entry-form');
  const input = document.querySelector('#guest-name');
  const list = document.querySelector('#queue-list');
  const count = document.querySelector('#queue-count');
  const emptyState = document.querySelector('#empty-state');
  const serveNextButton = document.querySelector('#serve-next');
  const errorMessage = document.querySelector('#form-error');
  const toast = document.querySelector('#toast');

  let entries = loadEntries();
  let toastTimeout;

  function loadEntries() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(saved)) return [];
      return saved.filter((item) => item && typeof item.id === 'string' && typeof item.name === 'string');
    } catch {
      return [];
    }
  }

  function saveEntries() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return true;
    } catch {
      showToast('Could not save this list in your browser.');
      return false;
    }
  }

  function createId() {
    return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function render() {
    list.replaceChildren();
    entries.forEach((entry, index) => {
      const item = document.createElement('li');
      item.className = 'queue-item';

      const number = document.createElement('span');
      number.className = 'queue-number';
      number.textContent = String(index + 1).padStart(2, '0');

      const name = document.createElement('span');
      name.className = 'guest-name';
      name.textContent = entry.name;

      if (index === 0) {
        const next = document.createElement('span');
        next.className = 'next-label';
        next.textContent = 'Next';
        name.append(next);
      }

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'remove-button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${entry.name} from the queue`);
      remove.addEventListener('click', () => removeEntry(entry.id));

      item.append(number, name, remove);
      list.append(item);
    });

    count.textContent = String(entries.length);
    emptyState.hidden = entries.length > 0;
    list.hidden = entries.length === 0;
    serveNextButton.disabled = entries.length === 0;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  function removeEntry(id) {
    entries = entries.filter((entry) => entry.id !== id);
    saveEntries();
    render();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name) {
      errorMessage.textContent = 'Add a name to join the queue.';
      input.focus();
      return;
    }

    errorMessage.textContent = '';
    entries.push({ id: createId(), name });
    saveEntries();
    render();
    form.reset();
    input.focus();
  });

  input.addEventListener('input', () => {
    if (input.value.trim()) errorMessage.textContent = '';
  });

  serveNextButton.addEventListener('click', () => {
    if (!entries.length) return;
    const [served] = entries.splice(0, 1);
    saveEntries();
    render();
    showToast(`${served.name} served. The queue has moved up.`);
  });

  render();
})();
