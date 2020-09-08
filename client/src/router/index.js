import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/index';
import {store} from '../store/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/vote',
        name: 'Vote',
        component: () =>
            import(/* webpackChunkName: "vote" */ '../views/vote/index.vue'),
        beforeEnter(to, from, next) {
            if (store.state.token) {
                next();
            } else {
                next('/login');
            }
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
        beforeEnter(to, from, next) {
            if (!store.state.token) {
                next();
            } else {
                next('/');
            }
        },
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import(
                /* webpackChunkName: "signup" */ '../views/signup/index.vue'
            ),
        beforeEnter(to, from, next) {
            if (!store.state.token) {
                next();
            } else {
                next('/');
            }
        },
    },
];

const router = new VueRouter({
    routes,
});

export default router;
