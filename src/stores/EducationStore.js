import { makeAutoObservable } from 'mobx';
import { api } from './api'; 

class EducationStore {
  requests = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUserRequests() {
    this.isLoading = true;
    try {
      const response = await api.get('/education/user-requests');
      this.requests = response.data;
    } catch (error) {
      console.error('Failed to fetch user requests', error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchPendingRequestsForSenior() {
    this.isLoading = true;
    try {
      const response = await api.get('education/senior-requests');
      this.requests = response.data;
    } catch (error) {
      console.error('Failed to fetch pending requests for senior', error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchRequestsForManager() {
    this.isLoading = true;
    try {
      const response = await api.get('/education/manager-requests')
      this.requests = response.data;
    } catch (error) {
      console.error('Failed to fetch requests for manager', error);
    } finally {
      this.isLoading = false;
    }
  }

  async submitRequest(firstChoice, secondChoice, explanation) {
    try {
      await api.post('/education/submit',{ firstChoice, secondChoice, explanation });
      await this.fetchUserRequests();
    } catch (error) {
      console.error('Failed to submit request', error);
    }
  }

  async approveRequestBySenior(id) {
    try {
      await api.patch(`/education/senior-approve/${id}`);
      await this.fetchPendingRequestsForSenior();
    } catch (error) {
      console.error('Failed to approve request by senior', error);
    }
  }

  async approveRequestByManager(id) {
    try {
      await api.patch(`/education/manager-approve/${id}`);
      await this.fetchRequestsForManager();
    } catch (error) {
      console.error('Failed to approve request by manager', error);
    }
  }

  async rejectRequest(id) {
    try {
      await api.patch(`/education/reject/${id}`);
      //await this.fetchUserRequests();
    } catch (error) {
      console.error('Failed to reject request', error);
    }
  }
}

export const educationStore = new EducationStore();
