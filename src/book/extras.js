import { Table } from "react-bootstrap";
import highlight from "./highlighter";

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

function displayExtraTable(table, highlights) {
  return (
    <div>
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
                  <td>{highlight(entry.kalmyk, highlights)}</td>
                  <td>{entry.russian}</td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default function displayExtras(data, highlights) {
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
                    <p>{highlight(item, highlights)}</p>
                  </li>
                  {displayExtraTable(data.table, highlights)}
                </>
              );
            }
            return <li>{highlight(item, highlights)}</li>;
          })}
        </ol>
      </div>
    </>
  );
}
