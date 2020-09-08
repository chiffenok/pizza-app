import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import login from '../src/views/login/index';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
    state: {
        errorMsg: 'Error test',
    },
});

describe('Login', () => {
    it('renders correct error message', () => {
        const wrapper = shallowMount(login, { store, localVue });

        const errors = wrapper.find('.alert');
        expect(errors.text()).toBe('Error test');
    });

    it('renders correct error message', () => {
        const wrapper = shallowMount(login, {
            store,
            localVue,
            propsData: {
                errors: ["test"]
            },
        });

        wrapper.vm.login();
    });
});
