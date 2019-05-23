<template>
  <div>
    <p v-for="(vote, index) in votes" :key="'vote-' + index">{{vote}}</p>
    <p v-for="(voter, index) in voters" :key="'voter-' + index">{{voter}}</p>
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
    setData(votes, voters) {
      this.votes = votes;
      this.voters = voters;
    }
  },
  name: "vote-count"
};
</script>
