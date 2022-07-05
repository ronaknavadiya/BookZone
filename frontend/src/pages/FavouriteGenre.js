import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import BookContainer from "../components/BookContainer";
import bookList from "../data/genre";
import Background from "../images/background vector/endless-constellation.svg";

const FavouriteGenre = () => {
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleClick = (genre) => {
    if (selectedGenre.includes(genre)) {
      let newArray = selectedGenre.filter((val) => val !== genre);
      setSelectedGenre(newArray);
    } else {
      setSelectedGenre([...selectedGenre, genre]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selectedGenre: ", selectedGenre);
  };

  return (
    <>
      <FavouriteGenreComp>
        <div className="title-div">
          <h2 className="title-text">Please select your favourite genre</h2>

          <button
            type="submit"
            value="submit"
            className="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="genre-list">
          {bookList.map((item, index) => {
            return (
              <div key={index} onClick={() => handleClick(item.genre)}>
                <BookContainer
                  book={item}
                  key={index}
                  isSelected={selectedGenre.includes(item.genre) ? true : false}
                ></BookContainer>
              </div>
            );
          })}
        </div>
      </FavouriteGenreComp>
    </>
  );
};

const FavouriteGenreComp = styled.div`
overflow-x: hidden;
  .title-div {
    text-align: center;
    margin: 2rem;
    margin-bottom: 3rem;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    .title-text {
      color: var(--blue);
      font-size: 3rem;
      font-weight: 700;
      font-variant-caps: all-small-caps;
    }
    .submit {
      border-radius: 4px;
      background: var(--blue);
      padding: 10px 22px;
      color: #fff;
      border: none;
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-decoration: none;
      font-size: 1.5rem;
      &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
        border: 1px solid var(--blue);
      }
    }
  }

  .genre-list {
    display: flex;
    padding: 32px 16px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;

    .book {
      display: flex;
      margin: 16px;
      padding: 32px;
      border-radius: 32px;
      flex: 1;

      /* background-color: red; */
      .book-info {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        .genre-title {
          margin: 16px 0;
          font-weight: 900;
          font-size: 32px;
        }
      }
    }
  }
`;

export default FavouriteGenre;
