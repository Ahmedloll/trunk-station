<template>
  <div class="loader flex center align sub-loader">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../styles/loader.scss";
</style>
