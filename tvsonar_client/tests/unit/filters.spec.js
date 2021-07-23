import { mount, createLocalVue } from '@vue/test-utils';
import UiButton from 'balm-ui/components/button';
import UiFab from 'balm-ui/components/fab';
import UiTextfieldComponents from 'balm-ui/components/textfield';
import Filters from '@/components/Filters.vue';

const localVue = createLocalVue();

localVue.use(UiButton);
localVue.use(UiFab);
localVue.use(UiTextfieldComponents);

describe('Filters.vue', () => {
    const wrapper = mount(Filters, { localVue });

    test('emits_empty_search_when_no_query', async () => {
        await wrapper.setData({ query: 'something' })
        expect(wrapper.emitted('empty-search')).toBeFalsy()

        await wrapper.setData({ query: '' })
        expect(wrapper.emitted('empty-search')).toBeTruthy()
    })

    test('emits_change_view_format_when_btn_clicked', async () => {
        const gridButton = wrapper.find('.btn-grid-format');
        const listButton = wrapper.find('.btn-list-format');

        await listButton.trigger('click')
        await gridButton.trigger('click')
        
        expect(wrapper.emitted('change-view-format')[0][0]).toEqual('list')
        expect(wrapper.emitted('change-view-format')[1][0]).toEqual('grid')
    })

    test('emit_seach_show_when_search_btn_clicked', async () => {
        const searchButton = wrapper.find('.btn-search-show');

        await wrapper.setData({ query: 'Wife' })
        await searchButton.trigger('click')

        expect(wrapper.emitted('search-shows')).toBeTruthy()
        expect(wrapper.emitted('search-shows')[0][0]).toEqual('Wife')
    })
})