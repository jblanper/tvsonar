import { mount, createLocalVue } from '@vue/test-utils';
import UiButton from 'balm-ui/components/button';
import UiCardComponents from 'balm-ui/components/card';
import UiSkeleton from 'balm-ui/components/skeleton';
import $typography from 'balm-ui/plugins/typography';
import ShowsList from '@/components/shows/ShowsList.vue';

const localVue = createLocalVue();

localVue.use(UiButton);
localVue.use(UiCardComponents);
localVue.use(UiSkeleton);
localVue.use($typography);

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

describe('ShowsList.vue', () => {

    const wrapperWithNoShows = mount(ShowsList, { localVue, propsData: { shows: [] } });;
    const wrapperWithShows = mount(ShowsList, { localVue, propsData: { shows: mockupShows } });;

    test('shows_placeholder_cards_are_visible_when_shows_empty', async () => {
        expect(wrapperWithNoShows.find('.shows-placeholder-cards').exists()).toBeTruthy()
        expect(wrapperWithNoShows.find('.shows-cards').exists()).toBeFalsy()
    })

    test('shows_placeholder_cards_are_not_visible_when_shows', async () => {
        expect(wrapperWithShows.find('.shows-placeholder-cards').exists()).toBeFalsy()
        expect(wrapperWithShows.find('.shows-cards').exists()).toBeTruthy()
    })

    test('button_link_opens_correct_tab_when_clicked', async () => {
        const linkToTvMaze = wrapperWithShows.find('.btn-tvmaze');

        window.open = jest.fn();

        await linkToTvMaze.trigger('click')

        expect(window.open).toHaveBeenCalledTimes(1)
        expect(window.open).toHaveBeenCalledWith(mockupShows[0].url, "_blank")

        window.open.mockClear()
    })

    test('shorten_summary_returns_first_sentence', () => {
        expect(wrapperWithShows.find('.show-summary').text()).toBe('The single-camera series that mixes live-action and animation stars Jacob Bertrand as the title character.')
    })
})