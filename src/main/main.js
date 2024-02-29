import "./main.css";
import Book from "./book";
import phraseBookPages from "../data/phrasebook-pages";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
  const [showContents, setShowContents] = useState(false);

  function displayContents() {
    setShowContents(!showContents);
  }

  return (
    <div className="main-body">
      <div className="header">
        <div
          className="show-content-button"
          role="button"
          onClick={displayContents}
        >
          <img alt="Список глав" src="hamburger.png"></img>
        </div>
        <div className={showContents ? "contents" : "contents hidden"}>
          <ul className="list-group">
            {phraseBookPages.map((chapter) => (
              <a
                href="#"
                className="list-group-item list-group-item-action list-group-item-primary"
              >
                {chapter.title}
              </a>
            ))}
          </ul>
        </div>
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
