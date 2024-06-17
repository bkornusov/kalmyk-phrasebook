import "./book.css";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import vocabularyPage from "./vocabulary";
import displayMemorize from "./memorize";
import displayExtras from "./extras";
import highlight from "./highlighter";

function PageBase(pageData) {
  var page = pageData.pageData;
  var audio_;

  useEffect(() => {
    playAudio();
  }, []);

  if (page === undefined) {
    return <div className="page-base">Error</div>;
  }

  async function playAudio(location) {
    if (audio_) audio_.pause();
    audio_ = new Audio("./media/" + location);
    var audioPromise = audio_.play();
    if (audioPromise !== undefined) {
      audioPromise
        .then(function () {})
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function boldenSpeaker(line) {
    var splitLine = line.split(":");
    return (
      <td>
        <b>{splitLine[0]}: </b>
        {highlight(splitLine.slice(1).join(":"), page.highlights.dialog)}
      </td>
    );
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

  function displayExtraMemorizeTable(data) {
    if (!data || data.length === 0) {
      return;
    }
    return displayMemorize(data, "table1", true, page.highlights.memorize);
  }

  function displayVocabulary() {
    var data = page.vocabulary;

    if (data.length > 5) {
      const mid = Math.ceil(data.length / 2);
      const column1 = data.slice(0, mid);
      const column2 = data.slice(mid);
      if (data.length % 2 === 1) {
        column2.push({ audio: "", kalmyk: "", russian: "" });
      }
      return (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Хальмг</th>
              <th>English</th>
              <th></th>
              <th>Хальмг</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            {column1.map((col1row, index) => (
              <tr>
                {renderPlayButton(col1row.audio)}
                <td>{col1row.kalmyk}</td>
                <td>{col1row.russian}</td>
                {renderPlayButton(column2[index].audio)}
                <td>{column2[index].kalmyk}</td>
                <td>{column2[index].russian}</td>
              </tr>
            ))}
          </tbody>
        </>
      );
    }

    return (
      <>
        <thead>
          <tr>
            <th></th>
            <th>Хальмг</th>
            <th>English</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {renderPlayButton(row.audio)}
              <td>{row.kalmyk}</td>
              <td>{row.russian}</td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  if (page.chapter === "vocabulary") {
    return vocabularyPage(page.items);
  } else {
    return (
      <div className="page-base">
        <span className="page-title">{page.title}</span>
        <br />
        <br />
        <div className="dialog">
          <Table bordered>
            <thead>
              <tr>
                <th></th>
                <th>Хальмг</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {page.dialog.map((row) => (
                <tr>
                  {renderPlayButton(row.audio)}
                  {boldenSpeaker(row.kalmyk)}
                  {boldenSpeaker(row.russian)}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <span>Толь бичг / Vocabulary</span>
        <div className="vocabulary">
          <Table className="dictionary" bordered>
            {displayVocabulary()}
          </Table>
        </div>
        {displayMemorize(
          page.memorize,
          page.memorizeType,
          false,
          page.highlights.memorize
        )}
        {displayExtraMemorizeTable(page.memorizeExtraTable)}
        {displayExtras(page.extras, page.highlights.extras)}
      </div>
    );
  }
}

export default PageBase;
