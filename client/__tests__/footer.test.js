import { shallowMount } from '@vue/test-utils';
import footer from '../src/components/footer/index';

describe('Footer', () => {
    test('should have correct links', () => {
        const wrapper = shallowMount(footer);
        expect(wrapper.exists()).toBe(true);
        const links = wrapper.findAll('a');
        expect(links.at(0).text()).toBe('Linkedin');
        expect(links.at(1).text()).toBe('Github');
    });
});
