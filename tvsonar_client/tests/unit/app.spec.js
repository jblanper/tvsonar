import { shallowMount, createLocalVue } from '@vue/test-utils';
import UiSpinner from 'balm-ui/components/spinner';
import $typography from 'balm-ui/plugins/typography';
import ShowsList from '@/components/shows/ShowsList.vue';
import ShowsGrid from '@/components/shows/ShowsGrid.vue';
import Filters from '@/components/Filters.vue';
import App from '@/App.vue';

const localVue = createLocalVue();

localVue.use(UiSpinner);
localVue.use($typography);
localVue.use(ShowsList);
localVue.use(ShowsGrid);
localVue.use(Filters);

const mockupShows = [
    {
        "id": 250,
        "url": "https://www.tvmaze.com/shows/250/kirby-buckets",
        "name": "Kirby Buckets",
        "genres": [
            "Comedy"
        ],
        "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg"
        },
        "summary": "<p>The single-camera series that mixes live-action and animation stars Jacob Bertrand as the title character. <b>Kirby Buckets</b> introduces viewers to the vivid imagination of charismatic 13-year-old Kirby Buckets, who dreams of becoming a famous animator like his idol, Mac MacCallister. With his two best friends, Fish and Eli, by his side, Kirby navigates his eccentric town of Forest Hills where the trio usually find themselves trying to get out of a predicament before Kirby's sister, Dawn, and her best friend, Belinda, catch them. Along the way, Kirby is joined by his animated characters, each with their own vibrant personality that only he and viewers can see.</p>"
    }
];

jest.mock('axios', () => ({
    get: url => {
        if (url.includes('search')) {
            return Promise.resolve({ data: mockupShows })
        } else {
            return Promise.resolve({ data: Array(100).fill(mockupShows[0]) })
        }
    }
}))

describe('App.vue', () => {

    const wrapper = shallowMount(App, { localVue });

    test('fetches_100_shows_when_mounted', async () => {
        expect(wrapper.vm.$data.shows.length).toBe(100)
        expect(wrapper.vm.$data.showsInView.length).toBe(wrapper.vm.$data.showsPerPage)
    })

    test('loadMoreShows_adds_25_shows_more', async () => {
        await wrapper.vm.loadMoreShows()
        expect(wrapper.vm.$data.showsInView.length).toBe(wrapper.vm.$data.showsPerPage * 2)
    })

    test('getShows_fetches_shows', async () => {
        await wrapper.vm.getShows()
        expect(wrapper.vm.$data.shows.length).toBe(200)
        expect(wrapper.vm.$data.showsInView.length).toBe(100 + wrapper.vm.$data.showsPerPage)
    })

    test('search-shows_event_triggers_searchShows_method', async () => {
        await wrapper.findComponent({ name: 'Filters' }).vm.$emit('search-shows', 'Wife')
        expect(wrapper.vm.$data.showsInView.length).toBe(1)
    })

    test('change-view-format_triggers_changeViewFormat_method', async () => {
        expect(wrapper.vm.$data.resultsViewFormat).toBe('grid')
        await wrapper.findComponent({ name: 'Filters' }).vm.$emit('change-view-format', 'list')
        expect(wrapper.vm.$data.resultsViewFormat).toBe('list')
    })

    test('empty-search_event_triggers_reloadShows_method', async () => {
        await wrapper.vm.loadMoreShows()
        await wrapper.findComponent({ name: 'Filters' }).vm.$emit('empty-search')
        expect(wrapper.vm.$data.showsInView.length).toBe(wrapper.vm.$data.showsPerPage)
    })
})