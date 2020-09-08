const isAuthenticated = (state) => {
    return state.token !== null;
}

export default {
    isAuthenticated
};