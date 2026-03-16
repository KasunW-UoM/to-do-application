const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const maybeJson = await response.json().catch(() => ({ message: 'Request failed.' }));
    throw new Error(maybeJson.message || 'Request failed.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const taskApi = {
  list: async () => (await request('/tasks')).data,
  create: async (payload) => (await request('/tasks', { method: 'POST', body: JSON.stringify(payload) })).data,
  complete: async (id) => request(`/tasks/${id}/done`, { method: 'PATCH' }),
};
