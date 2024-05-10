import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import CreatePostPage from "@/pages/StableDiffusionPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import {isLogin} from "@/utils/auth.js"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "/stable-diffusion",
            name: "stable-diffusion",
            component: CreatePostPage,
            beforeEnter: (to, from, next) => {
                if (isLogin()) {
                    next();
                } else {
                    next({name: 'login'});
                }
            }
        },
        {
            path: "/register",
            name: "register",
            component: RegisterPage,
            beforeEnter: (to, from, next) => {
                if (isLogin()) {
                    next({name: "home"});
                } else {
                    next();
                }
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginPage,
            beforeEnter: (to, from, next) => {
                if (isLogin()) {
                    next({name: 'home'});
                } else {
                    next();
                }
            }
        }
    ]
})


export default router;
