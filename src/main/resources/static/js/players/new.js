class PlayerForm extends React.Component {
  state = {
    name: '',
    age: '',
    team: '',
    position: '',
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    if (this.invalid()) {
      alert('入力内容を確認して下さい');
    } else {
      event.target.submit();
    }
  };

  invalid = () => {
    const { name, age, team, position } = this.state;
    return name.trim() === '' || age.trim() === '' || team.trim() === '' || position.trim() === '';
  };

  render() {
    const { name, age, team, position } = this.state;
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
          <label className="control-label">チーム名</label>
          <input
            className="form-control"
            type="text"
            name="team"
            team={team}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label className="control-label">守備位置</label>
          <input
            className="form-control"
            type="text"
            name="position"
            position={position}
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
