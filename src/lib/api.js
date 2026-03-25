/**
 * API utility — authenticated fetch wrapper for the income engine backend.
 */

const DEV = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const BASE_URL = DEV ? 'http://localhost:3000' : 'https://grahamzemelcom-596da5a7c96e.herokuapp.com';

/**
 * Make an authenticated API request.
 * Sends the gz_admin cookie automatically via credentials: 'include'.
 */
export async function api(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (res.status === 401) {
    window.location.href = '/';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'API request failed');
  }

  return res.json();
}

export function get(path) {
  return api(path);
}

export function post(path, body) {
  return api(path, { method: 'POST', body });
}

export function put(path, body) {
  return api(path, { method: 'PUT', body });
}

export function del(path) {
  return api(path, { method: 'DELETE' });
}
