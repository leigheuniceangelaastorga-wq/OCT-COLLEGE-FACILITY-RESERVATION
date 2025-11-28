<<<<<<< HEAD
// reservations.js - shows only Approved reservations and supports search + filter
function loadReservations() { return JSON.parse(localStorage.getItem('reservations')) || []; }
const table = document.getElementById('reservationTable');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const facilityFilter = document.getElementById('facilityFilter');

// fill facility filter from static list (same as script.js)
const facilities = [
  "Gym",
  "Computer Laboratory (Comlab)",
  "Bar Laboratory (Barlab)",
  "Education Laboratory (Educ Lab)",
  "Open Court",
  "Library",
  "Amphitheater",
  "Convention Center",
  "Criminology Laboratory (Crimlab)"
];
function populateFacilityFilter() {
  if (!facilityFilter) return;
  facilities.forEach(f => {
    const o = document.createElement('option');
    o.value = f;
    o.textContent = f;
    facilityFilter.appendChild(o);
  });
}
populateFacilityFilter();

function escape(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

function renderApproved(list) {
  table.innerHTML = '';
  if (!list.length) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';
  list.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escape(r.name)}</td><td>${escape(r.studentId)}</td><td>${escape(r.facility)}</td><td>${escape(r.date)}</td><td>${escape(r.time)}</td><td>${escape(r.purpose)}</td>`;
    table.appendChild(tr);
  });
}

// initial render
function loadAndRender() {
  const all = loadReservations();
  const approved = all.filter(r => r.status === 'Approved');
  renderApproved(approved);
}
loadAndRender();

// search/filter handlers
function applyFilters() {
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const f = facilityFilter ? facilityFilter.value : 'all';
  const all = loadReservations();
  const approved = all.filter(r => r.status === 'Approved');

  const filtered = approved.filter(r => {
    const matchQ = q === '' || r.name.toLowerCase().includes(q) || r.facility.toLowerCase().includes(q) || r.date.includes(q);
    const matchF = f === 'all' || r.facility === f;
    return matchQ && matchF;
  });
  renderApproved(filtered);
}

if (searchInput) searchInput.addEventListener('input', applyFilters);
if (facilityFilter) facilityFilter.addEventListener('change', applyFilters);
=======
// reservations.js
function loadReservations() { return JSON.parse(localStorage.getItem('reservations')) || []; }
const table = document.getElementById('reservationTable');
const noResults = document.getElementById('noResults');

function escape(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

function renderApproved() {
  const all = loadReservations();
  const approved = all.filter(r => r.status === 'Approved');
  table.innerHTML = '';
  if (!approved.length) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';
  approved.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escape(r.name)}</td><td>${escape(r.studentId)}</td><td>${escape(r.facility)}</td><td>${escape(r.date)}</td><td>${escape(r.time)}</td><td>${escape(r.purpose)}</td>`;
    table.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', renderApproved);
>>>>>>> a899e3a2a4f7ba4db9dd61cb7c735a0f884a22c1
