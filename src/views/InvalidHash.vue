<template>
  <div>
    <article id="inv">
      <header>
        <h1>{{json.form_heading}}</h1>
        <h2>{{json.form_sub_heading}}</h2>
      </header>
      <div class="error-message">
        <p>O link que você usou para acessar este sistema de votação já foi usado para enviar um voto.</p>
      </div>
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
  name: "invalid-hash"
};
</script>
