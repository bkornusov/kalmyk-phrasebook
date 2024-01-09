import "./book.css";
import { Table } from "react-bootstrap";

function PageBase(pageData) {
  var page = pageData.pageData;

  function boldenSpeaker(line) {
    var splitLine = line.split(":");
    return (
      <td>
        <b>{splitLine[0]}:</b>
        {splitLine[1]}
      </td>
    );
  }

  function displayVocabulary() {
    var data = page.vocabulary;

    // if (data.length > 7) {
    //   data.splice(7, 0, { audio: "", kalmyk: "Хальмг", russian: "Русский" });
    // }

    // console.log(data);

    return data.map((row) => (
      <tr>
        {/* <td>{row.audio}</td> */}
        <td></td>
        <td>{row.kalmyk}</td>
        <td>{row.russian}</td>
      </tr>
    ));
  }

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
              <th>Русский</th>
            </tr>
          </thead>
          <tbody>
            {page.dialog.map((row) => (
              <tr>
                {/* <td>{row.audio}</td> */}
                <td></td>
                {boldenSpeaker(row.kalmyk)}
                {boldenSpeaker(row.russian)}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <span>Толь бичг / Словарь</span>
      <div className="vocabulary">
        <Table bordered>
          <thead>
            <tr>
              <th></th>
              <th>Хальмг</th>
              <th>Русский</th>
            </tr>
          </thead>
          <tbody>{displayVocabulary()}</tbody>
        </Table>
      </div>
      <div className="memorize"></div>
    </div>
  );
}

export default PageBase;
