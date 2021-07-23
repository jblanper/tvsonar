<template>
  <div class="filters">
    <div class="search">
      <ui-textfield v-model="query">Search show</ui-textfield>
      <ui-fab
        icon="search"
        mini
        @click="searchShow()"
        class="btn-search-show"
      ></ui-fab>
    </div>

    <div class="results-view-format">
      <ui-button
        class="btn-grid-format"
        icon="grid_on"
        :raised="viewFormat == 'grid'"
        @click="changeViewFormat('grid')"
        >Grid</ui-button
      >
      <ui-button
        class="btn-list-format"
        icon="list"
        :raised="viewFormat == 'list'"
        @click="changeViewFormat('list')"
        >List</ui-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      query: "",
      viewFormat: "grid",
    };
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        this.$emit("empty-search");
      }
    },
  },
  methods: {
    changeViewFormat(viewFormat) {
      this.viewFormat = viewFormat;
      this.$emit("change-view-format", this.viewFormat);
    },
    searchShow() {
      this.$emit("search-shows", this.query);
    },
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.search > * {
  margin-right: 10px;
}

.results-view-format > button {
  margin-left: 15px;
}
</style>