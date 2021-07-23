<template>
  <div id="app">
    <header>
      <h1 :class="$tt('headline2')" class="indigo">TV Sonar</h1>
      <p>
        Welcome to TV Sonar! Here you can explore TV shows available in
        <a
          href="https://www.tvmaze.com"
          target="_blank"
          rel="noopener noreferrer"
          >TVmaze.com</a
        >
        database. Enjoy!
      </p>
    </header>

    <main>
      <section id="show-filter">
        <filters
          @change-view-format="changeViewFormat($event)"
          @search-shows="searchShows($event)"
          @empty-search="reloadShows()"
        ></filters>
      </section>
      <section id="shows-result">
        <transition name="fade">
          <shows-grid
            :shows="showsInView"
            :noSearchResults="noSearchResults"
            v-if="resultsViewFormat == 'grid'"
          ></shows-grid>
          <shows-list :shows="showsInView" :noSearchResults="noSearchResults" v-else></shows-list>
        </transition>
        <div class="spinner">
          <ui-spinner active fourColored v-if="loading"></ui-spinner>
        </div>
        <observer @load-more-shows="loadMoreShows()"></observer>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Filters from "./components/Filters.vue";
import Observer from "./components/Observer.vue";
import ShowsGrid from "./components/shows/ShowsGrid.vue";
import ShowsList from "./components/shows/ShowsList.vue";

export default {
  name: "App",
  components: {
    Filters,
    ShowsGrid,
    ShowsList,
    Observer,
  },
  data() {
    return {
      shows: [],
      showsInView: [],
      resultsViewFormat: "grid",
      showsPerPage: 25,
      currentShowsPage: 1,
      loading: true,
      noSearchResults: false,
    };
  },
  methods: {
    async getShows() {
      this.loading = true;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/shows/?page=${this.currentShowsPage}`
        );

        const showsNeededForView =
          this.showsPerPage - (this.showsInView.length - this.shows.length);

        this.shows = [...this.shows, ...response.data];
        this.showsInView = [
          ...this.showsInView,
          ...response.data.slice(0, showsNeededForView),
        ];
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    async searchShows(query) {
      this.loading = true;
      try {
        this.showsInView = [];

        const response = await axios.get(
          `http://localhost:8000/api/shows/search?q=${query}`
        );

        this.noSearchResults = response.data.length == 0;
        this.showsInView = response.data;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    changeViewFormat(viewFormat) {
      this.resultsViewFormat = viewFormat;
    },
    loadMoreShows() {
      if (
        !this.shows.length ||
        !this.showsInView.length ||
        this.showsInView.length < this.showsPerPage
      )
        return;

      const numShowsInView = this.showsInView.length;
      const numShows = this.shows.length;

      if (numShowsInView + 25 > numShows) {
        this.currentShowsPage++;
        this.getShows();
      } else {
        this.showsInView = [
          ...this.showsInView,
          ...this.shows.slice(
            numShowsInView,
            numShowsInView + this.showsPerPage
          ),
        ];
      }
    },
    reloadShows() {
      this.noSearchResults = false;
      this.showsInView = this.shows.slice(0, this.showsPerPage);
    },
  },
  mounted() {
    this.getShows();
  },
};
</script>

<style>
body {
  max-width: 800px;
  margin: auto;
}

section {
  margin-top: 2rem;
}

.indigo {
  color: #283593;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.spinner {
  display: flex;
  justify-content: center;
}

.spinner > * {
  margin-top: 2rem;
}
</style>
