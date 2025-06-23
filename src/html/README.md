# Contact List HTML Frontend

This HTML frontend displays a table with Name, Email, and Telefone columns, fetching data from an API endpoint and refreshing every 10 seconds.

## Files

- `index.html` - Main HTML page with the contact table
- `script.js` - JavaScript code for API calls and auto-refresh functionality
- `style.css` - CSS styling for the table and responsive design

## Setup

1. **Configure API URL**: Edit `script.js` and replace `{url}` in the `API_CONFIG.baseUrl` with your actual API base URL.

2. **API Endpoint**: The frontend expects a GET endpoint at `{baseUrl}/listnames` that returns a JSON array of contact objects.

## Expected API Response Format

The API should return a JSON array of objects with the following structure:

```json
[
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "telefone": "+1234567890"
  },
  {
    "name": "Jane Smith", 
    "email": "jane.smith@example.com",
    "telefone": "+0987654321"
  }
]
```

**Note**: The API can use either `telefone` or `phone` field for the phone number.

## Features

- **Auto-refresh**: Data updates every 10 seconds automatically
- **Status indicators**: Shows last update time and connection status
- **Error handling**: Displays error messages when API calls fail
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Loading states**: Shows loading animation while fetching data

## Browser Console Functions

The following functions are available in the browser console for debugging:

- `manualRefresh()` - Manually refresh the data
- `stopAutoRefresh()` - Stop automatic refreshing
- `startAutoRefresh()` - Start automatic refreshing

## Usage

1. Serve the files using any web server (e.g., `python -m http.server`, `live-server`, etc.)
2. Open `index.html` in a web browser
3. The table will automatically start fetching and displaying contact data

## CORS Considerations

If the API is on a different domain, ensure CORS is properly configured on the server side to allow requests from your frontend domain.