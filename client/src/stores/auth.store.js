import { defineStore } from "pinia";


export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    user: null,
    isAuthenticated: false
  }),
  actions: {
    login(token, user) {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    }
  },
  getters: {
    getToken() {
      return this.token;
    },
    getUser() {
      return this.user;
    },
    getIsAuthenticated() {
      return this.isAuthenticated;
    }
  }
});