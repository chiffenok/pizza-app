import axios from 'axios';
import router from '../router/index';

const signup = ({ commit, dispatch }, authData) => {
    commit('clearErrorMsg');
    axios
        .post('/user/signup', {
            email: authData.email,
            password: authData.password,
        })
        .then((res) => {
            console.log('RES signup: ', res);

            //Login after sign up
            dispatch('login', {
                email: authData.email,
                password: authData.password,
            });
        })
        .catch((err) => {
            console.log(err.response);
            if (err.response.status === 409) {
                commit('setErrorMsg', {
                    msg: 'Email already exists.',
                });
            } else {
                commit('setErrorMsg', {
                    msg: 'An error has occurred.',
                });
            }
            setTimeout(() => commit('clearErrorMsg'), 3000);
        });
};

const login = ({ commit, dispatch }, authData) => {
    commit('clearErrorMsg');
    axios
        .post('/user/login', {
            email: authData.email,
            password: authData.password,
        })
        .then((res) => {
            console.log('RES login: ', res);

            commit('authUser', {
                token: res.data.token,
            });

            const now = new Date();
            const expirationDate = new Date(
                now.getTime() + res.data.tokenExpiresIn * 1000
            );
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('expirationDate', expirationDate);

            router.replace('/vote');

            dispatch('autoLogout', res.data.tokenExpiresIn * 1000);
        })
        .catch((err) => {
            console.log(err.response);
            if (err.response.status === 401) {
                commit('setErrorMsg', {
                    msg: 'Email and/or password are invalid.',
                });
            } else {
                commit('setErrorMsg', {
                    msg: 'An error has occurred.',
                });
            }
            setTimeout(() => commit('clearErrorMsg'), 3000);
        });
};

const logout = ({ commit }) => {
    commit('clearAuthData');
};

const autoLogin = ({ commit, dispatch }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date();
    if (expirationDate && now >= expirationDate) {
        return;
    }
    commit('authUser', {
        token: token,
    });
    const expirationTime = new Date(expirationDate) - now;
    dispatch('autoLogout', expirationTime);
};

const autoLogout = ({ commit }, expirationTime) => {
    setTimeout(() => {
        commit('clearAuthData');
    }, expirationTime);
};

export default {
    signup,
    login,
    logout,
    autoLogin,
    autoLogout,
};
