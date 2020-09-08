import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import actions from '../src/store/actions';

const localVue = createLocalVue();

localVue.use(Vuex);

let url = '';
let body = {};

jest.mock('axios', () => ({
    post: (_url, _body) => {
        return new Promise((resolve) => {
            url = _url;
            body = _body;
            resolve(true);
        });
    },
}));

describe('authenticate', () => {
    it('authenticated a user', async () => {
        const commit = jest.fn();
        const email = 'alice';
        const password = 'password';

        await actions.login({ commit }, { email, password });

        expect(url).toBe('/user/login');
        expect(body).toEqual({ email, password });
        expect(commit).toHaveBeenCalledWith('clearErrorMsg');
        await Vue.nextTick()
        expect(commit).toHaveBeenCalledWith('authUser', true);
    });
});
