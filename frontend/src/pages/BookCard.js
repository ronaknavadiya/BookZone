import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled  from "styled-components";
import { useAppContext } from "../context/appContext";  
import axios from "axios";
const BookCard = (book) => {
  const { setUserIDandToken, user } = useAppContext();
  const [isLiked, setIsLiked] = useState(false)

const [heart,setheart]=useState(false);

useEffect(()=>{
  setheart(book.hearted=='hearted'?true:false);
},[])



const heartclick=async()=>{
  try{
   
  const res = await axios.put("http://localhost:5000/api/v1/user/likeBook", {
        userId:user._id,
        selfLink:book.book.selfLink
      });
     
      if( res.data=="Book has been Unliked..." ){
        console.log(false);
      setheart(false);
      }
      if(res.data=="Book has been liked..."){
        console.log(true);
        setheart(true);
      }
    }
    catch(e){
      console.log(e)
    }
 
}
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
            <Likediv>
              <Link to="">
            <FontAwesomeIcon className={heart ? "heart": "heart1"}  icon={faHeart} onClick={heartclick}/>
            </Link>
            </Likediv>
            
          </div>
        </div>
      </Link>
    </div>
  );
};

  const Likediv=styled.div`
  width:100%;
  height:100%;
  `;
export default BookCard;
