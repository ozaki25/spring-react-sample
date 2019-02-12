function fetchPlayers() {
  try {
    return fetch('/api/players').then(res => res.json());
  } catch (e) {
    alert(e.toString());
  }
}

function deletePlayer(id) {
  try {
    return fetch(`/api/players/${id}`, { method: 'DELETE' });
  } catch (e) {
    alert(e.toString());
  }
}

function sorting(list, col, desc) {
  return list.sort((a, b) =>
    desc ? (a[col] > b[col] ? -1 : 1) : b[col] > a[col] ? -1 : 1,
  );
}

function PlayerItem({
  id,
  name,
  age,
  team,
  position,
  onClickShow,
  onClickEdit,
  onClickDelete,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{age}</td>
      <td>{team}</td>
      <td>{position}</td>
      <td>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => onClickShow(id)}
        >
          参照
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => onClickEdit(id)}
        >
          編集
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => onClickDelete(id)}
        >
          削除
        </button>
      </td>
    </tr>
  );
}

function PlayerList() {
  const [players, setPlayers] = React.useState(null);
  const [sort, setSort] = React.useState({ col: 'id', desc: false });

  React.useEffect(() => {
    updatePlayers();
  }, []);

  const updatePlayers = async () => setPlayers(await fetchPlayers());

  const onClickShow = id => (location.href = `/players/${id}`);

  const onClickEdit = id => (location.href = `/players/${id}/edit`);

  const onClickDelete = async id => {
    await deletePlayer(id);
    updatePlayers();
  };

  const sortBy = col => {
    const desc = sort.col === col ? !sort.desc : false;
    setPlayers(sorting(players, col, desc));
    setSort({ col, desc });
  };

  return players ? (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => sortBy('id')}>ID</th>
          <th onClick={() => sortBy('name')}>名前</th>
          <th onClick={() => sortBy('age')}>年齢</th>
          <th onClick={() => sortBy('team')}>チーム名</th>
          <th onClick={() => sortBy('position')}>守備位置</th>
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {players.map(props => (
          <PlayerItem
            key={props.id}
            onClickShow={onClickShow}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            {...props}
          />
        ))}
      </tbody>
    </table>
  ) : (
    <p>Loading...</p>
  );
}

ReactDOM.render(<PlayerList />, document.getElementById('react-root'));
