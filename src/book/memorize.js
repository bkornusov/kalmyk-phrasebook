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

function displayTable1() {
  return <></>;
}

function displayTable2(data) {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th></th>
          <th>Хальмг</th>
          <th>Русский</th>
          <th></th>
          <th>Хальмг</th>
          <th>Русский</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {renderPlayButton(row[0].audio)}
            <td>{row[0].kalmyk}</td>
            <td>{row[0].russian}</td>
            {renderPlayButton(row[1].audio)}
            <td>{row[1].kalmyk}</td>
            <td>{row[1].russian}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function numberTable(data) {
  return (
    <Table bordered>
      <tbody>
        {data.map((row) => (
          <tr>
            {row.map((entry) => (
              <>
                <td>{entry.number}</td>
                {renderPlayButton(entry.audio)}
                <td>{entry.kalmyk}</td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function horizontalTable(data) {
  return (
    <Table bordered>
      <tbody>
        {data.map((row) => (
          <tr>
            {row.map((entry) => (
              <>
                <td>{renderPlayButton(entry.audio)}</td>
                <td>
                  {entry.kalmyk}
                  {entry.russian}
                </td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function displayText(data) {
  return <pre>{data}</pre>;
}

export default function displayMemorize(data, type) {
  switch (type) {
    case "table":
      return displayTable1(data);
    case "table2":
      return displayTable2(data);
    case "numberTable":
      return numberTable(data);
    case "horizontalTable":
      return horizontalTable(data);
    case "list":
    case "text":
      return displayText(data);
    default:
      return;
  }
  // return <div className="memorize-body"></div>;
}