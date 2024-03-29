import React, { useState } from "react";
import PageBase from "../book/page-base";
import { Button } from "react-bootstrap";

export default function Book(bookDataRaw) {
  const [pageNumber, setPageNumber] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [rightSwipe, setRightSwipe] = useState(false);
  const [leftSwipe, setLeftSwipe] = useState(false);
  const [showContents, setShowContents] = useState(false);

  const bookData = bookDataRaw.bookData;

  const minSwipeDistance = 130;

  function displayContents() {
    setShowContents(!showContents);
  }

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

  function handleSetPage(newPage) {
    if (newPage < 1) {
      setPageNumber(1);
      if (newPage > bookData.length) {
        setPageNumber(pageNumber);
      }
    } else {
      if (newPage === pageNumber) {
      } else if (newPage < pageNumber) {
        setLeftSwipe(true);
        setTimeout(() => {
          setPageNumber(newPage);
          setLeftSwipe(false);
        }, 325);
      } else {
        setRightSwipe(true);
        setTimeout(() => {
          setPageNumber(newPage);
          setRightSwipe(false);
        }, 325);
      }
    }
    setShowContents(false);
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
        }, 50);
      }, 300);
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
        }, 50);
      }, 300);
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
        className="show-content-button"
        role="button"
        onClick={displayContents}
      >
        <img alt="Список глав" src="hamburger.png"></img>
      </div>
      <div className={showContents ? "contents" : "contents hidden"}>
        <ul className="list-group">
          {bookData.map((chapter) => (
            <a
              onClick={() => {
                console.log("Jumping to chapter: ", chapter.pageNumber);
                handleSetPage(chapter.pageNumber);
              }}
              className="list-group-item list-group-item-action list-group-item-primary"
            >
              {chapter.title}
            </a>
          ))}
        </ul>
      </div>
      <div className="book-display">
        <div className="page-indicator">
          <div className="page-number">
            <span
            // contenteditable="true"
            // onInput={(e) => handleSetPage(e.target.value)}
            >
              {pageNumber}
            </span>
            <br />
            <span className="page-indicator-separator">_</span>
            <br />
            <span className="page-indicator-total">{bookData.length}</span>
          </div>
        </div>
        <div
          className="navigation-button mirror"
          onClick={pageBack}
          role="button"
        >
          <img src="angle-bracket.png" alt="Предыдущая Страница"></img>
        </div>
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
        <div className="navigation-button" onClick={pageForward} role="button">
          <img src="angle-bracket.png" alt="Следующая Страница"></img>
        </div>
      </div>

      {/* Saving this for debugging purposes
      <div className="controls">
        <Button onClick={pageBack} k>
          &lt;
        </Button>
        <input
          style={{ width: "40px" }}
          type="text"
          value={pageNumber}
          onChange={(e) => handleSetPage(e.target.value)}
        />
        <span style={{ color: "white" }}> / {bookData.length}</span>
        <Button onClick={pageForward}>&gt;</Button>
      </div> */}
    </div>
  );
}
