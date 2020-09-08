import axios from 'axios';
import appHeader from '../../components/header/index';
import barChart from '../../components/bar-chart/bar-chart';
import appSpinner from '../../components/spinner';

export default {
    name: 'Home',
    components: {
        appHeader,
        barChart,
        appSpinner,
    },
    data: function() {
        return {
            pizzas: [],
            users: [],
            loaded: false,
            chartdata: null,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
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

        axios
            .get('/user/')
            .then((response) => {
                console.log('response user: ', response);
                this.users = response.data;
                this.chartdata = {
                    labels: this.users.map((user) => user.email),
                    datasets: [
                        {
                            label: 'Number of likes',
                            backgroundColor: '#BA5343',
                            data: this.users.map((user) => user.givenLikes),
                        },
                    ],
                };
                this.loaded = true;
            })
            .catch((err) => console.log('Error getting users: ', err));
    },
};
