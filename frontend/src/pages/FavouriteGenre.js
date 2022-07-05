import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import BookContainer from "../components/BookContainer";
import bookList from "../data/genre";
import { useAppContext } from "../context/appContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FavouriteGenre = () => {
  const { user } = useAppContext();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const navigate = useNavigate();

  const handleClick = (genre) => {
    if (selectedGenre.includes(genre)) {
      let newArray = selectedGenre.filter((val) => val !== genre);
      setSelectedGenre(newArray);
    } else {
      setSelectedGenre([...selectedGenre, genre]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("selectedGenre: ", selectedGenre);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/favGenre",
        {
          userId: user._id,
          genre: selectedGenre,
        }
      );
      toast("Fav genre has been saved...");
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
      // if (error.response.data.message) {
      //   toast(error.response.data.message);
      // }
    }
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
        <ToastContainer theme="dark" />
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
