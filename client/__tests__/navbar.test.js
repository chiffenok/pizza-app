import { shallowMount, mount } from '@vue/test-utils';
import navbar from '../src/components/navbar/index';

describe('Navbar', () => {
    it('renders correct left links', () => {
        const wrapper = mount(navbar, {
            computed: {
                auth() {
                    return false;
                },
            },
        });

        const routerLinks = wrapper.findAll('router-link');
        expect(routerLinks.at(0).text()).toBe('Home');
        expect(routerLinks.at(1).text()).toBe('About');
    });

    it('renders correct right-side links when logout', () => {
        const wrapper = shallowMount(navbar, {
            computed: {
                auth() {
                    return false;
                },
            },
        });

        const bButtons = wrapper.findAll('b-button');
        expect(bButtons.length).toBe(2);
        expect(bButtons.at(0).text()).toBe('Login');
        expect(bButtons.at(1).text()).toBe('Signup');
    });

    it('renders correct right-side links when login', () => {
        const wrapper = shallowMount(navbar, {
            computed: {
                auth() {
                    return true;
                },
            },
        });

        const bButtons = wrapper.findAll('b-button');
        expect(bButtons.length).toBe(2);
        expect(bButtons.at(0).text()).toBe('Vote');
        expect(bButtons.at(1).text()).toBe('Logout');
    });
});
