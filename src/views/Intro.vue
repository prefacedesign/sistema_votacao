<template>
  <div>
    <article id="intro">
      <header>
        <h1>{{json.form_heading}}</h1>
        <h2>{{json.form_sub_heading}}</h2>
      </header>
      <p v-for="paragraph in json.intro.text">{{paragraph}}</p>
      <router-link class="next-question" to="/quest/0">Começar a responder</router-link>
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
  name: "intro"
};
</script>
