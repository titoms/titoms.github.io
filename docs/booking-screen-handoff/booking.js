/* =====================================================================
   booking.js — service selection, calendar, slots, timezone, summary
   State persisted to localStorage under 'fsc_booking'. Mock availability.
   ===================================================================== */
(function () {
  var SERVICES = {
    'coach-1h':    { title: '1-Hour Coaching', duration: '1 hour', price: 90, desc: 'Debug, clarify and structure your React/Node/AI-generated project.' },
    'coach-half':  { title: 'Half-Day Coaching / Consulting', duration: '4 hours', price: 220, desc: 'A focused half-day block to work through a specific technical or product problem.' },
    'coach-full':  { title: 'Full-Day Coaching / Consulting', duration: '8 hours', price: 400, desc: 'A full day of dedicated coaching across architecture, code review and planning.' },
    'dev-half':    { title: 'Half-Day Development', duration: '4 hours', price: 200, desc: 'Focused hands-on build time for a clear feature, fix or refactor.' },
    'dev-full':    { title: 'Full-Day Development', duration: '8 hours', price: 350, desc: 'A full day of hands-on development — feature, dashboard or integration.' },
    'ai-workshop': { title: 'AI Clarity / Bootstrapping Workshop', duration: '1 day', price: 650, desc: 'Turn an idea into a scoped MVP plan: user flows, stack, roadmap and budget.' },
    'custom':      { title: 'Custom Time-Based Service', duration: 'Varies', price: null, desc: 'Something more specific? Tell me about it and I\'ll propose a scope and time.' }
  };
  var KEY = 'fsc_booking';
  function getState() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function setState(patch) { var s = Object.assign(getState(), patch); localStorage.setItem(KEY, JSON.stringify(s)); return s; }
  function money(n) { return n === null ? 'Custom quote' : '€' + n; }

  // ---- Timezone auto-detect ----
  function initTimezone() {
    var tzEls = document.querySelectorAll('.tz-name');
    var tz = getState().tz || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris';
    setState({ tz: tz });
    tzEls.forEach(function (el) { el.textContent = tz.replace('_', ' '); });
  }

  // ---- Service selection (index.html) ----
  function wireServiceSelect() {
    document.querySelectorAll('[data-select-service]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var id = btn.getAttribute('data-select-service');
        if (id === 'custom') return; // custom flows to inline quote form, no preventDefault
        e.preventDefault();
        setState({ serviceId: id, date: null, slot: null });
        window.location.href = 'schedule.html';
      });
    });
  }

  // ---- Calendar ----
  var calState = { month: new Date().getMonth(), year: new Date().getFullYear() };
  function isUnavailable(y, m, d) {
    var day = new Date(y, m, d).getDay();
    if (day === 0 || day === 6) return true; // weekends
    var seed = (y * 31 + m * 17 + d * 7) % 10;
    return seed < 2; // sparsely block some weekdays to simulate existing bookings
  }
  function renderCalendar() {
    var grid = document.getElementById('calGrid');
    var label = document.getElementById('calLabel');
    if (!grid) return;
    var y = calState.year, m = calState.month;
    var first = new Date(y, m, 1);
    var startDow = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var today = new Date();
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    label.textContent = monthNames[m] + ' ' + y;
    var html = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(function (d) { return '<div class="cal-dow">' + d + '</div>'; }).join('');
    for (var i = 0; i < startDow; i++) html += '<div class="cal-day empty"></div>';
    var selected = getState().date;
    for (var d = 1; d <= daysInMonth; d++) {
      var isPast = new Date(y, m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      var unavail = isPast || isUnavailable(y, m, d);
      var dateStr = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
      var isSel = selected === dateStr;
      html += '<div class="cal-day ' + (unavail ? 'unavail' : 'avail') + (isToday ? ' today' : '') + (isSel ? ' selected' : '') + '" data-date="' + dateStr + '"' + (unavail ? '' : ' role="button"') + '>' + d + '</div>';
    }
    grid.innerHTML = html;
    grid.querySelectorAll('.cal-day.avail').forEach(function (cell) {
      cell.addEventListener('click', function () {
        grid.querySelectorAll('.cal-day.selected').forEach(function (c) { c.classList.remove('selected'); });
        cell.classList.add('selected');
        setState({ date: cell.getAttribute('data-date'), slot: null });
        renderSlots(cell.getAttribute('data-date'));
        updateSummary();
      });
    });
    if (selected) renderSlots(selected);
  }
  function wireCalendarNav() {
    var prev = document.getElementById('calPrev'), next = document.getElementById('calNext');
    if (prev) prev.onclick = function () { calState.month--; if (calState.month < 0) { calState.month = 11; calState.year--; } renderCalendar(); };
    if (next) next.onclick = function () { calState.month++; if (calState.month > 11) { calState.month = 0; calState.year++; } renderCalendar(); };
  }

  // ---- Slots ----
  var SLOT_TIMES = { morning: ['09:00','09:30','10:00','10:30','11:00'], afternoon: ['13:00','13:30','14:00','14:30','15:00','15:30'], evening: ['16:30','17:00','17:30'] };
  function renderSlots(dateStr) {
    var body = document.getElementById('slotsBody');
    if (!body) return;
    body.innerHTML = '<div class="skeleton" style="height:220px;border-radius:var(--r-md);"></div>';
    setTimeout(function () {
      var seed = dateStr.split('-').reduce(function (a, b) { return a + parseInt(b); }, 0);
      var groups = Object.keys(SLOT_TIMES).map(function (g, gi) {
        var slots = SLOT_TIMES[g].map(function (t, i) {
          var unavail = (seed + i + gi) % 4 === 0;
          return '<button class="slot-btn' + (unavail ? ' unavail' : '') + '" style="animation-delay:' + (i * 0.04) + 's" data-time="' + t + '"' + (unavail ? ' disabled' : '') + '>' + t + '</button>';
        }).join('');
        return '<div class="slot-group"><h5>' + g + '</h5><div class="slot-grid">' + slots + '</div></div>';
      }).join('');
      var anyAvail = Object.keys(SLOT_TIMES).some(function (g, gi) { return SLOT_TIMES[g].some(function (t, i) { return (seed + i + gi) % 4 !== 0; }); });
      body.innerHTML = anyAvail ? '<div class="slot-groups">' + groups + '</div>' :
        '<div class="empty-state"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div><h4 class="t-h4">No open slots this day</h4><p>Try another date on the calendar — new slots open up regularly.</p></div>';
      var selectedSlot = getState().slot;
      body.querySelectorAll('.slot-btn:not(.unavail)').forEach(function (btn) {
        if (btn.getAttribute('data-time') === selectedSlot) btn.classList.add('selected');
        btn.addEventListener('click', function () {
          body.querySelectorAll('.slot-btn.selected').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          setState({ slot: btn.getAttribute('data-time') });
          updateSummary();
          var cta = document.getElementById('scheduleContinue');
          if (cta) cta.removeAttribute('disabled');
        });
      });
    }, 550);
  }

  // ---- Summary sidebar (schedule + details + checkout pages) ----
  function updateSummary() {
    var s = getState();
    var svc = SERVICES[s.serviceId] || SERVICES['coach-1h'];
    document.querySelectorAll('.sum-service-title').forEach(function (el) { el.textContent = svc.title; });
    document.querySelectorAll('.sum-service-duration').forEach(function (el) { el.textContent = svc.duration; });
    document.querySelectorAll('.sum-service-price').forEach(function (el) { el.textContent = money(svc.price); });
    document.querySelectorAll('.sum-date').forEach(function (el) { el.textContent = s.date ? formatDate(s.date) : 'Select a date'; });
    document.querySelectorAll('.sum-time').forEach(function (el) { el.textContent = s.slot || '—'; });
    document.querySelectorAll('.sum-tz').forEach(function (el) { el.textContent = s.tz || ''; });
    document.querySelectorAll('.sum-total').forEach(function (el) { el.textContent = money(svc.price); });
  }
  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTimezone();
    wireServiceSelect();
    wireCalendarNav();
    renderCalendar();
    updateSummary();
    var cont = document.getElementById('scheduleContinue');
    if (cont && !getState().slot) cont.setAttribute('disabled', 'true');
  });

  window.booking = { SERVICES: SERVICES, getState: getState, setState: setState, money: money, formatDate: formatDate };
})();
