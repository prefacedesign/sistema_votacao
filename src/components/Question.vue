<template>
  <div>
    <article id="quest">
      <header>
        <div class="text-headings">
          <h1>{{json.form_heading}}</h1>
          <h2>{{json.form_sub_heading}}</h2>
        </div>
        <div class="progress-bar-container">
          <p>{{percentageComplete}}%</p>
          <div class="progress-bar">
            <div class="completed-rate" :style="{width: percentageComplete + '%'}"></div>
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
  computed: {
    percentageComplete: function() {
      return 10;
    }
  },
  name: "Question"
};
</script>

<style scoped lang="scss">
</style>
