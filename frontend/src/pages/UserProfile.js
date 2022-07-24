import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image from "../images/loginpagebook.png";

const UserProfile = () => {
  const [likedBooks, setLikedBooks] = useState([]);
  useEffect(() => {
    fetchLikedBooks();
  }, []);

  const fetchLikedBooks = async () => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=subject:fiction"
      );
      console.log(res.data.items);
      setLikedBooks(res.data.items);
    } catch (error) {
      console.log("Error: ",error);
    }
    
  };
  return (
    <UserProfileComp>
      {/* <div className="container emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <img src={image} alt="userImage" className="userImage" />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h2>User name</h2>
                <h5>Web devs</h5>
              </div>
            </div>
          </div>
        </form>
      </div> */}

      <div className="info-image-container">
        <div>
          <img
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
            alt="userimage"
            className="userImage"
          />
        </div>
        <div className="info-container">
          <h2>Ronak Navadiya</h2>
          <div className="user-info-details">
            <h5>40 Liked Books</h5>
            <h5>40 Followers</h5>
            <h5>40 Followings</h5>
          </div>
        </div>
      </div>
      <h2>Liked Books..</h2>
      <div className="books-galary">
        {likedBooks.map((book)=>{
          return (
            <div>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
              <h4>{book.volumeInfo.title}</h4>
            </div>
          );
        })}
        
      </div>
    </UserProfileComp>
  );
};

export default UserProfile;

const UserProfileComp = styled.div`
  .info-image-container {
    display: flex;
    justify-content: space-around;
    margin: 18px 0px;
    border-bottom: 1px solid gray;
  }
  .userImage {
    width: 200px;
    height: 200px;
    border-radius: 80px;
  }
  .info-container {
    width: 50rem;
  }
  .user-info-details {
    display: flex;
    justify-content: space-between;
    width: 108%;
  }
  .books-galary {
    img {
      width: 200px;
      height: 200px;
    }
  }
`;
