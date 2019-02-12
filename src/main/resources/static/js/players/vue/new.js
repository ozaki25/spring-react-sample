function fetchTeams(league) {
  try {
    return fetch(`/api/teams?league=${league}`).then(function(res) {
      return res.json();
    });
  } catch (e) {
    alert(e.toString());
  }
}
var app = new Vue({
  el: '#vue-root',
  data: function() {
    return {
      league: '',
      teams: [],
    };
  },
  watch: {
    league: function(next, prev) {
      var self = this;
      fetchTeams(next).then(function(teams) {
        self.teams = teams;
      });
    },
  },
  methods: {
    onChangeLeague: function(event) {
      this.league = event.target.value;
    },
  },
});
