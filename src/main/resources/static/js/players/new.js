class PlayerForm extends React.Component {
  state = {
    name: '',
    age: '',
    league: '',
    team: '',
    position: '',
    teams: [],
  };

  fetchTeams = async league => {
    try {
      const teams = await fetch(`/api/teams?league=${league}`).then(res => res.json());
      this.setState({ teams });
    } catch (e) {
      alert(e.toString());
    }
  };

  invalid = () => {
    const { name, age, league, team, position } = this.state;
    return (
      name.trim() === '' ||
      age.trim() === '' ||
      league.trim() === '' ||
      team.trim() === '' ||
      position.trim() === ''
    );
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onChangeLeague = event => {
    this.onChange(event);
    this.fetchTeams(event.target.value);
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.invalid()) {
      alert('未入力の項目があります');
    } else {
      event.target.submit();
    }
  };

  render() {
    console.log({ name, age, league, team, position, teams });
    return (
      <form action="/players" method="post" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label className="control-label">名前</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label className="control-label">年齢</label>
          <input
            className="form-control"
            type="number"
            name="age"
            value={age}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label className="control-label">リーグ</label>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="league"
                id="league-npb"
                value="npb"
                onChange={this.onChangeLeague}
              />
              <label className="form-check-label" htmlFor="league-npb">
                NPB
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="league"
                id="league-mlb"
                value="mlb"
                onChange={this.onChangeLeague}
              />
              <label className="form-check-label" htmlFor="league-mlb">
                MLB
              </label>
            </div>
          </div>
        </div>
        {league && teams.length && (
          <div className="form-group">
            <label className="control-label">チーム</label>
            <select className="form-control" name="team" value={team} onChange={this.onChange}>
              {teams.map((team, key) => (
                <option key={key} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label className="control-label">守備位置</label>
          <input
            className="form-control"
            type="text"
            name="position"
            value={position}
            onChange={this.onChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          作成
        </button>
      </form>
    );
  }
}

ReactDOM.render(<PlayerForm />, document.getElementById('react-root'));
