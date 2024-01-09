import React, { useState } from "react";
import PageBase from "../book/page-base";

export default function Book(bookDataRaw) {
  const [pageNumber, setPageNumber] = useState(1);

  const bookData = bookDataRaw.bookData;

  function handleSetPage(newPage) {
    pageNumber < 1
      ? setPageNumber(1)
      : pageNumber > bookData.length
      ? setPageNumber(bookData.length)
      : setPageNumber(newPage);
  }

  function pageBack() {
    pageNumber <= 1 ? setPageNumber(1) : setPageNumber(pageNumber - 1);
  }

  function pageForward() {
    pageNumber >= bookData.length
      ? setPageNumber(bookData.length)
      : setPageNumber(pageNumber + 1);
  }

  return (
    <div className="book-body">
      <PageBase pageData={bookData[pageNumber - 1]} />
      <div className="controls">
        <button onClick={pageBack} k>
          &lt;
        </button>
        <input
          style={{ width: "5%" }}
          type="text"
          value={pageNumber}
          onChange={(e) => handleSetPage(e.target.value)}
        />
        <span> / {bookData.length}</span>
        <button onClick={pageForward}>&gt;</button>
      </div>
    </div>
  );
}
