import axios from 'axios';

export default {
    name: 'vote',
    data() {
        return {
            pizzas: [],
        };
    },

    created() {
        axios
            .get('/pizzas/')
            .then((response) => {
                console.log('response pizzas: ', response);
                this.pizzas = response.data;
            })
            .catch((err) => console.log('Error getting pizzas: ', err));
    },

    methods: {
        onVote(pizza) {
            console.log('Voting pizza: ', pizza._id);
            const token = this.$store.state.token;
            console.log('Token: ', token);

            axios({
                method: 'put',
                url: '/pizzas/' + pizza._id,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => {
                    console.log('RES vote: ', res);
                    pizza.likesCount++;
                })
                .catch((err) => console.log(err.response));
        },
    },
};
