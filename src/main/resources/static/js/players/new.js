function fetchTeams(league) {
  try {
    return fetch(`/api/teams?league=${league}`).then(res => res.json());
  } catch (e) {
    alert(e.toString());
  }
}

function PlayerForm() {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [league, setLeague] = React.useState('');
  const [team, setTeam] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    if (league) updateTeams(league);
  }, [league]);

  const updateTeams = async league => setTeams(await fetchTeams(league));

  const onChangeName = event => setName(event.target.value);

  const onChangeAge = event => setAge(event.target.value);

  const onChangeTeam = event => setTeam(event.target.value);

  const onChangePosition = event => setPosition(event.target.value);

  const onChangeLeague = event => setLeague(event.target.value);

  const onSubmit = event => {
    event.preventDefault();
    event.target.submit();
  };

  return (
    <form action="/players" method="post" onSubmit={onSubmit}>
      <div className="form-group">
        <label className="control-label">名前</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={name}
          onChange={onChangeName}
        />
      </div>
      <div className="form-group">
        <label className="control-label">年齢</label>
        <input
          className="form-control"
          type="number"
          name="age"
          value={age}
          onChange={onChangeAge}
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
              onChange={onChangeLeague}
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
              onChange={onChangeLeague}
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
          <select className="form-control" name="team" value={team} onChange={onChangeTeam}>
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
          onChange={onChangePosition}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        作成
      </button>
    </form>
  );
}

ReactDOM.render(<PlayerForm />, document.getElementById('react-root'));
