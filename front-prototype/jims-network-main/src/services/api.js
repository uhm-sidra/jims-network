// API Service Layer for JIMS Alumni Network
const API_BASE = 'http://localhost:5000/api';

// Helper to get auth header if token exists
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // --- HEALTH CHECK & STATUS ---
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
      if (!res.ok) return false;
      const data = await res.json();
      return data.status === 'online';
    } catch {
      return false;
    }
  },

  // --- POSTS ---
  async getPosts() {
    try {
      const res = await fetch(`${API_BASE}/posts`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('API getPosts error, falling back to local state:', err.message);
      return null;
    }
  },

  async createPost(postData) {
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(postData),
      });
      if (!res.ok) throw new Error('Failed to create post');
      return await res.json();
    } catch (err) {
      console.error('API createPost error:', err.message);
      return null;
    }
  },

  async toggleLike(postId, userId) {
    try {
      const res = await fetch(`${API_BASE}/posts/${postId}/like`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error('Failed to toggle like');
      return await res.json();
    } catch (err) {
      console.error('API toggleLike error:', err.message);
      return null;
    }
  },

  // --- INTERNSHIPS ---
  async getInternships() {
    try {
      const res = await fetch(`${API_BASE}/internships`);
      if (!res.ok) throw new Error('Failed to fetch internships');
      return await res.json();
    } catch (err) {
      console.warn('API getInternships error, falling back:', err.message);
      return null;
    }
  },

  async toggleApplyInternship(internshipId, userEmail) {
    try {
      const res = await fetch(`${API_BASE}/internships/${internshipId}/apply`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userEmail }),
      });
      if (!res.ok) throw new Error('Failed to apply');
      return await res.json();
    } catch (err) {
      console.error('API toggleApply error:', err.message);
      return null;
    }
  },

  // --- USERS & DIRECTORY ---
  async getUsers(search = '', role = 'All') {
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (role && role !== 'All') query.append('role', role);

      const res = await fetch(`${API_BASE}/users?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch directory');
      return await res.json();
    } catch (err) {
      console.warn('API getUsers error, falling back:', err.message);
      return null;
    }
  },

  async toggleConnect(userId) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/connect`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to update connection');
      return await res.json();
    } catch (err) {
      console.error('API toggleConnect error:', err.message);
      return null;
    }
  },

  // --- AUTHENTICATION ---
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default api;
