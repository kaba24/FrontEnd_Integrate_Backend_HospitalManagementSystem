// script.js
const apiUrl = 'http://localhost:8080'; // Replace with your backend URL if hosted elsewhere

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login; ideally, you'd call a real API here
    if (username === "admin" && password === "admin") {
        document.getElementById('loginMessage').innerText = "Login successful!";
        showSection('patients');
        loadPatients(); // Load patients after login
    } else {
        document.getElementById('loginMessage').innerText = "Invalid credentials!";
    }
});

document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;

    // Make a POST request to add a new patient
    fetch(`${apiUrl}/patients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, gender }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to add patient');
    })
    .then(data => {
        document.getElementById('patientMessage').innerText = `Patient ${data.name} added successfully!`;
        document.getElementById('patientForm').reset();
        loadPatients(); // Reload patients list
    })
    .catch(error => {
        document.getElementById('patientMessage').innerText = error.message;
    });
});

// Function to load and display all patients
function loadPatients() {
    fetch(`${apiUrl}/patients`)
        .then(response => response.json())
        .then(patients => {
            const patientList = patients.map(patient => `<li>${patient.name} (ID: ${patient.id})</li>`).join('');
            document.getElementById('patientList').innerHTML = `<ul>${patientList}</ul>`;
        });
}

function showSection(sectionId) {
    const sections = ['login', 'patients', 'appointments', 'billing'];
    sections.forEach(section => {
        document.getElementById(section).style.display = section === sectionId ? 'block' : 'none';
    });
}