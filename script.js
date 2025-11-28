<<<<<<< HEAD
// script.js - Enhanced with time-slot availability, real-time checks, and validation

// Facilities list
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

// Predefined time slots (adjust as needed)
const timeSlots = [
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00"
];

// DOM elements
const grid = document.getElementById('facilityGrid');
const modal = document.getElementById('reservationModal');
const cancelModal = document.getElementById('cancelModal');
const form = document.getElementById('reservationForm');
const formMessage = document.getElementById('formMessage');
const availabilityMsg = document.getElementById('availabilityMsg');
const dateInput = document.getElementById('date');
const timeSelect = document.getElementById('timeSlot');
const facilityInput = document.getElementById('facility');

// helper: localStorage
function loadReservations() {
  return JSON.parse(localStorage.getItem('reservations')) || [];
}
function saveReservations(list) {
  localStorage.setItem('reservations', JSON.stringify(list));
}

// render facility cards
function renderCards() {
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

// populate time slots into the select
function populateTimeSlots() {
  timeSelect.innerHTML = '';
  timeSlots.forEach(slot => {
    const opt = document.createElement('option');
    opt.value = slot;
    opt.textContent = slot;
    timeSelect.appendChild(opt);
  });
}
populateTimeSlots();

// set min date to today
function setMinDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}
setMinDate();

// open modal and prepare availability
function openModal(facilityName) {
  facilityInput.value = facilityName;
  formMessage.textContent = '';
  availabilityMsg.textContent = '';
  // reset date/time
  dateInput.value = '';
  timeSelect.selectedIndex = 0;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  // update slots if a date is preselected (not usually)
  updateAvailableSlots();
}

// close modal
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  form.reset();
}

// update available slots for selected facility & date
function updateAvailableSlots() {
  const facility = facilityInput.value;
  const date = dateInput.value;
  populateTimeSlots(); // start fresh

  if (!facility || !date) {
    availabilityMsg.textContent = 'Select a facility and date to check availability.';
    availabilityMsg.style.color = '#666';
    return;
  }

  const reservations = loadReservations();
  // get reservations for same facility & date that are Approved or Pending (we still show taken slots)
  const taken = reservations
    .filter(r => r.facility === facility && r.date === date)
    .map(r => r.time);

  // disable taken options and mark them
  Array.from(timeSelect.options).forEach(opt => {
    if (taken.includes(opt.value)) {
      opt.disabled = true;
      opt.text = `${opt.value} — (taken)`;
    }
  });

  // if all options disabled, show message
  const availableLeft = Array.from(timeSelect.options).some(o => !o.disabled);
  if (!availableLeft) {
    availabilityMsg.textContent = 'No available time slots for this facility on selected date. Try another date.';
    availabilityMsg.style.color = '#d32f2f';
  } else {
    availabilityMsg.textContent = 'Some slots may be taken — select an available time.';
    availabilityMsg.style.color = '#2e7d32';
  }
}

// event listeners
if (cancelModal) cancelModal.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// when date or facility changes, update availability
dateInput.addEventListener('change', updateAvailableSlots);
facilityInput.addEventListener('input', updateAvailableSlots);

// validation
function validate(res) {
  if (!res.name || !res.studentId) return "Enter name and ID.";
  if (!res.date) return "Choose a date.";
  if (!res.time) return "Choose a time slot.";
  if (!res.purpose) return "Enter purpose.";
  // no past date
  const today = new Date(); today.setHours(0,0,0,0);
  const sel = new Date(res.date);
  if (sel < today) return "Cannot pick a past date.";
  return "";
}

// check conflict with existing Approved (so students cannot reserve slot already Approved)
function hasConflictApproved(newRes) {
  const all = loadReservations();
  return all.some(r => r.facility === newRes.facility && r.date === newRes.date && r.time === newRes.time && r.status === 'Approved');
}

// handle submit
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRes = {
      id: 'r_' + Date.now(),
      name: document.getElementById('name').value.trim(),
      studentId: document.getElementById('studentId').value.trim(),
      facility: document.getElementById('facility').value,
      date: document.getElementById('date').value,
      time: document.getElementById('timeSlot').value,
      purpose: document.getElementById('purpose').value.trim(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const v = validate(newRes);
    if (v) { formMessage.textContent = v; return; }

    // conflict check against approved reservations
    if (hasConflictApproved(newRes)) {
      formMessage.textContent = "This slot has already been approved. Please choose another date/time.";
      return;
    }

    const all = loadReservations();
    all.push(newRes);
    saveReservations(all);
    formMessage.textContent = "Reservation submitted and is pending admin approval.";
    setTimeout(() => {
      closeModal();
    }, 900);
  });
}
=======
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
>>>>>>> a899e3a2a4f7ba4db9dd61cb7c735a0f884a22c1
