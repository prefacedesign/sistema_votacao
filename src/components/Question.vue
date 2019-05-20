<template>
  <div>
    <article id="quest">
      <header id="footer-head">
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
            :class="{ selected : answers[currentQuestion.name] == r.value }"
          >
            <input
              :id="'radio-' + index"
              type="radio"
              :name="currentQuestion.name"
              :value="r.value"
              :disabled="status != 'filling_vote'"
              v-model="answers[currentQuestion.name]"
            >
            {{r.text}}
          </label>
        </div>
        <div class="options-container checkbox-container" v-if="currentQuestion.type == 'checkbox'">
          <label
            v-bind:key="'_' + index"
            :for="'checkbox-' + index"
            v-for="(r, index) in currentQuestion.options"
            :class="{ selected : answers[currentQuestion.name].includes(r.value) }"
          >
            <input
              :id="'checkbox-' + index"
              type="checkbox"
              :name="currentQuestion.name + '-' + index"
              :value="r.value"
              :disabled="status != 'filling_vote'"
              v-model="answers[currentQuestion.name]"
            >
            {{r.text}}
          </label>
        </div>
        <div class="textarea-container" v-if="currentQuestion.type == 'text_input'">
          <textarea :disabled="status != 'filling_vote'" v-model="answers[currentQuestion.name]"></textarea>
        </div>
      </div>

      <div class="questions-navigation">
        <div>
          <template v-if="this.$route.params.index > 0">
            <router-link
              :to="'/quest/' + (parseInt(this.$route.params.index)-1)"
              class="question-nav-link previous-question"
            ></router-link>
          </template>
        </div>
        <div>
          <template v-if="this.$route.params.index < json.content_flow.length - 1">
            <router-link
              class="question-nav-link next-question"
              :to="'/quest/' + (parseInt(this.$route.params.index)+1)"
            >Próxima pergunta</router-link>
          </template>
          <template v-else>
            <a class="question-nav-link post-vote-link" @click="saveVote">Enviar voto</a>
          </template>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import mock_json from "@/assets/mock_data.json";
export default {
  data() {
    var i;
    var ans = {};
    var n;

    for (i = 0; i < mock_json.content_flow.length; i++) {
      if (typeof mock_json.content_flow[i].name == "undefined") {
        continue;
      }

      n = mock_json.content_flow[i].name;

      switch (mock_json.content_flow[i].type) {
        case "checkbox":
          ans[n] = [];
          break;
        case "text_input":
        case "radio":
          ans[n] = "";
          break;
        default:
          throw "Unrecognized input type";
      }
    }

    return {
      json: mock_json,
      answers: ans,
      selectedRadio: "",
      selectedCheckboxes: [],
      status: "filling_vote"
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
  methods: {
    saveVote: function(event) {
      const Votes = Parse.Object.extend("Votes")
      const vote = new Votes();

      if (this.status == "saving_vote") {
        return;
      }

      this.status = "saving_vote";

      vote.set("answers", this.answers);

      return vote.save().then((savedVote) => {
        console.log("sucessfully posted");
        console.log(savedVote);

        this.$router.push('/fim/'+ savedVote.id.substr(0,3) + '.' + savedVote.id.substr(3,3));
      },(error) =>{
        console.log(error);
        alert(error);
        this.status = "filling_vote";
      });
    }
  },
  name: "Question"
};
</script>

<style scoped lang="scss">
</style>
