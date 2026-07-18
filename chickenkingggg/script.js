// ============================================================
// CHICKEN KING — script.js
// ============================================================

// --- DATA ---
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Đùi gà Cay Giòn', description: 'Lớp vỏ giòn tan cay nồng đặc trưng', price: 45000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHlR2Fpb1nNsz2A2oFvmgs4faeNY9-k9x-MdMxRNxtIwtLFNkEiy7TYFvpfN8QkStlsgVH1axWkHHFmQ7vFl6it_AmXG6KJ9-j8b8lfCkbu5aRAOnUXhcbT0jZjtKZxO-CJH0qarjrSRQ_aUdyJjN9pUKpC4nEgz2L05R-2nkbtCqwlbOI3hQUQZpZ7qJZ5fnYdYfjKtAMwV7h3FOdndN-MyvgXdmXR3Ft98EzaydMteYdvn9lY8ai2jJPC5afQdGQIAFEZnGDaDs', category: 'Gà Rán', rating: 4.8 },
  { id: '2', name: 'Combo Gia Đình', description: '8 miếng gà + 2 món phụ + Coca 1L', price: 320000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpnLwTQ5yMRRw3a2qxSCGumO_i2LhC2RkzlWlJbwuOmoBeSiII2-VLWZV8ZVuYKT007WdbEfyDGM6nTPaiY4jO5yUGMKTtzJGLFf_gXuRHOdh2gQnQW5VyAaG4ircnt2KDRzE8KInZ-6eWsjJlHW3f_SXIxgDGNOACr78aMAsKKUy3waY5jnYU-uTGUnXU2PlFca8AEmr15Ba3Xf44_a5gbsbiWXWJO8JM4ITvytfDbP3v3ttC0u3eDfF3kbfvPmS4nuFDfvrdGYw', category: 'Combo', rating: 4.9 },
  { id: '3', name: 'Cánh Gà Giòn Cay', description: '6 miếng cánh gà sốt cay ngọt', price: 125000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSu6bGM7ETXDLErdXuhzFb6zgHjD0-tS9z6TojjWG17OYJ51fkRlgOCGxglDXdAr4kXWzsHIq65KbpgltFKe__EJKT_qWvGNbETjz199l0bgiI0esGIdc7I5ZDW16qHM1s3dw3Jb7d6z_Tna3PUN1dc86n9lSW3AVyjJfgi_rHqsKul5I4XZI3M-317aFSiIcOQBCNtFBeSUWoAm7OIPOjVGde-20jtaeUuivrw22pIQAPsTlcX5JL45piw-gwEPgRqycPGTKnje0', category: 'Gà Rán', rating: 4.7 },
  { id: '4', name: 'Phần Tẩm Bột Vàng', description: 'Lườn gà tẩm bột chiên kèm nước sốt', price: 99000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5HfmEAi5Y1UmoYWkcEAp5XPRZbDbALI-XF5aFg5ZnJNto41LfQVzO5ef5I-9-9ldWy5aHh_YRTDp7C-sG_I763DRCI0TfU9xbwLzTnd2qeuflJ_AmfqbopPpnyp0IE-kI5_yettBj435ru0IgBKkBVhzkKeLkme2bs5adJ07RVzbGkmpHO33jkfiEInCAQ1lg6SFlyJknMLVx1sciSXBlUMrxUfxpddnGDqBwJC6RgmFNw5HcNLJ-3jMnvWr-M5fFecQ60UN2lC8', category: 'Món Phụ', rating: 4.6 },
  { id: '5', name: 'Xô Gà Vui Vẻ', description: '12 miếng gà truyền thống công thức đặc biệt', price: 249000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkEDeQ1mfKn6wGHak3Id6SI7cA3mCtTTA0Vi-jE2W4cRKeJNNWLu1LBbPj9i5jOFi8tlKHXCGOCXQ4uE_D2dYgNmQS-Urd_37Db1WaHimhEFJGhlftCNmrECNSJcf8Ie8AB5Ka2YV-bf8TJdbXWroGFtkNuTIiwyq6JkoD6o8n4AKo_fandI3Ybj5pw1viUKzcdoWf_-JQic0dgs4fEiS-O6p-HwSE43AGVsPTMVwIs9Ct5eSAUW4kHOLPhDK_68FMQog0FArUVEY', category: 'Combo', rating: 5.0 },
  { id: '6', name: 'Burger Gà Giòn', description: 'Burger kẹp gà chiên giòn, xà lách và sốt mayo', price: 55000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&h=300&auto=format&fit=crop', category: 'Gà Rán', rating: 4.6 },
  { id: '7', name: 'Pepsi Lớn', description: 'Nước ngọt giải khát size lớn', price: 25000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&h=300&auto=format&fit=crop', category: 'Đồ Uống', rating: 4.8 },
  { id: '8', name: 'Khoai Tây Chiên Lớn', description: 'Khoai tây chiên vàng ruộm, giòn tan', price: 35000, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=300&h=300&auto=format&fit=crop', category: 'Món Phụ', rating: 4.7 }
];

// --- STATE ---
let products = loadLS('products', INITIAL_PRODUCTS);
let orders = loadLS('orders', []);
let users = loadLS('users', []);
let currentUser = loadLS('currentUser', null);
let cart = loadLS('cart', []);
let activeCategory = 'Tất cả';
let searchQuery = '';
let isCartOpen = false;
let activeTab = 'home';
let isAdminView = false;
let adminTab = 'products';
let authMode = 'login';
// Admin form state
let editingProductId = null;

// --- LOCALSTORAGE HELPERS ---
function loadLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    const parsed = JSON.parse(v);
    if (key === 'products' && !Array.isArray(parsed)) return fallback;
    if (key === 'orders' && !Array.isArray(parsed)) return fallback;
    if (key === 'users' && !Array.isArray(parsed)) return fallback;
    if (key === 'cart' && !Array.isArray(parsed)) return fallback;
    return parsed;
  } catch { return fallback; }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function saveAll() {
  saveLS('products', products);
  saveLS('orders', orders);
  saveLS('users', users);
  saveLS('cart', cart);
  if (currentUser) saveLS('currentUser', currentUser);
  else localStorage.removeItem('currentUser');
}

// --- TOAST ---
let toastTimers = {};
function showToast(message, type = 'success') {
  const id = Date.now();
  const container = document.getElementById('toast-container');
  const div = document.createElement('div');
  div.className = `toast toast-${type}`;
  div.id = `toast-${id}`;
  div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w5 h5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem;flex-shrink:0">
      ${type === 'success'
        ? '<polyline points="20 6 9 17 4 12"></polyline>'
        : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
    </svg>
    <span>${message}</span>
    <button onclick="removeToast(${id})" style="background:none;border:none;cursor:pointer;padding:4px;border-radius:9999px;display:flex;align-items:center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:1rem;height:1rem;color:#fff"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;
  container.appendChild(div);
  toastTimers[id] = setTimeout(() => removeToast(id), 3000);
}
function removeToast(id) {
  const el = document.getElementById(`toast-${id}`);
  if (el) el.remove();
  clearTimeout(toastTimers[id]);
}

// --- VIEWS ---
function renderApp() {
  const authView = document.getElementById('auth-view');
  const adminView = document.getElementById('admin-view');
  const mainView = document.getElementById('main-view');

  if (currentUser && currentUser.role === 'admin' && isAdminView) {
    authView.classList.add('hidden');
    adminView.classList.remove('hidden');
    mainView.classList.add('hidden');
    renderAdminView();
  } else {
    authView.classList.add('hidden');
    adminView.classList.add('hidden');
    mainView.classList.remove('hidden');
    renderMainView();
  }
  lucide.createIcons();
}

// --- AUTH VIEW ---
function showAuthView() {
  document.getElementById('auth-view').classList.remove('hidden');
  document.getElementById('main-view').classList.add('hidden');
  document.getElementById('admin-view').classList.add('hidden');
  setAuthMode('login');
  lucide.createIcons();
}

function setAuthMode(mode) {
  authMode = mode;
  document.getElementById('auth-subtitle').textContent = mode === 'login' ? 'Chào mừng bạn quay trở lại!' : 'Tham gia cùng cộng đồng Gà Rán';
  document.getElementById('auth-submit-text').textContent = mode === 'login' ? 'Đăng nhập ngay' : 'Đăng ký tài khoản';
  document.getElementById('auth-mode-toggle').textContent = mode === 'login' ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Quay lại đăng nhập';
  document.getElementById('auth-username').value = '';
  document.getElementById('auth-password').value = '';
}

document.getElementById('auth-mode-toggle').addEventListener('click', () => {
  setAuthMode(authMode === 'login' ? 'register' : 'login');
});

document.getElementById('auth-back-btn').addEventListener('click', () => {
  document.getElementById('auth-view').classList.add('hidden');
  document.getElementById('main-view').classList.remove('hidden');
  lucide.createIcons();
});

document.getElementById('auth-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value;

  if (username === 'admin' && password === '123456') {
    currentUser = { id: 'admin', username: 'admin', role: 'admin' };
    isAdminView = true;
    saveLS('currentUser', currentUser);
    document.getElementById('auth-view').classList.add('hidden');
    showToast('Đăng nhập Quản trị viên thành công!', 'success');
    renderApp();
    return;
  }

  if (authMode === 'login') {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      currentUser = { id: user.id, username: user.username, role: user.role || 'user' };
      saveLS('currentUser', currentUser);
      document.getElementById('auth-view').classList.add('hidden');
      showToast(`Chào mừng ${user.username} quay trở lại!`, 'success');
      renderApp();
    } else {
      showToast('Tài khoản hoặc mật khẩu không chính xác', 'error');
    }
  } else {
    if (users.some(u => u.username === username)) {
      showToast('Tên tài khoản đã tồn tại', 'error');
      return;
    }
    const newUser = { id: Date.now().toString(), username, password, role: 'user' };
    users.push(newUser);
    currentUser = { id: newUser.id, username: newUser.username, role: 'user' };
    saveLS('users', users);
    saveLS('currentUser', currentUser);
    document.getElementById('auth-view').classList.add('hidden');
    showToast('Đăng ký tài khoản thành công!', 'success');
    renderApp();
  }
});

// --- LOGOUT ---
function handleLogout() {
  currentUser = null;
  isAdminView = false;
  cart = [];
  saveAll();
  activeTab = 'home';
  showToast('Đã đăng xuất thành công!');
  renderApp();
}

// --- MAIN VIEW ---
function renderMainView() {
  // Header
  const adminBtn = document.getElementById('admin-dashboard-btn');
  const loginBtn = document.getElementById('header-login-btn');
  const avatarBtn = document.getElementById('header-avatar-btn');
  const avatarImg = document.getElementById('header-avatar-img');

  if (currentUser) {
    loginBtn.classList.add('hidden');
    avatarBtn.classList.remove('hidden');
    avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=random`;
    if (currentUser.role === 'admin') {
      adminBtn.classList.remove('hidden');
    } else {
      adminBtn.classList.add('hidden');
    }
  } else {
    loginBtn.classList.remove('hidden');
    avatarBtn.classList.add('hidden');
    adminBtn.classList.add('hidden');
  }

  renderCartCount();
  renderTabs();
}

function renderTabs() {
  const tabs = ['home', 'orders', 'profile'];
  tabs.forEach(tab => {
    const el = document.getElementById(`tab-${tab}`);
    if (el) {
      if (tab === activeTab) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });

  // Nav active states
  const navHome = document.getElementById('nav-home');
  const navOrders = document.getElementById('nav-orders');
  const navProfile = document.getElementById('nav-profile');
  const navHomeLabel = document.getElementById('nav-home-label');

  navHome.className = 'nav-btn ' + (activeTab === 'home' ? 'active-home' : 'nav-orders-default');
  navHomeLabel.textContent = activeTab === 'home' ? 'Chủ' : '';
  navOrders.className = 'nav-btn ' + (activeTab === 'orders' ? 'nav-orders-active' : 'nav-orders-default');
  navProfile.className = 'nav-btn ' + (activeTab === 'profile' ? 'nav-profile-active' : 'nav-profile-default');

  if (activeTab === 'home') renderMenuGrid();
  if (activeTab === 'orders') renderUserOrders();
  if (activeTab === 'profile') renderProfile();
}

function setActiveTab(tab) {
  activeTab = tab;
  renderTabs();
}

function navOrders() {
  if (!currentUser) { showAuthView(); return; }
  setActiveTab('orders');
}

function navProfile() {
  if (!currentUser) { showAuthView(); return; }
  setActiveTab('profile');
}

// --- SEARCH & CATEGORY ---
function onSearchInput() {
  searchQuery = document.getElementById('search-input').value;
  renderMenuGrid();
}

function setActiveCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(btn => {
    if (btn.dataset.cat === cat) btn.classList.add('active');
    else btn.classList.remove('active');
  });
  renderMenuGrid();
}

function getFilteredItems() {
  const q = searchQuery.toLowerCase().trim();
  return products.filter(item => {
    const matchesCat = activeCategory === 'Tất cả' || item.category === activeCategory;
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });
}

// --- MENU GRID ---
function renderMenuGrid() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const items = getFilteredItems();
  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:#9ca3af;font-style:italic;font-weight:500;">Không tìm thấy món nào...</div>`;
    return;
  }
  grid.innerHTML = items.map(item => `
    <div class="menu-card">
      <div class="menu-card-img-wrap">
        <img src="${item.image}" alt="${item.name}" referrerpolicy="no-referrer" onerror="this.src='https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=300&h=300&auto=format&fit=crop'" />
        ${item.rating ? `<div class="menu-card-rating">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" style="width:.75rem;height:.75rem;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ${item.rating}
        </div>` : ''}
      </div>
      <div class="menu-card-info">
        <h4 class="menu-card-name">${item.name}</h4>
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${item.price.toLocaleString()}đ</span>
          <button class="menu-card-add" onclick="addToCart('${item.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- CART ---
function addToCart(productId) {
  if (!currentUser) {
    showToast('Vui lòng đăng nhập để bắt đầu đặt món!', 'error');
    showAuthView();
    return;
  }
  const item = products.find(p => p.id === productId);
  if (!item) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    cart = cart.map(i => i.id === productId ? { ...i, quantity: i.quantity + 1 } : i);
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveLS('cart', cart);
  renderCartCount();
  showToast(`Đã thêm ${item.name} vào giỏ!`);
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  const name = item ? item.name : '';
  cart = cart.filter(i => i.id !== productId);
  saveLS('cart', cart);
  renderCartPanel();
  renderCartCount();
  if (name) showToast(`Đã bỏ ${name}`);
}

function updateQuantity(productId, delta) {
  cart = cart.map(i => {
    if (i.id === productId) {
      const newQty = Math.max(1, i.quantity + delta);
      return { ...i, quantity: newQty };
    }
    return i;
  });
  saveLS('cart', cart);
  renderCartPanel();
  renderCartCount();
}

function clearCart() {
  cart = [];
  saveLS('cart', cart);
  renderCartPanel();
  renderCartCount();
  showToast('Đã dọn dẹp giỏ hàng');
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price : item.price || 0) * item.quantity;
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.quantity, 0);
}

function renderCartCount() {
  const count = getCartCount();
  const headerBadge = document.getElementById('header-cart-count');
  const navBadge = document.getElementById('nav-cart-count');
  if (headerBadge) { headerBadge.textContent = count; headerBadge.classList.toggle('hidden', count === 0); }
  if (navBadge) { navBadge.textContent = count; navBadge.classList.toggle('hidden', count === 0); }
}

function setIsCartOpen(open) {
  isCartOpen = open;
  const overlay = document.getElementById('cart-overlay');
  const panel = document.getElementById('cart-panel');
  if (open) {
    overlay.classList.remove('hidden');
    panel.classList.remove('cart-closed');
    panel.classList.add('cart-open');
    renderCartPanel();
  } else {
    overlay.classList.add('hidden');
    panel.classList.add('cart-closed');
    panel.classList.remove('cart-open');
  }
}

function renderCartPanel() {
  const cartItems = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');
  const clearBtn = document.getElementById('cart-clear-btn');
  const totalDisplay = document.getElementById('cart-total-display');

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty" style="height:300px;">
        <div class="cart-empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:2.5rem;height:2.5rem;color:var(--primary);opacity:0.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        </div>
        <p>Giỏ hàng đang trống</p>
        <button onclick="setIsCartOpen(false)">Bắt đầu mua sắm</button>
      </div>`;
    cartFooter.classList.add('hidden');
    clearBtn.classList.add('hidden');
  } else {
    clearBtn.classList.remove('hidden');
    cartItems.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id) || item;
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=200&h=200&auto=format&fit=crop'" />
          <div class="cart-item-info">
            <h4>${product.name}</h4>
            <p class="price">${product.price.toLocaleString()}đ</p>
          </div>
          <div class="cart-item-controls">
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:.75rem;height:.75rem;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
              Bỏ
            </button>
          </div>
        </div>`;
    }).join('');
    cartFooter.classList.remove('hidden');
    totalDisplay.textContent = getCartTotal().toLocaleString() + 'đ';
  }
}

function handleCheckout() {
  if (!currentUser) { setIsCartOpen(false); showAuthView(); return; }
  if (cart.length === 0) return;

  const orderItems = cart.map(item => {
    const product = products.find(p => p.id === item.id) || {};
    return { ...product, id: item.id, quantity: item.quantity, price: product.price || item.price || 0 };
  });

  const newOrder = {
    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
    userId: currentUser.id,
    username: currentUser.username,
    items: orderItems,
    total: getCartTotal(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.unshift(newOrder);
  cart = [];
  saveLS('orders', orders);
  saveLS('cart', cart);
  setIsCartOpen(false);
  activeTab = 'orders';
  renderCartCount();
  renderMainView();
  showToast('Đặt hàng thành công! Đón xem đơn hàng của bạn.', 'success');
}

// --- ORDERS TAB ---
function renderUserOrders() {
  const list = document.getElementById('orders-list');
  if (!list || !currentUser) return;
  const myOrders = orders.filter(o => o.userId === currentUser.id);
  if (myOrders.length === 0) {
    list.innerHTML = `<div class="orders-empty">Bạn chưa gọi món nào hôm nay...</div>`;
    return;
  }
  list.innerHTML = myOrders.map(order => `
    <div class="order-user-card">
      <div class="order-user-left">
        <div class="order-icon-wrap ${order.status}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:1.5rem;height:1.5rem;"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <div class="order-user-info">
          <h4>Đơn hàng #${order.id}</h4>
          <p class="date">${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
          <p class="total">${order.total.toLocaleString()}đ</p>
        </div>
      </div>
      <span class="order-status-badge ${order.status}">
        ${order.status === 'pending' ? 'Chờ nhận' : order.status === 'completed' ? 'Đã giao' : 'Đã hủy'}
      </span>
    </div>
  `).join('');
}

// --- PROFILE TAB ---
function renderProfile() {
  if (!currentUser) return;
  const usernameEl = document.getElementById('profile-username');
  const avatarEl = document.getElementById('profile-avatar-img');
  if (usernameEl) usernameEl.textContent = currentUser.username;
  if (avatarEl) avatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&size=256&background=FFCA4D&color=FFF`;
}

// --- SWITCH TO ADMIN ---
function switchToAdmin() {
  isAdminView = true;
  renderApp();
}

function adminToggleView() {
  isAdminView = false;
  renderApp();
}

// --- ADMIN VIEW ---
function renderAdminView() {
  renderAdminTabContent();
}

function adminSetTab(tab) {
  adminTab = tab;
  ['products', 'orders', 'revenue', 'users'].forEach(t => {
    document.getElementById(`admin-tab-${t}`).classList.toggle('active-tab', t === tab);
    document.getElementById(`admin-${t}-tab`).classList.toggle('hidden', t !== tab);
  });
  renderAdminTabContent();
  lucide.createIcons();
}

function renderAdminTabContent() {
  if (adminTab === 'products') renderAdminProducts();
  else if (adminTab === 'orders') renderAdminOrders();
  else if (adminTab === 'revenue') renderAdminRevenue();
  else if (adminTab === 'users') renderAdminUsers();
}

function renderAdminProducts() {
  const grid = document.getElementById('admin-products-grid');
  const count = document.getElementById('admin-products-count');
  if (count) count.textContent = `Danh sách Sản phẩm (${products.length})`;
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="admin-product-card">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=100&h=100&auto=format&fit=crop'" />
      <div class="admin-product-info">
        <h4>${p.name}</h4>
        <p class="cat">${p.category}</p>
        <p class="desc">${p.description}</p>
        <p class="price">${p.price.toLocaleString()}đ</p>
      </div>
      <div class="admin-product-actions">
        <button onclick="openEditProductForm('${p.id}')" class="icon-btn-edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:1rem;height:1rem;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </button>
        <button onclick="adminDeleteProduct('${p.id}')" class="icon-btn-delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:1rem;height:1rem;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function adminDeleteProduct(id) {
  products = products.filter(p => p.id !== id);
  cart = cart.filter(i => i.id !== id);
  saveLS('products', products);
  saveLS('cart', cart);
  renderAdminProducts();
  showToast('Đã xóa sản phẩm', 'success');
}

function renderAdminOrders() {
  const list = document.getElementById('admin-orders-list');
  const count = document.getElementById('admin-orders-count');
  if (count) count.textContent = `Đơn hàng hiện tại (${orders.length})`;
  if (!list) return;
  const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sorted.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:3rem;color:#9ca3af;font-style:italic;">Chưa có đơn hàng nào</div>`;
    return;
  }
  list.innerHTML = sorted.map(order => `
    <div class="admin-order-card">
      <div class="admin-order-header">
        <div class="admin-order-meta">
          <p>ID: ${order.id}</p>
          <h4>Khách hàng: ${order.username}</h4>
          <p>${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
        </div>
        <div class="admin-order-actions">
          ${order.status === 'pending' ? `
            <button onclick="adminUpdateOrderStatus('${order.id}','completed')" class="btn-complete">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:1rem;height:1rem;"><polyline points="20 6 9 17 4 12"/></svg>
              Hoàn thành
            </button>
            <button onclick="adminUpdateOrderStatus('${order.id}','cancelled')" class="btn-cancel-order">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:1rem;height:1rem;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Hủy
            </button>
          ` : ''}
          <span class="status-badge status-${order.status}">
            ${order.status === 'pending' ? 'Chờ xử lý' : order.status === 'completed' ? 'Đã xong' : 'Đã hủy'}
          </span>
        </div>
      </div>
      <div class="order-items-section">
        ${order.items.map(item => `
          <div class="order-item-row">
            <span>${item.name} x${item.quantity}</span>
            <span style="font-weight:700">${(item.price * item.quantity).toLocaleString()}đ</span>
          </div>`).join('')}
        <div class="order-total-row">
          <span>Tổng cộng</span>
          <span>${order.total.toLocaleString()}đ</span>
        </div>
      </div>
    </div>
  `).join('');
}

function adminUpdateOrderStatus(id, status) {
  orders = orders.map(o => o.id === id ? { ...o, status } : o);
  saveLS('orders', orders);
  renderAdminOrders();
  if (status === 'revenue') renderAdminRevenue();
  showToast(status === 'completed' ? 'Đơn hàng đã hoàn thành!' : 'Đã hủy đơn hàng', 'success');
}

function renderAdminRevenue() {
  const completed = orders.filter(o => o.status === 'completed');
  const pending = orders.filter(o => o.status === 'pending');
  document.getElementById('revenue-completed').textContent = completed.reduce((s, o) => s + o.total, 0).toLocaleString() + 'đ';
  document.getElementById('revenue-pending').textContent = pending.reduce((s, o) => s + o.total, 0).toLocaleString() + 'đ';
  document.getElementById('revenue-count').textContent = `${completed.length} / ${orders.length}`;

  const tbody = document.getElementById('revenue-table-body');
  if (!tbody) return;
  const sortedCompleted = [...completed].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sortedCompleted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2rem;color:#9ca3af;font-style:italic;">Chưa có giao dịch hoàn thành</td></tr>`;
    return;
  }
  tbody.innerHTML = sortedCompleted.map(o => `
    <tr class="revenue-row">
      <td>${o.id}</td>
      <td style="font-size:.875rem;">${new Date(o.createdAt).toLocaleDateString('vi-VN')}</td>
      <td style="font-weight:700;">${o.username}</td>
      <td style="text-align:right;">${o.total.toLocaleString()}đ</td>
    </tr>
  `).join('');
}

function renderAdminUsers() {
  const tbody = document.getElementById('admin-users-table');
  const count = document.getElementById('admin-users-count');
  if (count) count.textContent = `Quản lý người dùng (${users.length})`;
  if (!tbody) return;
  tbody.innerHTML = users.map(user => `
    <tr class="users-row">
      <td>
        <div class="user-initial">${user.username.charAt(0).toUpperCase()}</div>
        <span style="font-weight:700;font-size:1.125rem;">${user.username}</span>
      </td>
      <td>
        <span class="role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}">${user.role}</span>
      </td>
      <td style="text-align:right;">
        ${user.username !== 'admin' ? `
          <button onclick="adminDeleteUser('${user.id}')" class="icon-btn-del-user">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:1.25rem;height:1.25rem;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        ` : ''}
      </td>
    </tr>
  `).join('');
}

function adminDeleteUser(id) {
  users = users.filter(u => u.id !== id);
  saveLS('users', users);
  renderAdminUsers();
  showToast('Đã xóa người dùng', 'success');
}

// --- PRODUCT FORM ---
function openAddProductForm() {
  editingProductId = null;
  document.getElementById('product-form-title').textContent = 'Thêm sản phẩm';
  document.getElementById('product-form-submit-text').textContent = 'Xác nhận thêm';
  document.getElementById('product-edit-id').value = '';
  document.getElementById('product-form-name').value = '';
  document.getElementById('product-form-price').value = '';
  document.getElementById('product-form-category').value = 'Gà Rán';
  document.getElementById('product-form-desc').value = '';
  document.getElementById('product-form-image').value = '';
  document.getElementById('product-form-preview').classList.add('hidden');
  document.getElementById('product-form-preview').src = '';
  document.getElementById('product-form-modal').classList.remove('hidden');
}

function openEditProductForm(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  editingProductId = id;
  document.getElementById('product-form-title').textContent = 'Sửa sản phẩm';
  document.getElementById('product-form-submit-text').textContent = 'Cập nhật sản phẩm';
  document.getElementById('product-edit-id').value = id;
  document.getElementById('product-form-name').value = p.name;
  document.getElementById('product-form-price').value = p.price;
  document.getElementById('product-form-category').value = p.category;
  document.getElementById('product-form-desc').value = p.description;
  document.getElementById('product-form-image').value = p.image;
  const preview = document.getElementById('product-form-preview');
  preview.src = p.image;
  preview.classList.remove('hidden');
  document.getElementById('product-form-modal').classList.remove('hidden');
}

function closeProductForm() {
  document.getElementById('product-form-modal').classList.add('hidden');
  editingProductId = null;
}

function updateImagePreview() {
  const url = document.getElementById('product-form-image').value;
  const preview = document.getElementById('product-form-preview');
  if (url) { preview.src = url; preview.classList.remove('hidden'); }
  else { preview.classList.add('hidden'); }
}

function handleProductFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    document.getElementById('product-form-image').value = reader.result;
    const preview = document.getElementById('product-form-preview');
    preview.src = reader.result;
    preview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

document.getElementById('product-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('product-form-name').value.trim();
  const price = Number(document.getElementById('product-form-price').value);
  const category = document.getElementById('product-form-category').value;
  const description = document.getElementById('product-form-desc').value.trim();
  const image = document.getElementById('product-form-image').value.trim();

  if (!name || !price || !image) return;

  if (editingProductId) {
    products = products.map(p => p.id === editingProductId ? { ...p, name, price, category, description, image } : p);
    showToast('Đã cập nhật sản phẩm thành công!', 'success');
  } else {
    products.unshift({ id: Date.now().toString(), name, price, category, description, image, rating: 5.0 });
    showToast('Đã thêm sản phẩm mới thành công!', 'success');
  }
  saveLS('products', products);
  closeProductForm();
  renderAdminProducts();
});

// Close modal on backdrop click
document.getElementById('product-form-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('product-form-modal')) closeProductForm();
});

// --- INIT ---
function init() {
  // Determine initial view
  if (currentUser && currentUser.role === 'admin') {
    isAdminView = true;
  }

  // Show/hide views
  if (currentUser && currentUser.role === 'admin' && isAdminView) {
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('admin-view').classList.remove('hidden');
    document.getElementById('main-view').classList.add('hidden');
    renderAdminView();
  } else {
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    renderMainView();
  }

  lucide.createIcons();
}

// Run after DOM and lucide loaded
window.addEventListener('DOMContentLoaded', () => {
  init();
});
