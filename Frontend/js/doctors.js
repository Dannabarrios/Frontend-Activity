loadDoctors();

async function loadDoctors() {
    try {
        const res = await axios.get(`${API_URL}/doctors`);
        renderTable(res.data);
    } catch (e) {
        showAlert('Error al cargar médicos', 'error');
    }
}

async function findById() {
    const id = document.getElementById('search-id').value.trim();
    if (!id) return loadDoctors();
    try {
        const res = await axios.get(`${API_URL}/doctors/${id}`);
        renderTable([res.data]);
    } catch (e) {
        showAlert('Médico no encontrado', 'error');
    }
}

async function saveDoctor() {
    const id = document.getElementById('doctor-id').value;
    const data = {
        name:      document.getElementById('name').value,
        specialty: document.getElementById('specialty').value,
        email:     document.getElementById('email').value,
        phone:     document.getElementById('phone').value
    };

    try {
        if (id) {
            await axios.put(`${API_URL}/doctors/${id}`, data);
            showAlert('Médico actualizado correctamente', 'success');
        } else {
            await axios.post(`${API_URL}/doctors`, data);
            showAlert('Médico creado correctamente', 'success');
        }
        clearForm();
        loadDoctors();
    } catch (e) {
        showAlert('Error al guardar médico', 'error');
    }
}

async function deleteDoctor(id) {
    if (!confirm('¿Estás seguro de eliminar este médico?')) return;
    try {
        await axios.delete(`${API_URL}/doctors/${id}`);
        showAlert('Médico eliminado correctamente', 'success');
        loadDoctors();
    } catch (e) {
        showAlert('Error al eliminar médico', 'error');
    }
}

function editDoctor(id, name, specialty, email, phone) {
    document.getElementById('doctor-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('specialty').value = specialty;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('form-title').textContent = 'Editar Médico';
}

function renderTable(doctors) {
    const tbody = document.getElementById('doctors-table');
    tbody.innerHTML = doctors.map(d => `
        <tr>
            <td>${d.name}</td>
            <td>${d.specialty}</td>
            <td>${d.email}</td>
            <td>${d.phone}</td>
            <td style="display:flex; gap:0.5rem">
                <button class="btn btn-warning" onclick="editDoctor('${d.id}','${d.name}','${d.specialty}','${d.email}','${d.phone}')">✏️</button>
                <button class="btn btn-danger" onclick="deleteDoctor('${d.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function clearForm() {
    document.getElementById('doctor-id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('specialty').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('form-title').textContent = 'Nuevo Médico';
}

function showAlert(msg, type) {
    const alert = document.getElementById('alert');
    alert.textContent = msg;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';
    setTimeout(() => alert.style.display = 'none', 3000);
}