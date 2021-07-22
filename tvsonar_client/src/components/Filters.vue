<template>
  <div class="filters">
    <ui-textfield v-model="query">Search show</ui-textfield>
    <!-- <ui-select
      id="results-view-format"
      v-model="selected"
      :options="options"
      @selected="onSelected($event)"
    >
      Results format
    </ui-select> -->
    <div class="results-view-format">
      <ui-button
        icon="grid_on"
        :raised="viewFormat == 'grid'"
        @click="changeViewFormat('grid')"
        >Grid</ui-button
      >
      <ui-button
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
      options: [
        { label: "grid", value: "grid" },
        { label: "list", value: "list" },
      ],
    };
  },
  methods: {
    changeViewFormat(viewFormat) {
      this.viewFormat = viewFormat;
      this.$emit("change-view-format", this.viewFormat);
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

.results-view-format > button {
  margin-left: 15px;
}
</style>