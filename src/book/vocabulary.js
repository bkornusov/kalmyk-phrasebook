import { Table } from "react-bootstrap";

export default function vocabularyPage(data) {
  return (
    <div className="page-base">
      <span className="page-title">Толь бичг / Словарь</span>
      <br />
      <br />
      <Table bordered>
        <tr>
          <th>Хальмг</th>
          <th>English</th>
        </tr>
        {data.map((row) => (
          <tr>
            <td>{row.kalmyk}</td>
            <td>{row.russian}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
