// Check the backend health endpoint and show the result on the page.

const statusEl = document.getElementById('status');

const checkHealth = async () => {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    statusEl.textContent = data.status === 'ok'
      ? 'Server is healthy ✅'
      : 'Server responded, but not healthy.';
  } catch (error) {
    statusEl.textContent = 'Could not reach the server. Run "npm run dev" and refresh.';
  }
};

checkHealth();
