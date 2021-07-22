<template>
  <div class="observer" ref="observer_el">
      <ui-spinner active fourColored></ui-spinner>
  </div>
</template>

<script>
export default {
  name: "Observer",
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          this.$emit("load-more-shows");
        }
      },
      {
        rootMargin: "10px",
        threshold: 0.6,
      }
    );

    this.observer.observe(this.$refs.observer_el);
  },
};
</script>

<style scoped>
.observer {
    display: flex;
    justify-content: center;
}
.observer > * {
    margin-top: 2rem;
}
</style>