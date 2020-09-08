export default {
    name: 'signup',
    data() {
        return {
            errors: [],
            email: '',
            password: '',
            repeatpassword: '',
            policy: '',
        };
    },
    methods: {
        signup() {
            this.errors = [];

            console.log(this.policy);

            if (!this.email) {
                this.errors.push('Please fill the email.');
            }
            if (!this.password) {
                this.errors.push('Please fill the password.');
            }
            if (this.password !== this.repeatpassword) {
                this.errors.push("Passwords don't match.");
            }
            if (!this.policy) {
                this.errors.push('Please accept the privacy policy.');
            }

            if (!this.errors.length) {
                this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password,
                });
            }
        },
    },
};
