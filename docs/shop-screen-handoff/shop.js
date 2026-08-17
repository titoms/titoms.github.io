/* =====================================================================
   shop.js — cart (localStorage), drawer, filters/sort/search, wishlist,
   coupon, tabs, gallery. Shared across all /shop/*.html pages.
   ===================================================================== */
(function () {
  var PRODUCTS = {
    'fb-starter':  { title: 'Astro Landing Starter Kit', cat: 'Freebies', price: 0, was: null, tag: 'Free' },
    'fb-cheatsheet': { title: 'Tailwind Component Cheatsheet', cat: 'Freebies', price: 0, was: null, tag: 'Free' },
    'fb-prompts':  { title: 'Cursor & Claude Prompt Pack', cat: 'Freebies', price: 0, was: null, tag: 'Free' },
    'tpl-saas':    { title: 'SaaS Marketing Template', cat: 'Templates', price: 39, was: 59 },
    'tpl-portfolio': { title: 'Founder Portfolio Template', cat: 'Templates', price: 29, was: null },
    'tpl-docs':    { title: 'Docs & Changelog Template', cat: 'Templates', price: 35, was: null },
    'ds-violet':   { title: 'Violet Dark UI Kit', cat: 'Design Systems', price: 59, was: 79 },
    'ds-minimal':  { title: 'Minimal SaaS Design System', cat: 'Design Systems', price: 49, was: null },
    'ds-blog':     { title: 'Developer Blog Design System', cat: 'Design Systems', price: 45, was: null },
    'oth-playbook': { title: 'AI Prompt Engineering Playbook', cat: 'Others', price: 19, was: null },
    'oth-claude':  { title: 'Claude Code Workflow Pack', cat: 'Others', price: 25, was: null },
    'oth-notion':  { title: 'MVP Planning Notion Template', cat: 'Others', price: 15, was: null }
  };
  var COUPONS = { WELCOME10: 0.10, LAUNCH20: 0.20 };
  var CART_KEY = 'fsc_cart';
  var WISH_KEY = 'fsc_wishlist';

  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); renderDrawer(); updateCartCount(); }
  function getWishlist() { try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch (e) { return []; } }
  function saveWishlist(w) { localStorage.setItem(WISH_KEY, JSON.stringify(w)); }
  function getCoupon() { try { return JSON.parse(localStorage.getItem('fsc_coupon')) || null; } catch (e) { return null; } }
  function saveCoupon(c) { if (c) localStorage.setItem('fsc_coupon', JSON.stringify(c)); else localStorage.removeItem('fsc_coupon'); }

  function addToCart(id, qty) {
    qty = qty || 1;
    var cart = getCart();
    var line = cart.find(function (l) { return l.id === id; });
    if (line) { line.qty += qty; } else { cart.push({ id: id, qty: qty }); }
    saveCart(cart);
    bumpCartBtn();
    openDrawer();
  }
  function removeFromCart(id) { saveCart(getCart().filter(function (l) { return l.id !== id; })); }
  function setQty(id, qty) {
    var cart = getCart();
    var line = cart.find(function (l) { return l.id === id; });
    if (!line) return;
    line.qty = Math.max(1, qty);
    saveCart(cart);
  }
  function cartLines() {
    return getCart().map(function (l) {
      var p = PRODUCTS[l.id];
      return p ? Object.assign({ id: l.id, qty: l.qty }, p) : null;
    }).filter(Boolean);
  }
  function subtotal() { return cartLines().reduce(function (s, l) { return s + l.price * l.qty; }, 0); }
  function discount() { var c = getCoupon(); return c ? subtotal() * c.rate : 0; }
  function grandTotal() { return Math.max(0, subtotal() - discount()); }

  function updateCartCount() {
    var n = getCart().reduce(function (s, l) { return s + l.qty; }, 0);
    document.querySelectorAll('.cart-count').forEach(function (el) { el.textContent = n; el.style.display = n ? 'grid' : 'none'; });
  }
  function bumpCartBtn() { document.querySelectorAll('.cart-btn').forEach(function (el) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }); }

  function money(n) { return '€' + n.toFixed(2).replace(/\.00$/, ''); }

  function lineHtml(l) {
    return '<div class="cart-line" data-line="' + l.id + '">' +
      '<div class="thumb ph">img</div>' +
      '<div class="info">' +
        '<div class="cat">' + l.cat + '</div>' +
        '<h5 class="t-h4">' + l.title + '</h5>' +
        '<div class="row-bottom">' +
          '<div class="qty-stepper"><button data-dec>−</button><span class="qv">' + l.qty + '</span><button data-inc>+</button></div>' +
          '<span class="lprice">' + (l.price === 0 ? 'Free' : money(l.price * l.qty)) + '</span>' +
        '</div>' +
        '<button class="remove-line" data-remove>Remove</button>' +
      '</div></div>';
  }

  function renderDrawer() {
    var body = document.getElementById('cdBody');
    var foot = document.getElementById('cdFoot');
    if (!body || !foot) return;
    var lines = cartLines();
    if (!lines.length) {
      body.innerHTML = '<div class="empty-state"><div class="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div><h4 class="t-h4">Your cart is empty</h4><p>Browse templates, design systems and free resources to get started.</p><a href="index.html" class="btn btn-secondary btn-sm">Browse shop</a></div>';
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = lines.map(lineHtml).join('');
    var sub = subtotal(), disc = discount(), tot = grandTotal(), coupon = getCoupon();
    foot.innerHTML =
      (coupon ? '<div class="coupon-applied"><span>' + coupon.code + ' applied · -' + Math.round(coupon.rate * 100) + '%</span><button data-uncoupon>✕</button></div>' :
        '<div class="coupon-row"><input class="input" id="cdCouponInput" placeholder="Coupon code"><button class="btn btn-secondary btn-sm" id="cdCouponBtn">Apply</button></div>') +
      '<div class="sum-row"><span>Subtotal</span><span>' + money(sub) + '</span></div>' +
      (disc ? '<div class="sum-row"><span>Discount</span><span>−' + money(disc) + '</span></div>' : '') +
      '<div class="sum-row total"><span>Total</span><span class="amt">' + money(tot) + '</span></div>' +
      '<a class="btn btn-primary btn-lg" href="checkout.html" style="width:100%;">Checkout <span class="arrow">→</span></a>';
    wireDrawerEvents();
  }

  function wireDrawerEvents() {
    document.querySelectorAll('#cdBody [data-inc]').forEach(function (b) { b.onclick = function () { var id = b.closest('.cart-line').dataset.line; var l = getCart().find(function (x) { return x.id === id; }); setQty(id, l.qty + 1); }; });
    document.querySelectorAll('#cdBody [data-dec]').forEach(function (b) { b.onclick = function () { var id = b.closest('.cart-line').dataset.line; var l = getCart().find(function (x) { return x.id === id; }); setQty(id, l.qty - 1); }; });
    document.querySelectorAll('#cdBody [data-remove]').forEach(function (b) { b.onclick = function () { removeFromCart(b.closest('.cart-line').dataset.line); }; });
    var cb = document.getElementById('cdCouponBtn');
    if (cb) cb.onclick = function () {
      var input = document.getElementById('cdCouponInput');
      var code = (input.value || '').trim().toUpperCase();
      if (COUPONS[code]) { saveCoupon({ code: code, rate: COUPONS[code] }); renderDrawer(); }
      else { input.style.borderColor = 'var(--negative)'; input.placeholder = 'Invalid code'; }
    };
    var ub = document.querySelector('[data-uncoupon]');
    if (ub) ub.onclick = function () { saveCoupon(null); renderDrawer(); };
  }

  function openDrawer() { document.getElementById('cartOverlay').classList.add('open'); document.getElementById('cartDrawer').classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { document.getElementById('cartOverlay').classList.remove('open'); document.getElementById('cartDrawer').classList.remove('open'); document.body.style.overflow = ''; }

  function injectDrawer() {
    if (document.getElementById('cartDrawer')) return;
    var el = document.createElement('div');
    el.innerHTML =
      '<div class="cart-overlay" id="cartOverlay"></div>' +
      '<aside class="cart-drawer" id="cartDrawer">' +
        '<div class="cd-head"><h3 class="t-h4">Your Cart</h3><button class="cd-close" id="cdClose">✕</button></div>' +
        '<div class="cd-body" id="cdBody"></div>' +
        '<div class="cd-foot" id="cdFoot"></div>' +
      '</aside>';
    document.body.appendChild(el);
    document.getElementById('cartOverlay').onclick = closeDrawer;
    document.getElementById('cdClose').onclick = closeDrawer;
    document.querySelectorAll('.cart-btn').forEach(function (b) { b.onclick = openDrawer; });
    renderDrawer();
    updateCartCount();
  }

  // ---- Add-to-cart buttons (data-add="product-id") ----
  function wireAddButtons() {
    document.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        addToCart(btn.getAttribute('data-add'), 1);
        btn.classList.add('added');
        var old = btn.textContent;
        btn.textContent = 'Added ✓';
        setTimeout(function () { btn.classList.remove('added'); btn.textContent = old; }, 1400);
      });
    });
  }

  // ---- Wishlist toggle (data-wish="product-id") ----
  function wireWishlist() {
    var wl = getWishlist();
    document.querySelectorAll('[data-wish]').forEach(function (btn) {
      var id = btn.getAttribute('data-wish');
      if (wl.indexOf(id) > -1) btn.classList.add('active');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var list = getWishlist();
        var i = list.indexOf(id);
        if (i > -1) { list.splice(i, 1); btn.classList.remove('active'); } else { list.push(id); btn.classList.add('active'); }
        saveWishlist(list);
      });
    });
  }

  // ---- Filter pills + search + sort (listing/category pages) ----
  function wireDiscovery() {
    var pills = document.querySelectorAll('.filter-pill');
    var cards = document.querySelectorAll('.filterable');
    var search = document.getElementById('shopSearch');
    var sort = document.getElementById('shopSort');
    var countEl = document.getElementById('resultCount');

    function apply() {
      var activePill = document.querySelector('.filter-pill.active');
      var cat = activePill ? activePill.getAttribute('data-filter') : 'all';
      var q = search ? search.value.trim().toLowerCase() : '';
      var visible = 0;
      cards.forEach(function (c) {
        var matchCat = cat === 'all' || c.getAttribute('data-cat') === cat;
        var matchQ = !q || c.getAttribute('data-title').toLowerCase().indexOf(q) > -1;
        var show = matchCat && matchQ;
        c.classList.toggle('is-hidden', !show);
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible + (visible === 1 ? ' product' : ' products');
      if (sort) applySort(sort.value);
    }
    function applySort(mode) {
      var grid = cards[0] ? cards[0].parentElement : null;
      if (!grid) return;
      var arr = Array.prototype.slice.call(cards);
      arr.sort(function (a, b) {
        if (mode === 'price-asc') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        if (mode === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        if (mode === 'newest') return parseInt(b.dataset.date) - parseInt(a.dataset.date);
        return parseInt(b.dataset.popular || 0) - parseInt(a.dataset.popular || 0);
      });
      arr.forEach(function (c) { grid.appendChild(c); });
    }
    pills.forEach(function (p) { p.addEventListener('click', function () { pills.forEach(function (x) { x.classList.remove('active'); }); p.classList.add('active'); apply(); }); });
    if (search) search.addEventListener('input', apply);
    if (sort) sort.addEventListener('change', apply);
    apply();
  }

  // ---- FAQ accordion (reused pattern) ----
  function wireFaq() {
    document.querySelectorAll('.faq-q').forEach(function (q) { q.addEventListener('click', function () { q.parentElement.classList.toggle('open'); }); });
  }

  // ---- Gallery thumbs (PDP) ----
  function wireGallery() {
    var thumbs = document.querySelectorAll('.pdp-thumbs .th');
    var main = document.querySelector('.pdp-gallery .main-shot .ph');
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        thumbs.forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
        if (main) { main.style.opacity = 0; setTimeout(function () { main.textContent = t.textContent; main.style.opacity = 1; }, 150); }
      });
    });
  }

  // ---- Account tabs ----
  function wireTabs() {
    document.querySelectorAll('.acct-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.acct-tab').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.acct-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
      });
    });
  }

  // ---- Account toggle (checkout guest/create-account) ----
  function wireAcctToggle() {
    var sw = document.getElementById('acctSwitch');
    if (!sw) return;
    sw.addEventListener('click', function () {
      sw.classList.toggle('on');
      var pw = document.getElementById('acctPasswordField');
      if (pw) pw.style.display = sw.classList.contains('on') ? 'flex' : 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectDrawer();
    wireAddButtons();
    wireWishlist();
    wireDiscovery();
    wireFaq();
    wireGallery();
    wireTabs();
    wireAcctToggle();
  });

  window.shop = { addToCart: addToCart, cartLines: cartLines, subtotal: subtotal, discount: discount, grandTotal: grandTotal, money: money, getCoupon: getCoupon, PRODUCTS: PRODUCTS };
})();
