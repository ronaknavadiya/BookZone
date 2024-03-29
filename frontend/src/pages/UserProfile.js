import axios from "axios";
import React, { useEffect, useState, Fragment, useRef } from "react";
import styled from "styled-components";
import HoverModal from "../components/HoverModal";
import { useAppContext } from "../context/appContext";
import image from "../images/loginpagebook.png";
import Comment from "../components/Comment";
import BookCard from "./BookCard";
const UserProfile = () => {
  const { setUserIDandToken, user } = useAppContext();
  const [likedBooks, setLikedBooks] = useState([]);
  const [frienduser, setfrienduser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalHeader, setModalHeader] = useState("Modal Header");
  const bookNameInput = useRef();
  const commentInout = useRef();
  const [latestUser, setLatestUser] = useState();

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
          userId: user._id,
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
    }
    setLikedBooks(k);
    console.log(k);
  };

  const postFeedback = async () => {
    const comObj = {
      comment: commentInout.current.value,
      book: bookNameInput.current.value,
      userId: user._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/feedback",
        comObj
      );
      console.log("res..", res.data);
      setLatestUser(res.data);
      commentInout.current.value = "";
      bookNameInput.current.value = "";
    } catch (error) {
      console.log("Error:", error);
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
          <h2 className="username">{user.userName}</h2>
          <div className="user-info-details">
            <div className="liked-books">
              <h4>{likedBooks.length}</h4>
              <h5>Liked Books</h5>
            </div>
            <div className="followers" onClick={showFollowersModal}>
              <h4>{user.followers.length}</h4>
              <h5>Followers</h5>
            </div>

            <div className="followings" onClick={showFollowingsModal}>
              <h4>{user.following.length}</h4>
              <h5>Followings</h5>
            </div>
          </div>

          {/* <button
            type="button"
            onClick={handleFollowUnfollow}
            className="follow-unfollow-btn"
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button> */}
        </div>
      </div>
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
                  <BookCard book={book} hearted={"hearted"} />
                </Fragment>
              );
            }
          })}
        </div>
        <div className="row">
          <Title>
            <h2>Feedbacks</h2>
          </Title>
          <div className="col-8">
            <div className="input-group">
              <h3 className=".mytext">Book:</h3>
              <input type="text" className="form-control" ref={bookNameInput} />
              <h3 className=".mytext">Comment:</h3>
              <input type="text" className="form-control" ref={commentInout} />
              <div className="input-group-append">
                <button
                  className="btn searchbtn "
                  type="button"
                  onClick={() => postFeedback()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {latestUser
          ? latestUser.feedbacks.map((comObj, index) => {
              return <Comment comObj={comObj} key={index} user={user} />;
            })
          : user.feedbacks?.map((comObj, index) => {
              return <Comment comObj={comObj} key={index} user={user} />;
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
  .books {
    .row {
      h3 {
        margin: 1rem;
      }
      input {
        margin-right: 1rem;
        font-size: 2rem;
      }
    }
  }
`;
const Title = styled.div`
  margin: 25px 0px;
  color: rgba(27, 79, 114);
  h2 {
    font-size: 22px;
  }
`;
