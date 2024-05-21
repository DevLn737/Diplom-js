import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: !!localStorage.getItem("token"),
  }),
  actions: {
    login(token) {
      localStorage.setItem("token", token);
      localStorage.removeItem("logged", true);
      this.isLoggedIn = true;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("logged");
      this.isLoggedIn = false;
    },
  },
});
