import { Table } from "react-bootstrap";

async function playAudio(location) {
  var audio = new Audio("./media/" + location);
  var audioPromise = audio.play();
  if (audioPromise !== undefined) {
    audioPromise
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  }
}

function renderPlayButton(fileName) {
  if (fileName == "") {
    return <td></td>;
  }
  return (
    <td className="audio-column">
      <button className="play-button" onClick={() => playAudio(fileName)}>
        <img className="play-button-icon" src="./media/play.png" />
      </button>
    </td>
  );
}

function displayExtraTable(table) {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th></th>
          <th>Ед. ч</th>
          <th></th>
          <th></th>
          <th>Мн. ч</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <tr>
            {row.map((entry) => (
              <>
                {renderPlayButton(entry.audio)}
                <td>{entry.kalmyk}</td>
                <td>{entry.russian}</td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function displayExtras(data) {
  if (!data || data.length == 0) {
    return;
  }
  var items = data.items;
  if (!items) {
    return;
  }
  var tableIndex = data.tableIndex;
  return (
    <>
      <span>Примечания:</span>
      <div className="extras">
        <ol>
          {items.map((item, index) => {
            if (index == tableIndex - 1) {
              return (
                <>
                  <li>
                    <p>{item}</p>
                  </li>
                  {displayExtraTable(data.table)}
                </>
              );
            }
            return <li>{item}</li>;
          })}
        </ol>
      </div>
    </>
  );
}
