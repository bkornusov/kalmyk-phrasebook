import { Table } from "react-bootstrap";
import highlight from "./highlighter";

export default function memorize(data, type, duplicate = false, highlights) {
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
    if (fileName === "") {
      return <td></td>;
    }
    return (
      <td className="audio-column">
        <button className="play-button" onClick={() => playAudio(fileName)}>
          <img alt="play" className="play-button-icon" src="./media/play.png" />
        </button>
      </td>
    );
  }

  function displayTable1(data) {
    if (data[0].audio) {
      return (
        <Table bordered>
          <tbody>
            {data.map((row) => (
              <tr>
                {renderPlayButton(row.audio)}
                <td>{highlight(row.kalmyk, highlights)}</td>
                <td>{row.russian}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <Table bordered>
        <tbody>
          {data.map((row) => (
            <tr>
              {renderPlayButton(row.audio1)}
              <td>{highlight(row.kalmyk, highlights)}</td>
              {renderPlayButton(row.audio2)}
              <td>{highlight(row.russian, highlights)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
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
              <td>{highlight(row[0].kalmyk, highlights)}</td>
              <td>{row[0].russian}</td>
              {renderPlayButton(row[1].audio)}
              <td>{highlight(row[1].kalmyk, highlights)}</td>
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
                  {renderPlayButton(entry.audio)}
                  <td>{entry.kalmyk}</td>
                  <td>
                    <b>{entry.number}</b>
                  </td>
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
      <Table bordered className="horizontal">
        <tbody>
          {data.map((row) => (
            <tr>
              {row.map((entry) => (
                <>
                  <td>{renderPlayButton(entry.audio)}</td>
                  <td>
                    {highlight(entry.kalmyk, highlights)}
                    <br></br>
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

  function conjugationTable(data) {
    var header = data[0];
    var items = data.slice(1);
    return (
      <Table bordered className="conjugation">
        <thead>
          <tr
            style={{
              verticalAlign: "top",
            }}
          >
            {header.map((item) => (
              <>
                <td>{renderPlayButton(item.audio)}</td>
                <td>
                  <b>{highlight(item.data, highlights)}</b>
                </td>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr>
              {row.map((item) => (
                <>
                  <td>{renderPlayButton(item.audio)}</td>
                  <td>
                    {highlight(item.kalmyk, highlights)}
                    <br />
                    {item.russian}
                  </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  function simpleConjugation(data) {
    if (data[0].kalmyk1.includes("?")) {
      var header = data[0];
      var body = data.slice(1);
      return (
        <Table bordered>
          <thead>
            <tr>
              <th>{renderPlayButton(header.audio1)}</th>
              <th>
                <b>{header.kalmyk1}</b>
              </th>
              <th>
                <b>{renderPlayButton(header.audio2)}</b>
              </th>
              <th>
                <b>
                  {header.kalmyk2}
                  {header.russian}
                </b>
              </th>
            </tr>
          </thead>
          <tbody>
            {body.map((row) => (
              <tr>
                <td>{renderPlayButton(row.audio1)}</td>
                <td>{highlight(row.kalmyk1, highlights)}</td>
                <td>{renderPlayButton(row.audio2)}</td>
                <td>
                  {highlight(row.kalmyk2, highlights)} {row.russian}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <Table bordered>
        <tbody>
          {data.map((row) => (
            <tr>
              <td>{renderPlayButton(row.audio1)}</td>
              <td>{highlight(row.kalmyk1, highlights)}</td>
              <td>{renderPlayButton(row.audio2)}</td>
              <td>{highlight(row.kalmyk2, highlights)}</td>
              <td>{row.russian}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  function displayText(data) {
    return <pre>{highlight(data.toString(), highlights)}</pre>;
  }

  function displayChapter24(data) {
    return (
      <Table bordered className="horizontal">
        {data.map((section) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th colSpan={2}>{section.headers[0]}</th>
                <th></th>
                <th colSpan={2}>{section.headers[1]}</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((row) => (
                <tr>
                  {row.map((item) => (
                    <>
                      <td>{renderPlayButton(item.audio)}</td>
                      <td>{highlight(item.kalmyk, highlights)}</td>
                      <td>{item.russian}</td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        ))}
      </Table>
    );
  }

  function memorizeSwitch(data, type) {
    switch (type) {
      case "table1":
        return displayTable1(data);
      case "table2":
        return displayTable2(data);
      case "numberTable":
        return numberTable(data);
      case "horizontalTable":
        return horizontalTable(data);
      case "conjugation":
        return conjugationTable(data);
      case "simpleConjugation":
        return simpleConjugation(data);
      case "text":
        return displayText(data);
      case "chapter24":
        return displayChapter24(data);
      default:
        return;
    }
  }

  if (!data || data.length === 0) {
    return;
  }
  if (duplicate) {
    return <div className="memorize">{memorizeSwitch(data, type)}</div>;
  }

  return (
    <>
      <span>Тодлтн / Запомните</span>
      <div className="memorize">{memorizeSwitch(data, type)}</div>
    </>
  );

  // return <div className="memorize-body"></div>;
}
