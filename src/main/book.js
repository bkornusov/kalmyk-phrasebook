import React, { useState } from "react";
import PageBase from "../book/page-base";

export default function Book(bookData) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="book-body">
      <PageBase />
    </div>
  );
}
