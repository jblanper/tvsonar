<template>
  <div class="observer" ref="observer_el">
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