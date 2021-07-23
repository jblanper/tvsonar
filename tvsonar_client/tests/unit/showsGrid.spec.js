import { mount, createLocalVue } from '@vue/test-utils';
import UiImageListComponents from 'balm-ui/components/image-list';import UiCardComponents from 'balm-ui/components/card';
import ShowsGrid from '@/components/shows/ShowsGrid.vue';

const localVue = createLocalVue();

localVue.use(UiImageListComponents);

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

describe('ShowsGrid.vue', () => {

    const wrapperWithNoShows = mount(ShowsGrid, { localVue, propsData: { shows: [] } });;
    const wrapperWithShows = mount(ShowsGrid, { localVue, propsData: { shows: mockupShows } });;

    test('images_placeholder_grid_are_visible_when_shows_empty', async () => {
        expect(wrapperWithNoShows.find('.images-placeholder-grid').exists()).toBeTruthy()
        expect(wrapperWithNoShows.find('.images-grid').exists()).toBeFalsy()
    })

    test('images_placeholder_grid_are_not_visible_when_shows', async () => {
        expect(wrapperWithShows.find('.images-placeholder-grid').exists()).toBeFalsy()
        expect(wrapperWithShows.find('.images-grid').exists()).toBeTruthy()
    })
})