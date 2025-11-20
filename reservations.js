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
