// ============================================================
// CHICKEN KING — site.js (ASP.NET Core MVC)
// Không dùng localStorage — mọi dữ liệu lấy từ Controller + SQL Server.
// Giỏ hàng thao tác qua AJAX với CartController (lưu trong Session).
// ============================================================

// --- TOAST ---
let toastTimers = {};
function showToast(message, type = 'success') {
  const id = Date.now();
  const container = document.getElementById('toast-container');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `toast toast-${type}`;
  div.id = `toast-${id}`;
  div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem;flex-shrink:0">
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

// --- HELPERS ---
function formatPrice(v) {
  return Number(v).toLocaleString('vi-VN') + 'đ';
}

async function postForm(url, data) {
  const body = new URLSearchParams(data);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  return res.json();
}

// --- SIDEBAR ---
function toggleSidebar(open) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;
  if (open) {
    sidebar.classList.remove('sidebar-closed');
    sidebar.classList.add('sidebar-open');
    overlay.classList.remove('hidden');
  } else {
    sidebar.classList.add('sidebar-closed');
    sidebar.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
  }
}

// --- TÌM KIẾM & LỌC (client-side trên dữ liệu đã render từ SQL Server) ---
function onSearchInput() {
  const q = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  let visible = 0;
  grid.querySelectorAll('.menu-card').forEach(card => {
    const matches = !q || card.dataset.name.includes(q) || card.dataset.desc.includes(q);
    card.style.display = matches ? '' : 'none';
    if (matches) visible++;
  });
  let empty = document.getElementById('menu-empty-msg');
  if (visible === 0) {
    if (!empty) {
      empty = document.createElement('div');
      empty.id = 'menu-empty-msg';
      empty.style.cssText = 'grid-column:1/-1;text-align:center;padding:3rem 0;color:#9ca3af;font-style:italic;font-weight:500;';
      empty.textContent = 'Không tìm thấy món nào...';
      grid.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }
}

// --- GIỎ HÀNG (AJAX → CartController → SQL Server khi thanh toán) ---
async function addToCart(productId) {
  const data = await postForm('/Cart/Add', { productId });
  if (data.requireLogin) {
    showToast(data.message, 'error');
    setTimeout(() => { window.location.href = '/Account/Login'; }, 800);
    return;
  }
  if (!data.success) { showToast(data.message, 'error'); return; }
  updateCartBadges(data.count);
  showToast(data.message);
}

async function updateQuantity(productId, delta) {
  await postForm('/Cart/UpdateQuantity', { productId, delta });
  await renderCartPanel();
}

async function removeFromCart(productId) {
  const data = await postForm('/Cart/Remove', { productId });
  await renderCartPanel();
  if (data.message) showToast(data.message);
}

async function clearCart() {
  const data = await postForm('/Cart/Clear', {});
  await renderCartPanel();
  showToast(data.message);
}

function updateCartBadges(count) {
  const headerBadge = document.getElementById('header-cart-count');
  const navBadge = document.getElementById('nav-cart-count');
  if (headerBadge) { headerBadge.textContent = count; headerBadge.classList.toggle('hidden', count === 0); }
  if (navBadge) { navBadge.textContent = count; navBadge.classList.toggle('hidden', count === 0); }
}

function setIsCartOpen(open) {
  const overlay = document.getElementById('cart-overlay');
  const panel = document.getElementById('cart-panel');
  if (!panel) return;
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

async function renderCartPanel() {
  const cartItems = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');
  const clearBtn = document.getElementById('cart-clear-btn');
  const totalDisplay = document.getElementById('cart-total-display');
  if (!cartItems) return;

  const res = await fetch('/Cart/Items');
  const data = await res.json();
  updateCartBadges(data.count);

  if (data.items.length === 0) {
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
    cartItems.innerHTML = data.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=200&h=200&auto=format&fit=crop'" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="price">${formatPrice(item.price)}</p>
        </div>
        <div class="cart-item-controls">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="updateQuantity(${item.productId}, -1)">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.productId}, 1)">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeFromCart(${item.productId})">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:.75rem;height:.75rem;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Bỏ
          </button>
        </div>
      </div>`).join('');
    cartFooter.classList.remove('hidden');
    totalDisplay.textContent = formatPrice(data.total);
  }
}

async function handleCheckout() {
  const phone = document.getElementById('checkout-phone')?.value || '';
  const address = document.getElementById('checkout-address')?.value || '';
  const data = await postForm('/Cart/Checkout', { phone, address });
  if (data.requireLogin) {
    setIsCartOpen(false);
    window.location.href = '/Account/Login';
    return;
  }
  if (!data.success) { showToast(data.message, 'error'); return; }
  showToast(data.message);
  setTimeout(() => { window.location.href = data.redirect; }, 600);
}

// --- ADMIN: FORM SẢN PHẨM (modal) ---
function openAddProductForm() {
  document.getElementById('product-form-title').textContent = 'Thêm sản phẩm';
  document.getElementById('product-form-submit-text').textContent = 'Xác nhận thêm';
  document.getElementById('product-edit-id').value = '0';
  document.getElementById('product-form-name').value = '';
  document.getElementById('product-form-price').value = '';
  document.getElementById('product-form-category').value = 'Gà Rán';
  document.getElementById('product-form-desc').value = '';
  document.getElementById('product-form-image').value = '';
  const preview = document.getElementById('product-form-preview');
  preview.classList.add('hidden');
  preview.src = '';
  document.getElementById('product-form-modal').classList.remove('hidden');
}

function openEditProductForm(btn) {
  const d = btn.dataset;
  document.getElementById('product-form-title').textContent = 'Sửa sản phẩm';
  document.getElementById('product-form-submit-text').textContent = 'Cập nhật sản phẩm';
  document.getElementById('product-edit-id').value = d.id;
  document.getElementById('product-form-name').value = d.name;
  document.getElementById('product-form-price').value = d.price;
  document.getElementById('product-form-category').value = d.category;
  document.getElementById('product-form-desc').value = d.desc;
  document.getElementById('product-form-image').value = d.image;
  const preview = document.getElementById('product-form-preview');
  preview.src = d.image;
  preview.classList.remove('hidden');
  document.getElementById('product-form-modal').classList.remove('hidden');
}

function closeProductForm() {
  document.getElementById('product-form-modal').classList.add('hidden');
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

// --- ADMIN: FORM TIN TỨC (modal) ---
function openAddNewsForm() {
  document.getElementById('news-form-title').textContent = 'Đăng bài mới';
  document.getElementById('news-form-submit-text').textContent = 'Đăng bài';
  document.getElementById('news-edit-id').value = '0';
  document.getElementById('news-form-title-input').value = '';
  document.getElementById('news-form-category').value = 'Tin tức';
  document.getElementById('news-form-image').value = '';
  document.getElementById('news-form-content').value = '';
  document.getElementById('news-form-modal').classList.remove('hidden');
}

function openEditNewsForm(btn) {
  const d = btn.dataset;
  document.getElementById('news-form-title').textContent = 'Sửa bài viết';
  document.getElementById('news-form-submit-text').textContent = 'Cập nhật bài viết';
  document.getElementById('news-edit-id').value = d.id;
  document.getElementById('news-form-title-input').value = d.title;
  document.getElementById('news-form-category').value = d.category;
  document.getElementById('news-form-image').value = d.image;
  document.getElementById('news-form-content').value = d.content;
  document.getElementById('news-form-modal').classList.remove('hidden');
}

function closeNewsForm() {
  document.getElementById('news-form-modal').classList.add('hidden');
}

// --- ADMIN: FORM NHÂN VIÊN (modal) ---
function openAddEmployeeForm() {
  document.getElementById('employee-form-title').textContent = 'Thêm nhân viên';
  document.getElementById('employee-form-submit-text').textContent = 'Xác nhận thêm';
  document.getElementById('employee-edit-id').value = '0';
  document.getElementById('employee-form-name').value = '';
  document.getElementById('employee-form-phone').value = '';
  document.getElementById('employee-form-shift').value = 'Sáng';
  document.getElementById('employee-form-position').value = '';
  document.getElementById('employee-form-salary').value = '';
  document.getElementById('employee-form-modal').classList.remove('hidden');
}

function openEditEmployeeForm(btn) {
  const d = btn.dataset;
  document.getElementById('employee-form-title').textContent = 'Sửa nhân viên';
  document.getElementById('employee-form-submit-text').textContent = 'Cập nhật nhân viên';
  document.getElementById('employee-edit-id').value = d.id;
  document.getElementById('employee-form-name').value = d.name;
  document.getElementById('employee-form-phone').value = d.phone;
  document.getElementById('employee-form-shift').value = d.shift;
  document.getElementById('employee-form-position').value = d.position;
  document.getElementById('employee-form-salary').value = d.salary;
  document.getElementById('employee-form-modal').classList.remove('hidden');
}

function closeEmployeeForm() {
  document.getElementById('employee-form-modal').classList.add('hidden');
}

// Đóng modal khi bấm nền tối
document.addEventListener('click', (e) => {
  ['product-form-modal', 'news-form-modal', 'employee-form-modal'].forEach(id => {
    const modal = document.getElementById(id);
    if (modal && e.target === modal) modal.classList.add('hidden');
  });
});

// --- INIT ---
window.addEventListener('DOMContentLoaded', () => {
  // Toast từ TempData (server)
  const container = document.getElementById('toast-container');
  if (container) {
    if (container.dataset.toast) showToast(container.dataset.toast, 'success');
    if (container.dataset.toastError) showToast(container.dataset.toastError, 'error');
  }

  // Cập nhật badge giỏ hàng từ Session
  if (document.getElementById('cart-panel')) {
    fetch('/Cart/Items').then(r => r.json()).then(d => updateCartBadges(d.count)).catch(() => {});
  }

  if (window.lucide) lucide.createIcons();
});
