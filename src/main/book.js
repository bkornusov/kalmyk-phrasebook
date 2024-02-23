import React, { useState } from "react";
import PageBase from "../book/page-base";
import { Button } from "react-bootstrap";
import Slide from "../book/slide";

export default function Book(bookDataRaw) {
  const [pageNumber, setPageNumber] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [rightSwipe, setRightSwipe] = useState(false);
  const [leftSwipe, setLeftSwipe] = useState(false);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      pageForward();
    }
    if (isRightSwipe) {
      pageBack();
    }
  };

  const bookData = bookDataRaw.bookData;

  function handleSetPage(newPage) {
    newPage < 1
      ? setPageNumber(1)
      : newPage > bookData.length
      ? setPageNumber(pageNumber)
      : setPageNumber(newPage);
  }

  async function pageBack() {
    if (pageNumber <= 1) {
      setPageNumber(1);
    } else {
      setLeftSwipe(true);
      setTimeout(() => {
        setPageNumber(parseInt(pageNumber) - 1);
        setTimeout(() => {
          setLeftSwipe(false);
        }, 100);
      }, 400);
    }
  }

  async function pageForward() {
    if (pageNumber >= bookData.length) {
      setPageNumber(bookData.length);
    } else {
      setRightSwipe(true);
      setTimeout(() => {
        setPageNumber(parseInt(pageNumber) + 1);
        setTimeout(() => {
          setRightSwipe(false);
        }, 100);
      }, 400);
    }
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="book-body"
    >
      <div
        className={
          rightSwipe
            ? "swipeRight"
            : leftSwipe
            ? "swipeLeft"
            : "animation-wrapper"
        }
      >
        <PageBase pageData={bookData[pageNumber - 1]} />
      </div>

      <div className="controls">
        <Button onClick={pageBack} k>
          &lt;
        </Button>
        <input
          style={{ width: "5%" }}
          type="text"
          value={pageNumber}
          onChange={(e) => handleSetPage(e.target.value)}
        />
        <span style={{ color: "white" }}> / {bookData.length}</span>
        <Button onClick={pageForward}>&gt;</Button>
      </div>
    </div>
  );
}
