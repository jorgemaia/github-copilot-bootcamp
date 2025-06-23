// Configuration
const API_CONFIG = {
    // The URL placeholder will be replaced with actual API URL
    baseUrl: '{url}', // This should be replaced with actual API base URL
    endpoint: '/listnames',
    refreshInterval: 10000 // 10 seconds
};

// DOM elements
let contactsTable;
let lastUpdatedSpan;
let statusSpan;
let refreshTimer;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    contactsTable = document.getElementById('contacts-tbody');
    lastUpdatedSpan = document.getElementById('last-updated');
    statusSpan = document.getElementById('status');
    
    // Initial load
    fetchContacts();
    
    // Set up automatic refresh every 10 seconds
    refreshTimer = setInterval(fetchContacts, API_CONFIG.refreshInterval);
});

// Fetch contacts from the API
async function fetchContacts() {
    try {
        updateStatus('Fetching contacts...');

        // MOCK DATA: Remove this block if you connect to a real backend
        const mockContacts = [
            { name: 'Alice Smith', email: 'alice@example.com', telefone: '123-456-7890' },
            { name: 'Bob Johnson', email: 'bob@example.com', telefone: '987-654-3210' },
            { name: 'Carol Lee', email: 'carol@example.com', telefone: '555-555-5555' }
        ];
        await new Promise(r => setTimeout(r, 500)); // Simulate network delay
        displayContacts(mockContacts);
        updateLastUpdated();
        updateStatus('Connected (mock)');
        return;
        // END MOCK DATA

        /*
        // Uncomment this block if you have a real backend
        const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contacts = await response.json();
        displayContacts(contacts);
        updateLastUpdated();
        updateStatus('Connected');
        */
    } catch (error) {
        console.error('Error fetching contacts:', error);
        displayError(error.message);
        updateStatus('Error: ' + error.message);
    }
}

// Display contacts in the table
function displayContacts(contacts) {
    // Clear existing rows
    contactsTable.innerHTML = '';
    
    if (!contacts || contacts.length === 0) {
        contactsTable.innerHTML = '<tr><td colspan="3" class="no-data">No contacts found</td></tr>';
        return;
    }
    
    // Add each contact as a table row
    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(contact.name || '')}</td>
            <td>${escapeHtml(contact.email || '')}</td>
            <td>${escapeHtml(contact.telefone || contact.phone || '')}</td>
        `;
        contactsTable.appendChild(row);
    });
}

// Display error message
function displayError(errorMessage) {
    contactsTable.innerHTML = `
        <tr>
            <td colspan="3" class="error">
                Error loading contacts: ${escapeHtml(errorMessage)}
                <br>
                <small>Will retry in ${API_CONFIG.refreshInterval / 1000} seconds...</small>
            </td>
        </tr>
    `;
}

// Update the last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    lastUpdatedSpan.textContent = `Last updated: ${now.toLocaleTimeString()}`;
}

// Update the status message
function updateStatus(status) {
    statusSpan.textContent = `Status: ${status}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Manual refresh function (can be called from console or button)
function manualRefresh() {
    clearInterval(refreshTimer);
    fetchContacts();
    refreshTimer = setInterval(fetchContacts, API_CONFIG.refreshInterval);
}

// Stop automatic refresh (useful for debugging)
function stopAutoRefresh() {
    clearInterval(refreshTimer);
    updateStatus('Auto-refresh stopped');
}

// Start automatic refresh
function startAutoRefresh() {
    clearInterval(refreshTimer);
    refreshTimer = setInterval(fetchContacts, API_CONFIG.refreshInterval);
    updateStatus('Auto-refresh started');
}