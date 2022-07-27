import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppContext } from "../context/appContext";
import "../css/Home.css";
import BookCard from "./BookCard";
const HomePage = () => {
  const { setUserIDandToken, user } = useAppContext();
  const navigate = useNavigate();
  console.log("Genre :", JSON.parse(user)["genre"][1]);
  const search = useRef();
  const [recmbook, setrecmbook] = useState([]);

  const fetchrecmbook = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:fiction`
      );
      setrecmbook(res.data.items);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      navigate("/login");
    }
    fetchrecmbook();
  }, [user, navigate]);

  return (
    <>
      <div className="search">
        <div className="row align-items-center justify-content-center">
          <div className="col-4">
            <div className="input-group">
              <input type="text" className="form-control" ref={search} />
              <div className="input-group-append">
                <button className="btn searchbtn " type="button">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="books">
        <div className="row">
          {recmbook.map((book, index) => {
            return (
              <Fragment key={index}>
                <BookCard book={book} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
