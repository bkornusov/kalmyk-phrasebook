import "./main.css";
import Book from "./book";
import phraseBookPages from "../data/phrasebook-pages";
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
  return (
    <div className="main-body">
      <div className="header">
        <span className="main-title">Хальмг келән өрк-бүлдән сурий</span>
      </div>
      <Book bookData={phraseBookPages} />
      {/* <div className="footer">
        <span>
          Гедеева Дарина Бадмаевна, Корнусова Бося Эрендженовна{" "}
          <b>Хальмг келән өрк-бүлдән дасий</b> (Изучаем калмыцкий язык в семье).
          Разговорник для изучения калмыцкого языка в семье. 2023 – 23 с.
        </span>
      </div> */}
    </div>
  );
}
export default Main;
