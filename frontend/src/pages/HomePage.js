import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import "../css/Home.css";
import BookCard from "./BookCard";
const HomePage = () => {
  const { setUserIDandToken, user } = useAppContext();
  const navigate = useNavigate();
  const searching=async(e)=>{
   
    if(searchcat.current.value=="author"){
      try {
      
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${search.current.value}`
        );
        console.log(res.data.items);
        setrecmbook(res.data.items);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    if(searchcat.current.value=="bookname"){
      try {
       
     
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${search.current.value}`
        );
        console.log("data..",res.data.items);
        setrecmbook(res.data.items);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    search.current.value="";
  }
  const search = useRef();
  const searchcat = useRef();
  const [recmbook, setrecmbook] = useState([]);

  const fetchrecmbook = async () => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=subject:fiction"
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
              <input type="text" className="form-control"  ref={search} />
              <div className="input-group-append">
                <button className="btn searchbtn " type="button" onClick={searching}>
                  Search
                </button>
              </div>                
              </div>
          </div>
          <div className="row align-items-center justify-content-center catdiv">
            <H4div>
           <h4 >Search by</h4>
           </H4div>
              <select class="form-select cat  " aria-label="Disabled select example" ref={searchcat} >          
              <Option value="bookname" selected>book</Option>
    <Option value="author">author</Option>
    </select>
              </div>
        </div>
      </div>
      <div className="books">
        <div className="row">
          {recmbook.map((book,index) => {
            return (
              <Fragment key={index}>
                <BookCard  book={book}/>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

const H4div=styled.div`
justify-content: center;
align-items: center;
height: 100%;
margin: 0px 20px;
h4{
  text-align: center;
}
`;
const Option=styled.option`
	-webkit-appearance: none;
	-moz-appearance: none;
	-ms-appearance: none;
	 -o-appearance: none;
		appearance: none;
  color: rgba(27, 79, 114);

&:hover{
  color: blue;

}
`;
export default HomePage;
