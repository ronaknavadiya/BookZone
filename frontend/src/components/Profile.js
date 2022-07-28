import axios from "axios";
import React, { useEffect, useState, useRef, Fragment } from "react";
import styled from "styled-components";
import HoverModal from "../components/HoverModal";
import image from "../images/loginpagebook.png";
import { useLocation } from "react-router-dom";
import BookCard from "../pages/BookCard";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "../context/appContext";
const Profile = () => {
  const location = useLocation();
  // console.log(location) ;
  const [recmbook, setrecmbook] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [frienduser, setfrienduser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalHeader, setModalHeader] = useState("Modal Header");
  const { user, followUnfollowUser } = useAppContext();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleFollowUnfollow = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/user/followUnfollow",
        {
          userId: user._id,
          friendUserId: location.state._id,
        }
      );
      toast(res.data);
      followUnfollowUser(location.state._id);
    } catch (error) {
      toast(error.response.data.message);
    }
  };

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
    const fetchData = async () => {
      await fetchuser();
      // console.log("fri..",frienduser);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchLikedBooks();
      // console.log("fri..",frienduser);
    };
    fetchData();
  }, [frienduser]);

  const fetchuser = async () => {
    let us = "";
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/frienduser",
        {
          userId: location.state._id,
        }
      );
      // const jsonuser=JSON.stringify
      // (res.data);
      // setfrienduser(jsonuser);
      console.log("data...", res.data);
      setfrienduser(res.data);
    } catch (e) {
      console.log(e);
    }
    // const k=[];
    //   console.log(frienduser)
    //     for( let i in us.likedBooks) {
    //       try{
    //       const res = await axios.get(
    //         `https://www.googleapis.com/books/v1/volumes?q=subject:${us.likedBooks[i]}`
    //       );
    //         k.push(res.data)

    //     setLikedBooks(k);
    //     console.log(likedBooks);
    //   } catch (error) {
    //     console.log("Error: ", error);
    //   }
    // }
  };

  const fetchLikedBooks = async () => {
    let k = [];
    console.log(frienduser);
    for (let i in frienduser.likedBooks) {
      console.log(frienduser.likedBooks[i]);
      let title = frienduser.likedBooks[i];
      try {
        const res = await axios.get(`${title}`);

        k.push(res.data);
      } catch (error) {
        console.log("Error: ", error);
      }
      setLikedBooks(k);
      console.log(k);
    }
    console.log(likedBooks);
    return (
      <UserProfileComp>
        <ToastContainer theme="dark" />
        {showModal && (
          <HoverModal
            className="hovermodal"
            showModal={showModal}
            handleClose={handleClose}
            handleShow={handleShow}
            modalHeader={modalHeader}
            modalData={modalData}
          />
        )}
        <div className="info-image-container col-md-12">
          <div className="col-md-1">
            <img
              src={location.state.profilePicture}
              alt="userimage"
              className="userImage"
            />
          </div>
          <div className="info-container col-md-8">
            <h2 className="username">{location.state.userName}</h2>
            <div className="user-info-details">
              <div className="liked-books">
                <h4>{location.state.likedBooks.length}</h4>
                <h5>Liked Books</h5>
              </div>
              <div className="followers" onClick={showFollowersModal}>
                <h4>{location.state.followers.length}</h4>
                <h5>Followers</h5>
              </div>

              <div className="followings" onClick={showFollowingsModal}>
                <h4>{location.state.following.length}</h4>
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

        <div className="books">
          <div className="row">
            <Title>
              <h2>Liked books</h2>
            </Title>
            {likedBooks.map((book, index) => {
              console.log(book);
              if (book.volumeInfo.imageLinks === undefined ? false : true) {
                return (
                  <Fragment key={index}>
                    <BookCard book={book} />
                  </Fragment>
                );
              }
            })}
          </div>
        </div>
      </UserProfileComp>
    );
  };
};

export default Profile;

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
const Title = styled.div`
  margin: 25px 0px;
  color: rgba(27, 79, 114);
  h2 {
    font-size: 22px;
  }
`;
