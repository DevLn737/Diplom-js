import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import CreatePostPage from "@/pages/StableDiffusionPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import LlamaPage from "@/pages/LlamaPage.vue";
import {isLogin} from "@/utils/auth.js"
import FaqPage from "@/pages/FaqPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "/faq",
            name: "faq",
            component: FaqPage
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
            path: "/llama",
            name: "llama",
            component: LlamaPage,
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
