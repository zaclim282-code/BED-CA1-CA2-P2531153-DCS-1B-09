const healthStatus = document.getElementById('health-status');

/**
 * Update the placeholder UI with backend health check status.
 */
const checkHealth = async () => {
  try {
    const response = await fetch('/api/health');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.status === 'ok') {
      healthStatus.textContent = 'Server health check passed: /api/health is returning { status: "ok" }.';
      return;
    }

    healthStatus.textContent = 'Server responded, but returned an unexpected payload.';
  } catch (error) {
    healthStatus.textContent = 'Unable to reach /api/health. Start the server with "npm run dev" and refresh this page.';
  }
};

document.addEventListener('DOMContentLoaded', checkHealth);
