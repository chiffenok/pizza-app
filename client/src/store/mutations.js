import router from '../router/index';

const authUser = (state, userData) => {
    state.token = userData.token;
};
const clearAuthData = (state) => {
    state.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    if (router.history.current.path != '/login') {
        router.replace('/login');
    }
};
const setErrorMsg = (state, err) => {
    state.errorMsg = err.msg;
};
const clearErrorMsg = (state) => {
    state.errorMsg = '';
};

export default {
    authUser,
    clearAuthData,
    setErrorMsg,
    clearErrorMsg,
};
