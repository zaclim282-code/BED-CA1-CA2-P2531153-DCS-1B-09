// When the button is clicked, send a GET request to /api/health
// and show the response status and body on the page.

const sendBtn = document.getElementById('send-btn');
const statusEl = document.getElementById('status');
const bodyEl = document.getElementById('body');

const sendRequest = async () => {
  statusEl.textContent = '...';
  bodyEl.textContent = 'Sending request...';

  try {
    const response = await fetch('/api/health');
    const data = await response.json();

    // Show the HTTP status code (e.g. 200) and the JSON body the server returned.
    statusEl.textContent = `${response.status} ${response.statusText}`;
    statusEl.classList.toggle('ok', response.ok);
    bodyEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    statusEl.textContent = 'No response';
    statusEl.classList.remove('ok');
    bodyEl.textContent = 'Could not reach the server. Run "npm run dev" and try again.';
  }
};

sendBtn.addEventListener('click', sendRequest);
