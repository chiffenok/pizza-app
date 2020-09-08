export default {
    name: 'login',
    data() {
        return {
            errors: [],
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            this.errors = [];

            console.log(this.policy);

            if (!this.email) {
                this.errors.push('Please fill the email.');
            }
            if (!this.password) {
                this.errors.push('Please fill the password.');
            }

            if (!this.errors.length) {
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                });
            }
        },
    },
};
