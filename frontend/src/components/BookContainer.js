import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const BookContainer = ({ book, isSelected }) => {
  const { genre, image } = book;
  console.log("image:", image);
  return (
    <BookDiv>
      <div
        className="book"
        style={{
          backgroundImage: `url(${image})`,
          border: `${isSelected ? "3px solid black" : ""}`,
        }}
      >
        <div className="book-info">
          <h1 className="genre-title">{genre}</h1>
        </div>
      </div>
    </BookDiv>
  );
};

export default BookContainer;

const BookDiv = styled.div`
  transition: 0.5s;
  width: 28rem;
  padding: 1.5rem;

  .book {
    display: flex;
    margin: 16px;
    padding: 32px;
    border-radius: 32px;
    flex: 1;
    width: 100%;
    background-size: auto 200px;
    background-position: center;
    /* border: 2px solid red; */
    &:hover {
      /* box-shadow: 0 0 3px black; */
      box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
      margin-top: -5px !important;
    }

    .book-info {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      .genre-title {
        margin: 16px 0;
        font-weight: 900;
        font-size: 32px;
        color: white;
        align-self: center;
      }
    }
  }
`;
