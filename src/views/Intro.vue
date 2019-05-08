<template>
  <div id="intro">
    <p>{{json.intro.text}}</p>
    <router-link to="/quest/1">link</router-link>
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
