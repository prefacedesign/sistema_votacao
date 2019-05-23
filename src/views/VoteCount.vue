<template>
  <div>
    <header id="results">
      <h1>{{json.form_heading}} / {{json.form_sub_heading}}</h1>
      <h3>Compilação dos votos</h3>
    </header>
    <div class="results-compilation">
      <table>
        <tr>
          <th>Hash do voto</th>
          <th>Você concorda com a chapa apresentada?</th>
        </tr>
        <tr v-for="(vote, index) in prettyVotes" :key="'vote-' + index">
          <td>{{vote.hash}}</td>
          <td>{{vote.text}}</td>
        </tr>
      </table>
    </div>
    <!-- <p v-for="(vote, index) in votes" :key="'vote-' + index">{{vote}}</p> -->
    <!-- <p v-for="(voter, index) in voters" :key="'voter-' + index">{{voter}}</p> -->
  </div>
</template>

<script>
import mock_json from "@/assets/mock_data.json";

export default {
  data() {
    return {
      json: mock_json,
      votes: [],
      voters: []
    };
  },
  computed: {
    prettyVotes: function() {
      let auxVotes = [];
      this.votes.forEach(vote => {
        let text = this.findText(vote.attributes.answers.concorda_chapa);
        auxVotes.push({
          value: vote.attributes.answers.concorda_chapa,
          text: text,
          hash: this.prettyHash(vote.id)
        });
      });
      return auxVotes;
    }
  },
  beforeRouteEnter: function(to, from, next) {
    const Votes = Parse.Object.extend("Votes");
    const Voters = Parse.Object.extend("Voters");
    var query1 = new Parse.Query(Votes);
    var query2 = new Parse.Query(Voters);
    query1.find().then(result1 => {
      query2.find().then(result2 => {
        next(vm => vm.setData(result1, result2));
      });
    });
  },
  methods: {
    findText: function(value) {
      let text = "Value not found";
      this.json.content_flow[0].options.forEach(option => {
        if (option.value == value) {
          text = option.text;
        }
      });
      return text;
    },
    prettyHash: function(hash) {
      return hash.slice(0, 3) + "." + hash.slice(-3);
    },
    setData(votes, voters) {
      this.votes = votes;
      this.voters = voters;
    }
  },
  name: "vote-count"
};
</script>
