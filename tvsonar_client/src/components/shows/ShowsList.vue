<template>
  <div class="shows-list">
    <p v-if="noSearchResults">No results from your search</p>
    <div
      class="shows-placeholder-cards"
      v-if="shows.length == 0 && !noSearchResults"
    >
      <ui-card
        outlined
        class="show-card info-placeholder-card"
        v-for="i in 2"
        :key="i"
      >
        <ui-skeleton :active="true"></ui-skeleton>
      </ui-card>
    </div>

    <transition name="fade">
      <div class="shows-cards" v-if="shows.length > 0">
        <ui-card
          outlined
          class="show-card"
          v-for="show in shows"
          :key="show.id"
        >
          <div class="card-image">
            <img :src="show.image.medium" :alt="show.name" class="show-image" />
          </div>
          <div class="card-content">
            <h3 :class="$tt('headline6')" class="card-title indigo">
              {{ show.name }}
            </h3>
            <p :class="$tt('subtitle2')" class="card-subtitle">
              {{ show.genres.join(", ") }}
            </p>
            <p class="show-summary" v-html="shortenSummary(show.summary)"></p>
            <ui-button
              outlined
              icon="link"
              class="btn-tvmaze"
              @click="openLink(show.url)"
              >TVmaze</ui-button
            >
          </div>
        </ui-card>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ShowsList",
  props: {
    shows: Array,
    noSearchResults: Boolean
  },
  methods: {
    shortenSummary(text) {
      return text.split(".")[0] + ".";
    },
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.show-card {
  padding: 1rem;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
}

.card-content {
  padding: 0 1rem;
}

img.show-image {
  width: 130px;
}

.card-title {
  margin: 0;
}

.card-subtitle {
  margin-top: 0;
  color: #888;
}

.btn-tvmaze {
  float: right;
}
</style>