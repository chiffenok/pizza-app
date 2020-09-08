export default {
    name: 'app-header',
    computed: {
        auth() {
            return this.$store.getters.isAuthenticated;
        },
    },
    data() {
        return {};
    },
};
