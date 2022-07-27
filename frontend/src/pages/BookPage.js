import React from "react";
import { useLocation } from "react-router-dom";
import "../css/Home.css";

const BookPage = () => {
  const location = useLocation();
  const { book } = location.state;
  return (
    <>
      <div className="books">
        <div className="row">
          <div className="col-sm-5 bookimg">
            <img
              src={book.book.volumeInfo.imageLinks.thumbnail}
              className="card-img-top "
              alt="..."
            />
          </div>
          <div className="col-sm-7">
            <div className="description">
              <p className="bookname">{book.book.volumeInfo.title}</p>
              <h2>
                by &nbsp;&nbsp;
                <span className="bookauthor">
                  {book.book.volumeInfo.authors}
                </span>
              </h2>
              <br />
              <br />
              <div className="publish">
                <div className="row">
                  <div className="col-3">Publisher</div>
                  <div className="col-9">
                    : {book.book.volumeInfo.publisher}
                  </div>
                  <div className="col-3">Published Date</div>
                  <div className="col-9">
                    : {book.book.volumeInfo.publishedDate}
                  </div>
                  {book.book.volumeInfo.averageRating === undefined ? (
                    ""
                  ) : (
                    <>
                      <div className="col-3">Average Rating</div>
                      <div className="col-9">
                        : {book.book.volumeInfo.averageRating} / 5
                      </div>
                    </>
                  )}
                  {book.book.volumeInfo.pageCount === undefined ? (
                    ""
                  ) : (
                    <>
                      <div className="col-3">Page Count</div>
                      <div className="col-9">
                        : {book.book.volumeInfo.pageCount}
                      </div>
                    </>
                  )}
                  <div className="col-3">Category</div>
                  <div className="col-9">
                    : {book.book.volumeInfo.categories}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row publish m-4 mt-5">
          <div className="col-sm-2">Description</div>
          <div className="col-sm-10">: {book.book.volumeInfo.description}</div>
        </div>
      </div>
    </>
  );
};

export default BookPage;
