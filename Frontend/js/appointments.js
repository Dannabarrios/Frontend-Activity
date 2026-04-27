loadAppointments();
loadSelects();

async function loadSelects() {
    try {
        const [patients, doctors] = await Promise.all([
            axios.get(`${API_URL}/patients`),
            axios.get(`${API_URL}/doctors`)
        ]);

        const patientSelect = document.getElementById('patient-id');
        patientSelect.innerHTML = patients.data.map(p =>
            `<option value="${p.id}">${p.name}</option>`
        ).join('');

        const doctorSelect = document.getElementById('doctor-id');
        doctorSelect.innerHTML = doctors.data.map(d =>
            `<option value="${d.id}">${d.name} - ${d.specialty}</option>`
        ).join('');
    } catch (e) {
        showAlert('Error al cargar datos', 'error');
    }
}

async function loadAppointments() {
    try {
        const res = await axios.get(`${API_URL}/appointments`);
        renderTable(res.data);
    } catch (e) {
        showAlert('Error al cargar citas', 'error');
    }
}

async function findById() {
    const id = document.getElementById('search-id').value.trim();
    if (!id) return loadAppointments();
    try {
        const res = await axios.get(`${API_URL}/appointments/${id}`);
        renderTable([res.data]);
    } catch (e) {
        showAlert('Cita no encontrada', 'error');
    }
}

async function saveAppointment() {
    const id = document.getElementById('appointment-id').value;
    const data = {
        patientId:       document.getElementById('patient-id').value,
        doctorId:        document.getElementById('doctor-id').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        status:          document.getElementById('status').value
    };

    try {
        if (id) {
            await axios.put(`${API_URL}/appointments/${id}`, data);
            showAlert('Cita actualizada correctamente', 'success');
        } else {
            await axios.post(`${API_URL}/appointments`, data);
            showAlert('Cita creada correctamente', 'success');
        }
        clearForm();
        loadAppointments();
    } catch (e) {
        showAlert('Error al guardar cita', 'error');
    }
}

async function deleteAppointment(id) {
    if (!confirm('¿Estás seguro de eliminar esta cita?')) return;
    try {
        await axios.delete(`${API_URL}/appointments/${id}`);
        showAlert('Cita eliminada correctamente', 'success');
        loadAppointments();
    } catch (e) {
        showAlert('Error al eliminar cita', 'error');
    }
}

function renderTable(appointments) {
    const tbody = document.getElementById('appointments-table');
    tbody.innerHTML = appointments.map(a => `
        <tr>
            <td>${a.patientName}</td>
            <td>${a.doctorName}</td>
            <td>${a.appointmentDate}</td>
            <td>${a.status}</td>
            <td style="display:flex; gap:0.5rem">
                <button class="btn btn-danger" onclick="deleteAppointment('${a.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function clearForm() {
    document.getElementById('appointment-id').value = '';
    document.getElementById('appointmentDate').value = '';
    document.getElementById('status').value = 'SCHEDULED';
    document.getElementById('form-title').textContent = 'Nueva Cita';
}

function showAlert(msg, type) {
    const alert = document.getElementById('alert');
    alert.textContent = msg;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';
    setTimeout(() => alert.style.display = 'none', 3000);
}