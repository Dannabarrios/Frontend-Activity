loadPatients();

async function loadPatients() {
    try {
        const res = await axios.get(`${API_URL}/patients`);
        renderTable(res.data);
    } catch (e) {
        showAlert('Error al cargar pacientes', 'error');
    }
}

async function findById() {
    const id = document.getElementById('search-id').value.trim();
    if (!id) return loadPatients();
    try {
        const res = await axios.get(`${API_URL}/patients/${id}`);
        renderTable([res.data]);
    } catch (e) {
        showAlert('Paciente no encontrado', 'error');
    }
}

async function savePatient() {
    const id = document.getElementById('patient-id').value;
    const data = {
        name:    document.getElementById('name').value,
        email:   document.getElementById('email').value,
        phone:   document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    try {
        if (id) {
            await axios.put(`${API_URL}/patients/${id}`, data);
            showAlert('Paciente actualizado correctamente', 'success');
        } else {
            await axios.post(`${API_URL}/patients`, data);
            showAlert('Paciente creado correctamente', 'success');
        }
        clearForm();
        loadPatients();
    } catch (e) {
        showAlert('Error al guardar paciente', 'error');
    }
}

async function deletePatient(id) {
    if (!confirm('¿Estás seguro de eliminar este paciente?')) return;
    try {
        await axios.delete(`${API_URL}/patients/${id}`);
        showAlert('Paciente eliminado correctamente', 'success');
        loadPatients();
    } catch (e) {
        showAlert('Error al eliminar paciente', 'error');
    }
}

function editPatient(id, name, email, phone, address) {
    document.getElementById('patient-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('address').value = address;
    document.getElementById('form-title').textContent = 'Editar Paciente';
}

function renderTable(patients) {
    const tbody = document.getElementById('patients-table');
    tbody.innerHTML = patients.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.email}</td>
            <td>${p.phone}</td>
            <td>${p.address}</td>
            <td style="display:flex; gap:0.5rem">
                <button class="btn btn-warning" onclick="editPatient('${p.id}','${p.name}','${p.email}','${p.phone}','${p.address}')">✏️</button>
                <button class="btn btn-danger" onclick="deletePatient('${p.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function clearForm() {
    document.getElementById('patient-id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('form-title').textContent = 'Nuevo Paciente';
}

function showAlert(msg, type) {
    const alert = document.getElementById('alert');
    alert.textContent = msg;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';
    setTimeout(() => alert.style.display = 'none', 3000);
}