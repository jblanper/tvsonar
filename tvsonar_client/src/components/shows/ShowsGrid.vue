<template>
  <div class="shows-grid" ref="shows_grid">
    <ui-image-list
      class="image-placeholder-grid"
      type="0"
      :textProtection="true"
      v-if="shows.length == 0"
    >
      <ui-image-item
        v-for="i in 4"
        :key="i"
        class="image-item image-placeholder"
        :bg-image="require('@/assets/placeholder-1-1.jpg')"
      ></ui-image-item>
    </ui-image-list>

    <transition name="fade">
      <ui-image-list type="0" :textProtection="true" v-if="shows.length > 0">
        <ui-image-item
          class="image-item"
          v-for="show in shows"
          :key="show.id"
          :bg-image="show.image.medium"
        >
          <ui-image-text>{{ show.name }}</ui-image-text>
        </ui-image-item>
      </ui-image-list>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ShowsGrid",
  props: {
    shows: Array,
  },
};
</script>

<style scoped>
.image-item {
  width: 24.2%;
  margin: 2px;
}

.image-placeholder {
  animation-name: pulse;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>