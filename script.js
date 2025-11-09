(function() {
  const state = {
    tab: 'all', // 'all' | 'my'
    search: '',
    genre: 'all',
    sort: 'title-asc',
    availableOnly: false,
    myListType: 'favorites' // 'favorites' | 'borrowed'
  };

  const els = {
    tabAll: document.getElementById('tabAll'),
    tabMy: document.getElementById('tabMy'),
    searchInput: document.getElementById('searchInput'),
    genreFilter: document.getElementById('genreFilter'),
    sortSelect: document.getElementById('sortSelect'),
    availableOnly: document.getElementById('availableOnly'),
    resetBtn: document.getElementById('resetBtn'),
    booksGrid: document.getElementById('booksGrid'),
    emptyState: document.getElementById('emptyState'),
    myListSwitch: document.getElementById('myListSwitch'),
    clearListBtn: document.getElementById('clearListBtn'),
    segmentFavorites: document.getElementById('segmentFavorites'),
    segmentBorrowed: document.getElementById('segmentBorrowed'),
    modal: document.getElementById('bookModal'),
    modalBody: document.getElementById('modalBody'),
    modalTitle: document.getElementById('modalTitle'),
    modalFooter: document.getElementById('modalFooter'),
    modalCard: document.getElementById('bookModalCard'),
  };

  // Mock dataset
  const books = [
    b(1, 'The Silent Dawn', 'Elena Hart', 2021, 'Fiction', 4.3,
      'A quiet coastal town faces a mysterious fog that changes everything.'),
    b(2, 'Quantum Drift', 'Leo Park', 2023, 'Science Fiction', 4.7,
      'A physicist discovers a way to message the past, at a terrible cost.'),
    b(3, 'The Last Heir', 'Mara Duval', 2018, 'Fantasy', 4.2,
      'An outcast discovers royal blood and a dangerous destiny.'),
    b(4, 'Under Glass', 'Sofia Nguyen', 2020, 'Mystery', 4.0,
      'A curator unravels a theft that never should have been possible.'),
    b(5, 'Hearts on Fifth', 'Carson Vale', 2019, 'Romance', 3.9,
      'Two rivals on the same street find love where they least expect.'),
    b(6, 'Build Right', 'A. Srinivasan', 2022, 'Technology', 4.6,
      'A practical guide to resilient software systems.'),
    b(7, 'Through the Pines', 'Noah Clarke', 2017, 'Thriller', 4.1,
      'A missing hiker, a secret map, and a storm closing in.'),
    b(8, 'The Hidden Verse', 'Iris Bloom', 2016, 'Poetry', 4.4,
      'A collection of poems about light, memory, and rain.'),
    b(9, 'Becoming Someone Else', 'Rita Gomez', 2015, 'Biography', 4.0,
      'The memoir of a chef who reinvented herself after 40.'),
    b(10, 'Midnight Code', 'J. Kim', 2024, 'Thriller', 4.8,
      'A coder is drawn into a conspiracy encoded in a music app.'),
    b(11, 'Old Stones', 'Harvey Poe', 2012, 'History', 3.8,
      'An intimate history of the lesser-known builders of cathedrals.'),
    b(12, 'Paper Planes', 'Lily Carter', 2014, 'Young Adult', 4.2,
      'A summer of friendship, secrets, and flight lessons.'),
    b(13, 'Circuits of Habit', 'Monica Lee', 2019, 'Self‑Help', 3.7,
      'Tiny changes for deep creative focus.'),
    b(14, 'The Golden Orchard', 'R.K. Patel', 2020, 'Children', 4.6,
      'Siblings discover a magical garden that needs their help.'),
    b(15, 'Windswept', 'Ava Brooks', 2011, 'Classic', 4.3,
      'A timeless tale of longing on the moors.'),
    b(16, 'Dark Water', 'Chen Wei', 2018, 'Horror', 3.9,
      'The village well holds a secret that refuses to stay buried.'),
    b(17, 'Between Stars', 'Omar Haddad', 2022, 'Science Fiction', 4.5,
      'Explorers on a generational ship contend with a silent mutiny.'),
    b(18, 'Ink & Ash', 'S. Marin', 2021, 'Fantasy', 4.4,
      'A scribe finds spells hidden in marginalia.'),
    b(19, 'Neon Alley', 'Kaya Ito', 2023, 'Mystery', 4.1,
      'A detective navigates underground art and corporate intrigue.'),
    b(20, 'Kitchen North', 'Nora Davis', 2010, 'Non‑Fiction', 3.6,
      'Cuisine, climate, and community above the Arctic Circle.'),
  ];

  function b(id, title, author, year, genre, rating, description) {
    return {
      id, title, author, year, genre, rating, description,
      cover: `https://picsum.photos/seed/book-${id}/400/600`
    };
  }

  // Persistence
  const storageKey = {
    favorites: 'elibrary:favorites',
    borrowed: 'elibrary:borrowed',
    prefs: 'elibrary:prefs'
  };

  const favorites = new Set(readStorage(storageKey.favorites, []));
  const borrowed = new Set(readStorage(storageKey.borrowed, []));
  Object.assign(state, readStorage(storageKey.prefs, {}));

  // Initialize UI from state
  els.searchInput.value = state.search || '';
  els.genreFilter.value = state.genre || 'all';
  els.sortSelect.value = state.sort || 'title-asc';
  els.availableOnly.checked = !!state.availableOnly;
  if (state.tab === 'my') selectTab('my'); else selectTab('all');
  if (state.myListType === 'borrowed') els.segmentBorrowed.checked = true; else els.segmentFavorites.checked = true;

  // Events
  els.tabAll.addEventListener('click', () => selectTab('all'));
  els.tabMy.addEventListener('click', () => selectTab('my'));
  els.searchInput.addEventListener('input', debounce((e) => { state.search = e.target.value.trim(); persistPrefs(); render(); }, 120));
  els.genreFilter.addEventListener('change', (e) => { state.genre = e.target.value; persistPrefs(); render(); });
  els.sortSelect.addEventListener('change', (e) => { state.sort = e.target.value; persistPrefs(); render(); });
  els.availableOnly.addEventListener('change', (e) => { state.availableOnly = e.target.checked; persistPrefs(); render(); });
  els.resetBtn.addEventListener('click', () => { resetFilters(); });
  els.segmentFavorites.addEventListener('change', () => { if (els.segmentFavorites.checked) { state.myListType = 'favorites'; persistPrefs(); render(); }});
  els.segmentBorrowed.addEventListener('change', () => { if (els.segmentBorrowed.checked) { state.myListType = 'borrowed'; persistPrefs(); render(); }});
  els.clearListBtn.addEventListener('click', () => {
    if (state.myListType === 'favorites') favorites.clear(); else borrowed.clear();
    persistSets(); render();
  });

  // Render initial
  render();

  function selectTab(tab) {
    state.tab = tab;
    const isAll = tab === 'all';
    els.tabAll.classList.toggle('active', isAll);
    els.tabAll.setAttribute('aria-selected', String(isAll));
    els.tabMy.classList.toggle('active', !isAll);
    els.tabMy.setAttribute('aria-selected', String(!isAll));
    els.myListSwitch.classList.toggle('hidden', isAll);
    persistPrefs();
    render();
  }

  function resetFilters() {
    state.search = '';
    state.genre = 'all';
    state.sort = 'title-asc';
    state.availableOnly = false;
    els.searchInput.value = '';
    els.genreFilter.value = 'all';
    els.sortSelect.value = 'title-asc';
    els.availableOnly.checked = false;
    persistPrefs();
    render();
  }

  function render() {
    const list = getFilteredSorted();
    els.booksGrid.innerHTML = '';
    if (!list.length) {
      els.emptyState.classList.remove('hidden');
      return;
    }
    els.emptyState.classList.add('hidden');

    const frag = document.createDocumentFragment();
    for (const book of list) frag.appendChild(renderCard(book));
    els.booksGrid.appendChild(frag);
  }

  function renderCard(book) {
    const isFavorite = favorites.has(book.id);
    const isBorrowed = borrowed.has(book.id);

    const card = el('article', { class: 'card', role: 'listitem' });
    const cover = el('div', { class: 'cover' });
    cover.style.backgroundImage = `url(${book.cover})`;
    cover.setAttribute('role', 'img');
    cover.setAttribute('aria-label', `${book.title} cover`);
    cover.addEventListener('click', () => openModal(book));

    const body = el('div', { class: 'card-body' });
    const title = el('h3', {}, text(book.title));
    const meta = el('div', { class: 'meta' });
    meta.append(
      el('span', {}, text(book.author)),
      dot(),
      el('span', {}, text(book.year)),
      dot(),
      el('span', { class: 'badge' }, text(book.genre)),
      el('span', { class: 'badge rating', title: `${book.rating} out of 5` }, text('★ ' + book.rating))
    );

    const flags = el('div', { class: 'meta' });
    if (isFavorite) flags.append(el('span', { class: 'badge accent' }, text('Favorite')));
    if (isBorrowed) flags.append(el('span', { class: 'badge warn' }, text('Borrowed')));

    body.append(title, meta, flags);

    const actions = el('div', { class: 'card-actions' });
    const viewBtn = el('button', { class: 'btn secondary' }, text('Details'));
    viewBtn.addEventListener('click', () => openModal(book));

    const favBtn = el('button', { class: 'btn' }, text(isFavorite ? 'Remove Favorite' : 'Add to Favorites'));
    favBtn.addEventListener('click', () => { toggleFavorite(book.id); render(); });

    const borrowBtn = el('button', { class: isBorrowed ? 'btn danger' : 'btn' }, text(isBorrowed ? 'Return' : 'Borrow'));
    borrowBtn.addEventListener('click', () => { toggleBorrow(book.id); render(); });

    actions.append(viewBtn, favBtn, borrowBtn);
    card.append(cover, body, actions);
    return card;
  }

  function openModal(book) {
    const isFavorite = favorites.has(book.id);
    const isBorrowed = borrowed.has(book.id);

    els.modalTitle.textContent = book.title;
    els.modalBody.innerHTML = '';

    const img = el('div', { class: 'modal-cover' });
    img.style.backgroundImage = `url(${book.cover})`;

    const info = el('div');
    info.append(
      el('p', {}, text(`${book.author} • ${book.year} • ${book.genre}`)),
      el('p', {}, text(book.description)),
      el('p', { class: 'rating' }, text('Rating: ' + '★'.repeat(Math.round(book.rating)) + ` (${book.rating})`))
    );

    els.modalBody.append(img, info);

    els.modalFooter.innerHTML = '';
    const favBtn = el('button', { class: 'btn secondary' }, text(isFavorite ? 'Remove Favorite' : 'Add to Favorites'));
    favBtn.addEventListener('click', () => { toggleFavorite(book.id); openModal(book); render(); });
    const borrowBtn = el('button', { class: isBorrowed ? 'btn danger' : 'btn' }, text(isBorrowed ? 'Return' : 'Borrow'));
    borrowBtn.addEventListener('click', () => { toggleBorrow(book.id); openModal(book); render(); });
    const closeBtn = el('button', { class: 'btn' }, text('Close'));
    closeBtn.addEventListener('click', () => els.modal.close());
    els.modalFooter.append(favBtn, borrowBtn, closeBtn);

    if (typeof els.modal.showModal === 'function') {
      els.modal.showModal();
    } else {
      // Fallback
      els.modal.setAttribute('open', 'open');
    }
  }

  function toggleFavorite(id) {
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    persistSets();
  }
  function toggleBorrow(id) {
    if (borrowed.has(id)) borrowed.delete(id); else borrowed.add(id);
    persistSets();
  }

  function getFilteredSorted() {
    let list = books.slice();

    // Scope to tab
    if (state.tab === 'my') {
      if (state.myListType === 'favorites') list = list.filter(bk => favorites.has(bk.id));
      else list = list.filter(bk => borrowed.has(bk.id));
    }

    const q = state.search.toLowerCase();
    if (q) list = list.filter(bk =>
      bk.title.toLowerCase().includes(q) ||
      bk.author.toLowerCase().includes(q) ||
      bk.description.toLowerCase().includes(q)
    );

    if (state.genre !== 'all') list = list.filter(bk => bk.genre === state.genre);

    if (state.availableOnly) list = list.filter(bk => !borrowed.has(bk.id));

    list.sort(by(state.sort));
    return list;
  }

  function by(key) {
    switch (key) {
      case 'title-asc': return (a,b) => cmp(a.title, b.title);
      case 'title-desc': return (a,b) => -cmp(a.title, b.title);
      case 'author-asc': return (a,b) => cmp(a.author, b.author);
      case 'author-desc': return (a,b) => -cmp(a.author, b.author);
      case 'year-asc': return (a,b) => a.year - b.year;
      case 'year-desc': return (a,b) => b.year - a.year;
      case 'rating-asc': return (a,b) => a.rating - b.rating;
      case 'rating-desc': return (a,b) => b.rating - a.rating;
      default: return () => 0;
    }
  }

  function cmp(a, b) { return a.localeCompare(b, undefined, { sensitivity: 'base' }); }

  // Helpers
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else node.setAttribute(k, v);
    }
    for (const child of children) node.append(child);
    return node;
  }
  function text(v) { return document.createTextNode(v); }
  function dot() { return el('span', { 'aria-hidden': 'true' }, text('·')); }
  function debounce(fn, ms) {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(null, args), ms); };
  }

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch { return fallback; }
  }
  function persistSets() {
    localStorage.setItem(storageKey.favorites, JSON.stringify([...favorites]));
    localStorage.setItem(storageKey.borrowed, JSON.stringify([...borrowed]));
  }
  function persistPrefs() {
    localStorage.setItem(storageKey.prefs, JSON.stringify(state));
  }
})();
