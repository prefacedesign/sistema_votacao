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
      <div class="question">
        <p class="main-text">
          <span
            v-if="this.$route.params.index"
            class="question-number"
          >{{parseInt(this.$route.params.index)+1}}.</span>
          {{currentQuestion.main_text}}
        </p>
        <p class="sub-text" v-if="currentQuestion.sub_text">{{currentQuestion.sub_text}}</p>
        <div class="options-container radio-container" v-if="currentQuestion.type == 'radio'">
          <label
            v-bind:key="'_' + index"
            :for="'radio-' + index"
            v-for="(r, index) in currentQuestion.options"
            :class="{ selected : selectedRadio == r.value }"
          >
            <input
              :id="'radio-' + index"
              type="radio"
              :name="currentQuestion.name"
              :value="r.value"
              v-model="selectedRadio"
            >
            {{r.text}}
          </label>
        </div>
        <template v-if="currentQuestion.type == 'checkbox'"></template>
        <template v-if="currentQuestion.type == 'text_input'"></template>
      </div>

      <template v-if="this.$route.params.index < json.content_flow.length - 1">
        <router-link
          class="next-question"
          :to="'/quest/' + (parseInt(this.$route.params.index)+1)"
        >Próxima pergunta</router-link>
      </template>
      <template v-else>Acabou!</template>
    </article>
  </div>
</template>

<script>
import mock_json from "@/assets/mock_data.json";
export default {
  data() {
    return {
      json: mock_json,
      selectedRadio: ""
    };
  },
  computed: {
    currentQuestion: function() {
      let current = this.$route.params.index;
      if (!current) {
        return "";
      }
      return this.json.content_flow[current];
    },
    percentageComplete: function() {
      let current = this.$route.params.index;
      if (!current) {
        return 0;
      }
      return Math.round((100 * current) / this.json.content_flow.length);
    }
  },
  name: "Question"
};
</script>

<style scoped lang="scss">
</style>
