(function() {
  // Auth state
  const authState = {
    isLoggedIn: false,
    user: null
  };

  // App state
  const state = {
    tab: 'dashboard',
    search: '',
    genre: 'all',
    sort: 'title-asc',
    availableOnly: false,
    myBooksType: 'favorites'
  };

  const els = {
    // Auth
    authScreen: document.getElementById('authScreen'),
    appScreen: document.getElementById('appScreen'),
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    loginFormEl: document.getElementById('loginFormEl'),
    registerFormEl: document.getElementById('registerFormEl'),
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),
    registerName: document.getElementById('registerName'),
    registerEmail: document.getElementById('registerEmail'),
    registerPassword: document.getElementById('registerPassword'),
    switchToRegister: document.getElementById('switchToRegister'),
    switchToLogin: document.getElementById('switchToLogin'),
    
    // App header
    userName: document.getElementById('userName'),
    logoutBtn: document.getElementById('logoutBtn'),
    tabDashboard: document.getElementById('tabDashboard'),
    tabLibrary: document.getElementById('tabLibrary'),
    tabPrint: document.getElementById('tabPrint'),
    tabMyBooks: document.getElementById('tabMyBooks'),

    // Dashboard
    dashboardPanel: document.getElementById('dashboardPanel'),
    welcomeMsg: document.getElementById('welcomeMsg'),
    favoriteCount: document.getElementById('favoriteCount'),
    borrowCount: document.getElementById('borrowCount'),
    printCount: document.getElementById('printCount'),

    // Library
    libraryPanel: document.getElementById('libraryPanel'),
    searchInput: document.getElementById('searchInput'),
    genreFilter: document.getElementById('genreFilter'),
    sortSelect: document.getElementById('sortSelect'),
    availableOnly: document.getElementById('availableOnly'),
    resetBtn: document.getElementById('resetBtn'),
    booksGrid: document.getElementById('booksGrid'),
    emptyState: document.getElementById('emptyState'),

    // Print
    printPanel: document.getElementById('printPanel'),
    printForm: document.getElementById('printForm'),
    printFile: document.getElementById('printFile'),
    printCopies: document.getElementById('printCopies'),
    baseCost: document.getElementById('baseCost'),
    copiesCost: document.getElementById('copiesCost'),
    totalCost: document.getElementById('totalCost'),
    gpayBtn: document.getElementById('gpayBtn'),
    printHistory: document.getElementById('printHistory'),
    printList: document.getElementById('printList'),

    // My Books
    myBooksPanel: document.getElementById('myBooksPanel'),
    myBooksFav: document.getElementById('myBooksFav'),
    myBooksBorrow: document.getElementById('myBooksBorrow'),
    myBooksGrid: document.getElementById('myBooksGrid'),
    myBooksEmpty: document.getElementById('myBooksEmpty'),

    // Modals
    bookModal: document.getElementById('bookModal'),
    bookModalCard: document.getElementById('bookModalCard'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalFooter: document.getElementById('modalFooter'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    gpayModal: document.getElementById('gpayModal'),
    gpayAmount: document.getElementById('gpayAmount'),
    confirmGpayBtn: document.getElementById('confirmGpayBtn'),
    cancelGpayBtn: document.getElementById('cancelGpayBtn'),
    gpayModalCloseBtn: document.getElementById('gpayModalCloseBtn'),
  };

  // Book dataset with availability info
  const books = [
    b(1, 'The Silent Dawn', 'Elena Hart', 2021, 'Fiction', 4.3,
      'A quiet coastal town faces a mysterious fog that changes everything.', true, 'Main library', '', ''),
    b(2, 'Quantum Drift', 'Leo Park', 2023, 'Science Fiction', 4.7,
      'A physicist discovers a way to message the past, at a terrible cost.', false, 'Sub library', 'John Smith', '2024-01-15'),
    b(3, 'The Last Heir', 'Mara Duval', 2018, 'Fantasy', 4.2,
      'An outcast discovers royal blood and a dangerous destiny.', true, 'Main library', '', ''),
    b(4, 'Under Glass', 'Sofia Nguyen', 2020, 'Mystery', 4.0,
      'A curator unravels a theft that never should have been possible.', false, 'Main library', 'Sarah Johnson', '2024-01-20'),
    b(5, 'Hearts on Fifth', 'Carson Vale', 2019, 'Romance', 3.9,
      'Two rivals on the same street find love where they least expect.', true, 'Main library', '', ''),
    b(6, 'Build Right', 'A. Srinivasan', 2022, 'Technology', 4.6,
      'A practical guide to resilient software systems.', true, 'Sub library', '', ''),
    b(7, 'Through the Pines', 'Noah Clarke', 2017, 'Thriller', 4.1,
      'A missing hiker, a secret map, and a storm closing in.', false, 'Main library', 'Mike Brown', '2024-01-25'),
    b(8, 'The Hidden Verse', 'Iris Bloom', 2016, 'Poetry', 4.4,
      'A collection of poems about light, memory, and rain.', true, 'Sub library', '', ''),
    b(9, 'Becoming Someone Else', 'Rita Gomez', 2015, 'Biography', 4.0,
      'The memoir of a chef who reinvented herself after 40.', true, 'Main library', '', ''),
    b(10, 'Midnight Code', 'J. Kim', 2024, 'Thriller', 4.8,
      'A coder is drawn into a conspiracy encoded in a music app.', false, 'Sub library', 'Emily Davis', '2024-02-01'),
    b(11, 'Old Stones', 'Harvey Poe', 2012, 'History', 3.8,
      'An intimate history of the lesser-known builders of cathedrals.', true, 'Main library', '', ''),
    b(12, 'Paper Planes', 'Lily Carter', 2014, 'Young Adult', 4.2,
      'A summer of friendship, secrets, and flight lessons.', true, 'Main library', '', ''),
    b(13, 'Circuits of Habit', 'Monica Lee', 2019, 'Self‑Help', 3.7,
      'Tiny changes for deep creative focus.', false, 'Main library', 'Alex Wilson', '2024-01-30'),
    b(14, 'The Golden Orchard', 'R.K. Patel', 2020, 'Children', 4.6,
      'Siblings discover a magical garden that needs their help.', true, 'Sub library', '', ''),
    b(15, 'Windswept', 'Ava Brooks', 2011, 'Classic', 4.3,
      'A timeless tale of longing on the moors.', false, 'Sub library', 'Lisa Anderson', '2024-02-05'),
    b(16, 'Dark Water', 'Chen Wei', 2018, 'Horror', 3.9,
      'The village well holds a secret that refuses to stay buried.', true, 'Main library', '', ''),
    b(17, 'Between Stars', 'Omar Haddad', 2022, 'Science Fiction', 4.5,
      'Explorers on a generational ship contend with a silent mutiny.', true, 'Main library', '', ''),
    b(18, 'Ink & Ash', 'S. Marin', 2021, 'Fantasy', 4.4,
      'A scribe finds spells hidden in marginalia.', false, 'Main library', 'Tom Martinez', '2024-01-18'),
    b(19, 'Neon Alley', 'Kaya Ito', 2023, 'Mystery', 4.1,
      'A detective navigates underground art and corporate intrigue.', true, 'Sub library', '', ''),
    b(20, 'Kitchen North', 'Nora Davis', 2010, 'Non‑Fiction', 3.6,
      'Cuisine, climate, and community above the Arctic Circle.', true, 'Main library', '', ''),
  ];

  function b(id, title, author, year, genre, rating, description, available, location, borrower, dueDate) {
    return {
      id, title, author, year, genre, rating, description, available, location, borrower, dueDate,
      cover: `https://picsum.photos/seed/book-${id}/400/600`
    };
  }

  // Storage keys
  const storageKey = {
    user: 'elibrary:user',
    favorites: 'elibrary:favorites',
    borrowed: 'elibrary:borrowed',
    prints: 'elibrary:prints',
    prefs: 'elibrary:prefs'
  };

  const favorites = new Set(readStorage(storageKey.favorites, []));
  const borrowed = new Set(readStorage(storageKey.borrowed, []));
  const prints = readStorage(storageKey.prints, []);
  Object.assign(state, readStorage(storageKey.prefs, {}));

  let currentPrintCost = 5;

  // Initialize
  function initApp() {
    const saved = readStorage(storageKey.user, null);
    if (saved) {
      authState.isLoggedIn = true;
      authState.user = saved;
      showAppScreen();
    } else {
      showAuthScreen();
    }
  }

  function showAuthScreen() {
    els.authScreen.style.display = 'flex';
    els.appScreen.classList.add('hidden');
    els.loginForm.classList.remove('hidden');
    els.registerForm.classList.add('hidden');
  }

  function showAppScreen() {
    els.authScreen.style.display = 'none';
    els.appScreen.classList.remove('hidden');
    els.userName.textContent = authState.user.name;
    selectTab('dashboard');
    updateDashboard();
  }

  // Auth events
  els.switchToRegister.addEventListener('click', () => {
    els.loginForm.classList.add('hidden');
    els.registerForm.classList.remove('hidden');
  });

  els.switchToLogin.addEventListener('click', () => {
    els.registerForm.classList.add('hidden');
    els.loginForm.classList.remove('hidden');
  });

  els.loginFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = els.loginEmail.value.trim();
    const password = els.loginPassword.value.trim();
    
    if (email && password) {
      authState.isLoggedIn = true;
      authState.user = { name: email.split('@')[0], email };
      localStorage.setItem(storageKey.user, JSON.stringify(authState.user));
      els.loginEmail.value = '';
      els.loginPassword.value = '';
      showAppScreen();
    }
  });

  els.registerFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = els.registerName.value.trim();
    const email = els.registerEmail.value.trim();
    const password = els.registerPassword.value.trim();
    
    if (name && email && password) {
      authState.isLoggedIn = true;
      authState.user = { name, email };
      localStorage.setItem(storageKey.user, JSON.stringify(authState.user));
      els.registerName.value = '';
      els.registerEmail.value = '';
      els.registerPassword.value = '';
      showAppScreen();
    }
  });

  els.logoutBtn.addEventListener('click', () => {
    authState.isLoggedIn = false;
    authState.user = null;
    localStorage.removeItem(storageKey.user);
    showAuthScreen();
  });

  // Tab navigation
  function selectTab(tab) {
    state.tab = tab;
    
    [els.tabDashboard, els.tabLibrary, els.tabPrint, els.tabMyBooks].forEach(btn => btn.classList.remove('active'));
    [els.dashboardPanel, els.libraryPanel, els.printPanel, els.myBooksPanel].forEach(panel => panel.classList.add('hidden'));
    
    switch(tab) {
      case 'dashboard':
        els.tabDashboard.classList.add('active');
        els.dashboardPanel.classList.remove('hidden');
        updateDashboard();
        break;
      case 'library':
        els.tabLibrary.classList.add('active');
        els.libraryPanel.classList.remove('hidden');
        render();
        break;
      case 'print':
        els.tabPrint.classList.add('active');
        els.printPanel.classList.remove('hidden');
        updatePrintHistory();
        break;
      case 'mybooks':
        els.tabMyBooks.classList.add('active');
        els.myBooksPanel.classList.remove('hidden');
        renderMyBooks('favorites');
        break;
    }
    persistPrefs();
  }

  els.tabDashboard.addEventListener('click', () => selectTab('dashboard'));
  els.tabLibrary.addEventListener('click', () => selectTab('library'));
  els.tabPrint.addEventListener('click', () => selectTab('print'));
  els.tabMyBooks.addEventListener('click', () => selectTab('mybooks'));

  // Dashboard
  function updateDashboard() {
    els.welcomeMsg.textContent = `Welcome back, ${authState.user.name}!`;
    els.favoriteCount.textContent = favorites.size;
    els.borrowCount.textContent = borrowed.size;
    els.printCount.textContent = prints.length;
  }

  // Library search/filter
  els.searchInput.addEventListener('input', debounce((e) => { state.search = e.target.value.trim(); persistPrefs(); render(); }, 120));
  els.genreFilter.addEventListener('change', (e) => { state.genre = e.target.value; persistPrefs(); render(); });
  els.sortSelect.addEventListener('change', (e) => { state.sort = e.target.value; persistPrefs(); render(); });
  els.availableOnly.addEventListener('change', (e) => { state.availableOnly = e.target.checked; persistPrefs(); render(); });
  els.resetBtn.addEventListener('click', () => {
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
  });

  // Print notes
  els.printCopies.addEventListener('change', updatePrintCost);
  document.querySelectorAll('input[name="printColor"]').forEach(radio => {
    radio.addEventListener('change', updatePrintCost);
  });

  function updatePrintCost() {
    const copies = parseInt(els.printCopies.value) || 1;
    const isColor = document.querySelector('input[name="printColor"]:checked').value === 'color';
    const baseCostAmount = isColor ? 10 : 5;
    const totalCostAmount = baseCostAmount * copies;
    
    currentPrintCost = totalCostAmount;
    els.baseCost.textContent = `₹${baseCostAmount}`;
    els.copiesCost.textContent = `₹${baseCostAmount * (copies - 1)}`;
    els.totalCost.textContent = `₹${totalCostAmount}`;
  }

  els.gpayBtn.addEventListener('click', () => {
    if (!els.printFile.files.length) {
      alert('Please select a file to print');
      return;
    }
    showGpayModal();
  });

  function showGpayModal() {
    els.gpayAmount.textContent = `₹${currentPrintCost}`;
    els.gpayModal.classList.remove('hidden');
  }

  function closeGpayModal() {
    els.gpayModal.classList.add('hidden');
  }

  els.gpayModalCloseBtn.addEventListener('click', closeGpayModal);
  els.cancelGpayBtn.addEventListener('click', closeGpayModal);

  els.confirmGpayBtn.addEventListener('click', () => {
    if (!els.printFile.files.length) {
      alert('Please select a file to print');
      return;
    }

    const file = els.printFile.files[0];
    const copies = parseInt(els.printCopies.value) || 1;
    const color = document.querySelector('input[name="printColor"]:checked').value;
    
    const printRecord = {
      id: Date.now(),
      fileName: file.name,
      color: color,
      copies: copies,
      amount: currentPrintCost,
      date: new Date().toLocaleDateString(),
      status: 'Completed'
    };

    prints.push(printRecord);
    localStorage.setItem(storageKey.prints, JSON.stringify(prints));

    els.printFile.value = '';
    els.printCopies.value = '1';
    document.querySelector('input[name="printColor"]').checked = true;
    updatePrintCost();
    closeGpayModal();
    updateDashboard();

    alert(`Print job submitted! Amount ₹${currentPrintCost} charged to your GPay account.`);
  });

  function updatePrintHistory() {
    if (prints.length === 0) {
      els.printHistory.classList.add('hidden');
      return;
    }

    els.printHistory.classList.remove('hidden');
    els.printList.innerHTML = '';

    for (const print of prints) {
      const item = el('div', { class: 'print-item' });
      item.append(
        el('div', { class: 'print-item-info' },
          text(`${print.fileName} (${print.color === 'bw' ? 'B&W' : 'Color'}, ${print.copies} copy/ies)`),
          el('br'),
          el('span', { class: 'print-item-date' }, text(print.date))
        ),
        el('div', {}, text(`₹${print.amount}`))
      );
      els.printList.appendChild(item);
    }
  }

  // My Books
  els.myBooksFav.addEventListener('click', () => {
    els.myBooksFav.classList.add('active');
    els.myBooksBorrow.classList.remove('active');
    renderMyBooks('favorites');
  });

  els.myBooksBorrow.addEventListener('click', () => {
    els.myBooksBorrow.classList.add('active');
    els.myBooksFav.classList.remove('active');
    renderMyBooks('borrowed');
  });

  function renderMyBooks(type) {
    const ids = type === 'favorites' ? [...favorites] : [...borrowed];
    const list = books.filter(b => ids.includes(b.id));

    els.myBooksGrid.innerHTML = '';
    if (list.length === 0) {
      els.myBooksEmpty.classList.remove('hidden');
      return;
    }
    els.myBooksEmpty.classList.add('hidden');

    const frag = document.createDocumentFragment();
    for (const book of list) {
      frag.appendChild(renderCard(book));
    }
    els.myBooksGrid.appendChild(frag);
  }

  // Library rendering
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
    const availBadge = el('span', { class: book.available ? 'badge accent' : 'badge warn' }, text(book.available ? 'Available' : 'Issued'));
    flags.append(availBadge);

    body.append(title, meta, flags);

    const actions = el('div', { class: 'card-actions' });
    const viewBtn = el('button', { class: 'btn secondary' }, text('Details'));
    viewBtn.addEventListener('click', () => openModal(book));

    const favBtn = el('button', { class: 'btn' }, text(isFavorite ? 'Remove Favorite' : 'Add to Favorites'));
    favBtn.addEventListener('click', () => { toggleFavorite(book.id); render(); updateDashboard(); });

    const borrowBtn = el('button', { class: isBorrowed ? 'btn danger' : 'btn' }, text(isBorrowed ? 'Return' : 'Borrow'));
    borrowBtn.addEventListener('click', () => { toggleBorrow(book.id); render(); updateDashboard(); });

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
    const details = [
      el('p', {}, text(`${book.author} • ${book.year} • ${book.genre}`)),
      el('p', {}, text(book.description)),
      el('p', { class: 'rating' }, text('Rating: ' + '★'.repeat(Math.round(book.rating)) + ` (${book.rating})`)),
      el('hr', {}),
      el('h4', {}, text('Availability Information')),
      el('p', {}, text(`Status: ${book.available ? 'Available' : 'Issued'}`)),
      el('p', {}, text(`Location: ${book.location}`))
    ];

    if (!book.available && book.borrower) {
      details.push(el('p', {}, text(`Borrowed by: ${book.borrower}`)));
      if (book.dueDate) {
        details.push(el('p', {}, text(`Due Date: ${book.dueDate}`)));
      }
    }

    info.append(...details);
    els.modalBody.append(img, info);

    els.modalFooter.innerHTML = '';
    const favBtn = el('button', { class: 'btn secondary' }, text(isFavorite ? 'Remove Favorite' : 'Add to Favorites'));
    favBtn.addEventListener('click', () => { toggleFavorite(book.id); openModal(book); render(); updateDashboard(); });
    const borrowBtn = el('button', { class: isBorrowed ? 'btn danger' : 'btn' }, text(isBorrowed ? 'Return' : 'Borrow'));
    borrowBtn.addEventListener('click', () => { toggleBorrow(book.id); openModal(book); render(); updateDashboard(); });
    const closeBtn = el('button', { class: 'btn' }, text('Close'));
    closeBtn.addEventListener('click', closeModal);
    els.modalFooter.append(favBtn, borrowBtn, closeBtn);

    els.bookModal.classList.remove('hidden');
  }

  function closeModal() {
    els.bookModal.classList.add('hidden');
  }

  els.modalCloseBtn.addEventListener('click', closeModal);
  els.bookModal.addEventListener('click', (e) => {
    if (e.target === els.bookModal) closeModal();
  });

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

    const q = state.search.toLowerCase();
    if (q) list = list.filter(bk =>
      bk.title.toLowerCase().includes(q) ||
      bk.author.toLowerCase().includes(q) ||
      bk.description.toLowerCase().includes(q)
    );

    if (state.genre !== 'all') list = list.filter(bk => bk.genre === state.genre);

    if (state.availableOnly) list = list.filter(bk => bk.available);

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

  // Start app
  initApp();
})();
