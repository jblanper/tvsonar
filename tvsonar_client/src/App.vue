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
        <filters @change-view-format="changeViewFormat($event)"></filters>
      </section>
      <section id="shows-result">
        <transition name="fade">
          <shows-grid
            :shows="showsInView"
            v-if="resultsViewFormat == 'grid'"
          ></shows-grid>
          <shows-list :shows="showsInView" v-else></shows-list>
        </transition>
        <observer @load-more-shows="loadMoreShows()"></observer>
      </section>
    </main>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    async getShows() {
      try {
        const response = await this.$http.get(
          `http://localhost:8000/api/shows/?page=${this.currentShowsPage}`
        );

        const showsNeededForView = this.showsPerPage - (this.showsInView.length - this.shows.length);

        this.shows = [...this.shows, ...response.data];
        this.showsInView = [
          ...this.showsInView,
          ...response.data.slice(0, showsNeededForView),
        ];
      } catch (error) {
        console.error(error);
      }
    },
    changeViewFormat(viewFormat) {
      this.resultsViewFormat = viewFormat;
    },
    loadMoreShows() {
      if (this.shows.length == 0) return

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

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
</style>
