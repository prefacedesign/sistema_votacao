<template>
  <div>
    <p>{{this.$route.params.index}}</p>
    <router-link :to="'/quest/' + (parseInt(this.$route.params.index)+1)">link</router-link>
  </div>
</template>

<script>
export default {
  name: "Question"
};
</script>

<style scoped lang="scss">
</style>
