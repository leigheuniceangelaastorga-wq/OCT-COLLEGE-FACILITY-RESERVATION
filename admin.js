<<<<<<< HEAD
// admin.js
(function(){
  // require admin login flag
  if (!localStorage.getItem('isAdmin')) {
    // if not at login page, redirect to login
    if (!window.location.pathname.endsWith('admin-login.html')) {
      window.location.href = 'admin-login.html';
      return;
    }
  }

  const adminTbody = document.getElementById('adminTbody');
  const noAdminResults = document.getElementById('noAdminResults');
  const filterStatus = document.getElementById('filterStatus');
  const logoutBtn = document.getElementById('logoutBtn');

  function loadReservations(){ return JSON.parse(localStorage.getItem('reservations')) || []; }
  function saveReservations(list){ localStorage.setItem('reservations', JSON.stringify(list)); }
  function escape(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

  function renderTable(filter='all'){
    const all = loadReservations();
    let list = all;
    if (filter !== 'all') list = all.filter(r => r.status === filter);
    adminTbody.innerHTML = '';
    if (!list.length) {
      noAdminResults.style.display = 'block';
      return;
    }
    noAdminResults.style.display = 'none';
    list.forEach(r => {
      const tr = document.createElement('tr');
      const badge = r.status === 'Pending' ? `<span class="badge badge-pending">Pending</span>`
                  : r.status === 'Approved' ? `<span class="badge badge-approved">Approved</span>`
                  : `<span class="badge badge-rejected">Rejected</span>`;
      tr.innerHTML = `
        <td>${escape(r.name)}</td>
        <td>${escape(r.studentId)}</td>
        <td>${escape(r.facility)}</td>
        <td>${escape(r.date)}</td>
        <td>${escape(r.time)}</td>
        <td>${escape(r.purpose)}</td>
        <td>${badge}</td>
        <td>
          ${r.status === 'Pending' ? `<button class="action-btn action-approve" data-id="${r.id}" data-action="approve">Approve</button>
          <button class="action-btn action-reject" data-id="${r.id}" data-action="reject">Reject</button>` : `<button class="action-btn action-revert" data-id="${r.id}" data-action="revert">Set Pending</button>`}
          <button class="action-btn" data-id="${r.id}" data-action="delete">Delete</button>
        </td>
      `;
      adminTbody.appendChild(tr);
    });

    // attach handlers
    adminTbody.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        handleAction(id, action);
      });
    });
  }

  function handleAction(id, action){
    let all = loadReservations();
    const idx = all.findIndex(r => r.id === id);
    if (idx === -1) return alert('Reservation not found');
    if (action === 'approve') {
      // conflict check: no other Approved for same slot
      const conflict = all.some((r,i)=> i!==idx && r.facility === all[idx].facility && r.date === all[idx].date && r.time === all[idx].time && r.status === 'Approved');
      if (conflict) return alert('Cannot approve: another reservation already approved for that slot.');
      all[idx].status = 'Approved';
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    } else if (action === 'reject') {
      all[idx].status = 'Rejected';
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    } else if (action === 'revert') {
      all[idx].status = 'Pending';
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    } else if (action === 'delete') {
      if (!confirm('Delete this reservation?')) return;
      all.splice(idx,1);
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    }
  }

  if (document.getElementById('adminTbody')) {
    renderTable('all');
    if (filterStatus) filterStatus.addEventListener('change', () => renderTable(filterStatus.value));
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isAdmin');
      window.location.href = 'admin-login.html';
    });
  }
})();
=======
// admin.js
(function(){
  // require admin login flag
  if (!localStorage.getItem('isAdmin')) {
    // if not at login page, redirect to login
    if (!window.location.pathname.endsWith('admin-login.html')) {
      window.location.href = 'admin-login.html';
      return;
    }
  }

  const adminTbody = document.getElementById('adminTbody');
  const noAdminResults = document.getElementById('noAdminResults');
  const filterStatus = document.getElementById('filterStatus');
  const logoutBtn = document.getElementById('logoutBtn');

  function loadReservations(){ return JSON.parse(localStorage.getItem('reservations')) || []; }
  function saveReservations(list){ localStorage.setItem('reservations', JSON.stringify(list)); }
  function escape(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

  function renderTable(filter='all'){
    const all = loadReservations();
    let list = all;
    if (filter !== 'all') list = all.filter(r => r.status === filter);
    adminTbody.innerHTML = '';
    if (!list.length) {
      noAdminResults.style.display = 'block';
      return;
    }
    noAdminResults.style.display = 'none';
    list.forEach(r => {
      const tr = document.createElement('tr');
      const badge = r.status === 'Pending' ? `<span class="badge badge-pending">Pending</span>`
                  : r.status === 'Approved' ? `<span class="badge badge-approved">Approved</span>`
                  : `<span class="badge badge-rejected">Rejected</span>`;
      tr.innerHTML = `
        <td>${escape(r.name)}</td>
        <td>${escape(r.studentId)}</td>
        <td>${escape(r.facility)}</td>
        <td>${escape(r.date)}</td>
        <td>${escape(r.time)}</td>
        <td>${escape(r.purpose)}</td>
        <td>${badge}</td>
        <td>
          ${r.status === 'Pending' ? `<button class="action-btn action-approve" data-id="${r.id}" data-action="approve">Approve</button>
          <button class="action-btn action-reject" data-id="${r.id}" data-action="reject">Reject</button>` : `<button class="action-btn action-revert" data-id="${r.id}" data-action="revert">Set Pending</button>`}
          <button class="action-btn" data-id="${r.id}" data-action="delete">Delete</button>
        </td>
      `;
      adminTbody.appendChild(tr);
    });

    // attach handlers
    adminTbody.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        handleAction(id, action);
      });
    });
  }

  function handleAction(id, action){
    let all = loadReservations();
    const idx = all.findIndex(r => r.id === id);
    if (idx === -1) return alert('Reservation not found');
    if (action === 'approve') {
      // conflict check: no other Approved for same slot
      const conflict = all.some((r,i)=> i!==idx && r.facility === all[idx].facility && r.date === all[idx].date && r.time === all[idx].time && r.status === 'Approved');
      if (conflict) return alert('Cannot approve: another reservation already approved for that slot.');
      all[idx].status = 'Approved';
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    } else if (action === 'reject') {
      all[idx].status = 'Rejected';
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    } else if (action === 'revert') {
      all[idx].status = 'Pending';
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    } else if (action === 'delete') {
      if (!confirm('Delete this reservation?')) return;
      all.splice(idx,1);
      saveReservations(all);
      renderTable(filterStatus ? filterStatus.value : 'all');
    }
  }

  if (document.getElementById('adminTbody')) {
    renderTable('all');
    if (filterStatus) filterStatus.addEventListener('change', () => renderTable(filterStatus.value));
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isAdmin');
      window.location.href = 'admin-login.html';
    });
  }
})();
>>>>>>> a899e3a2a4f7ba4db9dd61cb7c735a0f884a22c1
