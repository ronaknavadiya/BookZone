import React,{useState} from "react";
import { Link } from "react-router-dom";

const BookCard = (book) => {

  return (  
    <div className="col-md-3 col-sm-4">
      <Link to="/book" state={{book}}>
        <div className="card bookcard">
          <img
            src={book.book.volumeInfo.imageLinks.thumbnail}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h3>{book.book.volumeInfo.title}</h3>
            <h4>Author: {book.book.volumeInfo.authors}</h4>
            <h4>
              Ratings:{" "}
              {book.book.volumeInfo.averageRating === undefined
                ? "NA"
                : book.book.volumeInfo.averageRating}
            </h4>
            
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
