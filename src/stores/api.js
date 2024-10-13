import axios from 'axios';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://education-catalog-backend.onrender.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setAuthHeader(options = {}) {
    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
    return options;
  }

  async get(url, options = {}) {
    options = this.setAuthHeader(options);
    return this.client.get(url, options);
  }

  async post(url, data, options = {}) {
    options = this.setAuthHeader(options);
    return this.client.post(url, data, options);
  }

  async patch(url, data = {}, options = {}) {
    options = this.setAuthHeader(options);
    return this.client.patch(url, data, options);
  }
}

export const api = new ApiService();
