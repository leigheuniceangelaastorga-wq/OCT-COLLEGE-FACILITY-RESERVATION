// script.js
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

const grid = document.getElementById('facilityGrid');
const modal = document.getElementById('reservationModal');
const cancelModal = document.getElementById('cancelModal');
const form = document.getElementById('reservationForm');
const formMessage = document.getElementById('formMessage');

function renderCards(){
  if (!grid) return;
  facilities.forEach(f => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${f}</strong>`;
    div.addEventListener('click', () => openModal(f));
    grid.appendChild(div);
  });
}
renderCards();

function openModal(facilityName) {
  document.getElementById('facility').value = facilityName;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden','false');
  formMessage.textContent = '';
}

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
  form.reset();
}

if (cancelModal) cancelModal.addEventListener('click', closeModal);

// localStorage helpers
function loadReservations(){ return JSON.parse(localStorage.getItem('reservations')) || []; }
function saveReservations(list){ localStorage.setItem('reservations', JSON.stringify(list)); }

function validate(res){
  if (!res.name.trim() || !res.studentId.trim()) return "Enter name and ID.";
  if (!res.date) return "Choose a date.";
  if (!res.time) return "Choose a time.";
  if (!res.purpose.trim()) return "Enter purpose.";
  const today = new Date(); today.setHours(0,0,0,0);
  const sel = new Date(res.date);
  if (sel < today) return "Cannot pick a past date.";
  return "";
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRes = {
      id: 'r_' + Date.now(),
      name: document.getElementById('name').value.trim(),
      studentId: document.getElementById('studentId').value.trim(),
      facility: document.getElementById('facility').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      purpose: document.getElementById('purpose').value.trim(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const v = validate(newRes);
    if (v) { formMessage.textContent = v; return; }

    const all = loadReservations();
    // prevent approval conflict only (Approved)
    const conflict = all.some(r => r.facility === newRes.facility && r.date === newRes.date && r.time === newRes.time && r.status === 'Approved');
    if (conflict) { formMessage.textContent = "This slot is already approved."; return; }

    all.push(newRes);
    saveReservations(all);
    formMessage.textContent = "Reservation submitted and is pending admin approval.";
    setTimeout(() => {
      closeModal();
    }, 900);
  });
}

// close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
