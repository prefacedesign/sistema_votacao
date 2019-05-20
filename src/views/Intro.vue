<template>
  <div>
    <article id="intro">
      <header>
        <h1>{{json.form_heading}}</h1>
        <h2>{{json.form_sub_heading}}</h2>
      </header>
      <p v-for="paragraph in json.intro.text">{{paragraph}}</p>
      <div class="questions-navigation">
        <router-link class="question-nav-link next-question" to="/quest/0">Começar a responder</router-link>
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
  beforeRouteEnter: function (to, from, next) {
    // const Votes = Parse.Object.extend("Votes")
    // const vote = new Votes();
    //
    // vote.set("answers", {"banana":"abacaxi"})
    //
    // vote.save().then((savedVote) => {
    //     console.log("sucessfully posted");
    //     console.log(savedVote)
    //     next();
    //   },(error) =>{
    //     console.log(error);
    //     next();
    //   });
    next();
  },
  name: "intro"
};
</script>
