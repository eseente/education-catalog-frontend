import { makeAutoObservable } from 'mobx';
import { api } from './api';
import { message } from 'antd';
class UserStore {
  user = null;
  token = localStorage.getItem('token') || null;
  role = localStorage.getItem('role') || null; 
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(username, password) {
    this.isLoading = true;
    try {
      const response = await api.post('/user/login', { username, password });
      this.token = response?.data?.access_token;
      this.role = response?.data?.user?.role;
      localStorage.setItem('token', this.token);
      localStorage.setItem('role', this.role);
      this.user = response?.data?.user;
      
      return { success: true, user: this.user };
  
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      this.isLoading = false;
    }
  }
  

  logout() {
    this.token = null;
    this.role = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  async getUserProfile() {
    if (this.token) {
      const response = await api.get('/user/profile');
      this.user = response.data;
    }
  }
  async register(username, password, role) {
    try {
      const response = await api.post('/user/register', { username, password, role });
      this.user = response.data;
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }
}

export const userStore = new UserStore();
