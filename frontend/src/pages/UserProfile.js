import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HoverModal from "../components/HoverModal";
import { useAppContext } from "../context/appContext";
import image from "../images/loginpagebook.png";

const UserProfile = () => {
  const [likedBooks, setLikedBooks] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalHeader, setModalHeader] = useState("Modal Header");
  const { user } = useAppContext();

  const handleFollowUnfollow = () => {};
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const showFollowersModal = () => {
    handleShow();
    setModalData({});
    setModalHeader("Followers");
  };
  const showFollowingsModal = () => {
    handleShow();
    setModalData({});
    setModalHeader("Followings");
  };

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
      console.log("Error: ", error);
    }
  };
  return (
    <UserProfileComp>
      {showModal && (
        <HoverModal
          className="hovermodal"
          showModal={showModal}
          handleClose={handleClose}
          handleShow={handleShow}
          modalHeader={modalHeader}
          modalData={modalData}
          user={user}
        />
      )}
      <div className="info-image-container col-md-12">
        <div className="col-md-1">
          <img
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
            alt="userimage"
            className="userImage"
          />
        </div>
        <div className="info-container col-md-8">
          <h2 className="username">Ronak Navadiya</h2>
          <div className="user-info-details">
            <div className="liked-books">
              <h4>40</h4>
              <h5>Liked Books</h5>
            </div>
            <div className="followers" onClick={showFollowersModal}>
              <h4>40</h4>
              <h5>Followers</h5>
            </div>

            <div className="followings" onClick={showFollowingsModal}>
              <h4>40</h4>
              <h5>Followings</h5>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFollowUnfollow}
            className="follow-unfollow-btn"
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      <div className="border"></div>
      <h2 style={{ marginTop: "2rem" }}>Liked Books..</h2>
      <div className="books-galary">
        {likedBooks.map((book, index) => {
          return (
            <div key={index}>
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
  }
  .border {
    margin-top: -2px;
    border-bottom: 1px solid #1f1209 !important;
    box-shadow: 0 20px 20px -20px #333;
  }
  .userImage {
    width: 200px;
    height: 200px;
    border-radius: 80px;
  }
  .info-container {
    /* width: 50rem; */
    align-self: center;
    width: 50%;
    /* justify-content: center; */
    text-align: -webkit-center;
  }
  .user-info-details {
    display: flex;
    justify-content: space-between;
    width: 108%;
  }
  .books-galary {
    margin-top: 2rem;
    img {
      width: 200px;
      height: 200px;
    }
  }
  .username {
    justify-self: center;
    width: fit-content;
    margin-top: -5rem;
    margin-bottom: 2rem;
    text-align: -webkit-center;
  }
  .follow-unfollow-btn {
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
    margin-top: 2rem;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #010606;
      border: 1px solid var(--blue);
    }
  }

  .hovermodal {
    position: absolute;
    top: 0;
  }
`;
