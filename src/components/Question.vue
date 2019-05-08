<template>
  <div>
    <article id="quest">
      <header>
        <div class="text-headings">
          <h1>{{json.form_heading}}</h1>
          <h2>{{json.form_sub_heading}}</h2>
        </div>
        <div class="progress">
          <p>40%</p>
          <div class="progress-bar">
            <div class="completed-rate"></div>
          </div>
        </div>
      </header>
    </article>

    <!-- <p>{{this.$route.params.index}}</p>
    <router-link :to="'/quest/' + (parseInt(this.$route.params.index)+1)">link</router-link>-->
  </div>
</template>

<script>
import mock_json from "@/assets/mock_data.json";
export default {
  data() {
    return {
      json: mock_json
    };
  },
  name: "Question"
};
</script>

<style scoped lang="scss">
</style>
