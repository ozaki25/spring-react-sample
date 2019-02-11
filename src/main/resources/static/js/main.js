function PlayerItem({ id, name, age, team, position, onClickShow, onClickEdit, onClickDelete }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{age}</td>
      <td>{team}</td>
      <td>{position}</td>
      <td>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => onClickShow(id)}>
          参照
        </button>
      </td>
      <td>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => onClickEdit(id)}>
          編集
        </button>
      </td>
      <td>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => onClickDelete(id)}>
          削除
        </button>
      </td>
    </tr>
  );
}

class PlayerList extends React.Component {
  state = {
    players: null,
    sort: {
      col: 'id',
      desc: false,
    },
  };

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers = async () => {
    try {
      const players = await fetch('/api/players').then(res => res.json());
      this.setState({ players });
    } catch (e) {
      alert(e.toString());
    }
  };

  onClickShow = id => (location.href = `/players/${id}`);

  onClickEdit = id => (location.href = `/players/${id}/edit`);

  onClickDelete = async id => {
    try {
      await fetch(`/api/players/${id}`, { method: 'DELETE' });
      this.fetchPlayers();
    } catch (e) {
      alert(e.toString());
    }
  };

  sortBy = ({ col }) => {
    this.setState(prevState => {
      const { sort, players } = prevState;
      const desc = sort.col === col ? !sort.desc : false;
      const newPlayers = players.sort((a, b) =>
        desc ? (a[col] > b[col] ? -1 : 1) : b[col] > a[col] ? -1 : 1,
      );
      return {
        players: newPlayers,
        sort: {
          col,
          desc,
        },
      };
    });
  };

  render() {
    const { players } = this.state;
    console.log(players);
    return players ? (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.sortBy({ col: 'id' })}>ID</th>
            <th onClick={() => this.sortBy({ col: 'name' })}>名前</th>
            <th onClick={() => this.sortBy({ col: 'age' })}>年齢</th>
            <th onClick={() => this.sortBy({ col: 'team' })}>チーム名</th>
            <th onClick={() => this.sortBy({ col: 'position' })}>守備位置</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {players.map(props => (
            <PlayerItem
              key={props.id}
              onClickShow={this.onClickShow}
              onClickEdit={this.onClickEdit}
              onClickDelete={this.onClickDelete}
              {...props}
            />
          ))}
        </tbody>
      </table>
    ) : (
      <p>Loading...</p>
    );
  }
}

ReactDOM.render(<PlayerList />, document.getElementById('react-root'));
