import { shallowMount } from '@vue/test-utils';
import header from '../src/components/header/index';

describe('Header', () => {
    it('renders correct links when logout', () => {
        const wrapper = shallowMount(header, {
            computed: {
                auth() {
                    return false;
                },
            },
        });
        expect(wrapper.find('h1').text()).toBe('We love pizza! Do you?');
        expect(wrapper.find('h2').text()).toBe('Sign up and tell us!');
        const bButtons = wrapper.findAll('b-button')
        expect(bButtons.length).toBe(2);
        expect(bButtons.at(0).text()).toBe('Login');
        expect(bButtons.at(1).text()).toBe('Signup');
    });
    
    it('renders correct links when login', () => {
        const wrapper = shallowMount(header, {
            computed: {
                auth() {
                    return true;
                },
            },
        });
        expect(wrapper.find('h1').text()).toBe('We love pizza! Do you?');
        expect(wrapper.find('h2').text()).toBe("You're ready to vote!");
        const bButtons = wrapper.findAll('b-button')
        expect(bButtons.length).toBe(1);
        expect(bButtons.at(0).text()).toBe('Vote');
    });
});
