<template>
  <div>
    <article>
      <header id="footer-head">
        <div class="text-headings">
          <h1>{{json.form_heading}}</h1>
          <h2>{{json.form_sub_heading}}</h2>
        </div>
        <div class="progress-bar-container">
          <p>100%</p>
          <div class="progress-bar">
            <div class="completed-rate" style="width: 100%;"></div>
          </div>
        </div>
      </header>
      <p
        class="big-font"
        v-for="(paragraph, index) in json.ending.text"
        v-bind:key="'end-p-' + index"
      >{{paragraph}}</p>
    </article>
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
  name: "the-end"
};
</script>
