export default {
    name: 'app-navbar',
    computed: {
        auth() {
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        onLogout() {
            console.log('Logging out...');
            this.$store.dispatch('logout');
        },
    },
};
