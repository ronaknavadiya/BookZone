import React, { useEffect, useState, useRef, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import "../css/Home.css";
import BookCard from "./BookCard";
import UserProfile from "../components/ProfileComp";
const HomePage = () => {
  const { setUserIDandToken, user } = useAppContext();
  // console.log("my user", user);
  const navigate = useNavigate();
  // console.log("Genre :", JSON.parse(user)["genre"][1]);
  const search = useRef();
  const searchcat = useRef();
  const [likedBooks, setLikedBooks] = useState([]);
  const [frienduser, setfrienduser] = useState({});
  const [recmbook, setrecmbook] = useState([]);
  const [recmuser, setrecuser] = useState([]);
  const [usertoggle, setusertoggle] = useState(false);
  const [usererror,setusererror]=useState("");
  const userprofile=(e,eachuser)=>{
    // navigate('/userprofile',eachuser);
    console.log("clicked");
  }
  const searching=async(e)=>{
    setusererror("");
    if (searchcat.current.value == "author") {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${search.current.value}`
        );

        setrecmbook(res.data.items);
        console.log(recmbook);
        setusertoggle(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    if (searchcat.current.value == "bookname") {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${search.current.value}`
        );

        res.data.items === undefined
          ? setrecmbook([])
          : setrecmbook(res.data.items);

        console.log(recmbook);
        setusertoggle(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    if (searchcat.current.value == "user") {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/v1/user/usersearch`,
          {
            username: search.current.value,
          }
        );
        // navigate.push("/userprofile");
        // setrecmbook(res.data.items);
        if (res.data.error) {
          setusererror(res.data.error);
        } else {
          setrecuser(res.data);
        }
        console.log(usererror);
        setusertoggle(true);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    search.current.value = "";
  };

  const fetchrecmbook = async () => {
    const jsonuser = user.genre;
    console.log(jsonuser);
    const genresize = jsonuser.length;
    // console.log(genresize);
    let reloadedvalue = 0;
    let nogenre = false;
    let k = [];
    if (genresize >= 5) {
      reloadedvalue = 4;
    } else if (genresize == 4) {
      reloadedvalue = 5;
    } else if (genresize == 3) {
      reloadedvalue = 7;
    } else if (genresize == 2) {
      reloadedvalue = 10;
    } else if (genresize == 1) {
      reloadedvalue = 20;
    } else {
      reloadedvalue = 20;
      nogenre = true;
    }
    if (!nogenre) {
      for (let i in jsonuser) {
        try {
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${jsonuser[i]}&startIndex=0&maxResults=${reloadedvalue}`
          );

          // Object.assign({...k,res.data.items});
          console.log(res.data.items.length);
          for (let j in res.data.items) {
            // if(count==0){
            //   break;
            // }
            // count--;
            k.push(res.data.items[j]);
            // console.log(res.data.items[j]);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      }
      setrecmbook(k);
    } else {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:fiction`
        );
        setrecmbook(res.data.items);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  useEffect(() => {
    fetchrecmbook();
  }, []);
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);
  useEffect( () => {
    const fetchData =   async()=>{
        await fetchuser(); 
        // console.log("fri..",frienduser);
      }
      fetchData()
    }, []);
  
    useEffect(()=>{
      
      const fetchData =   async()=>{
        await fetchLikedBooks(); 
        // console.log("fri..",frienduser);
      }
      fetchData()
    },[frienduser])
  
  const fetchuser=async ()=>{
    let us="";
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/frienduser",{
          userId:user._id
        }
      );
      // const jsonuser=JSON.stringify
      // (res.data);
    // setfrienduser(jsonuser);
    console.log("data...",res.data);
    setfrienduser(res.data)
    
       } catch(e){
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
    }
      
    const fetchLikedBooks = async () => {
     let k=[];
     console.log(frienduser);
        for( let i in frienduser.likedBooks) {
          console.log(frienduser.likedBooks[i]);
          let title = frienduser.likedBooks[i];
          try{
          const res = await axios.get(
            `${title}`
          );
    
            k.push(res.data);
      } catch (error) {
        console.log("Error: ", error);
      }
      
    }
    setLikedBooks(k);
      console.log(k);
    };
    const verifylikebook1=(book)=>{
      const mylink = frienduser.likedBooks.filter((myBook)=> myBook === book.selfLink)
      console.log(mylink);
      if(mylink.length>0){
        return true;
      }
      return false;
    }
  return (
    <>
      <div className="search">
        <div className="row align-items-center justify-content-center">
          <div className="col-4">
            <div className="input-group">
              <input type="text" className="form-control" ref={search} />
              <div className="input-group-append">
                <button
                  className="btn searchbtn "
                  type="button"
                  onClick={searching}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center catdiv">
            <H4div>
              <h4>Search by</h4>
            </H4div>
            <select
              className="form-select cat  "
              aria-label="Disabled select example"
              ref={searchcat}
              defaultValue={"bookname"}
            >
              <Option value="bookname" selected>
                book
              </Option>
              <Option value="author">author</Option>
              <Option value="user">user</Option>
            </select>
          </div>
        </div>
      </div>
      {!usertoggle && (
        <div className="books">
          <div className="row">
            <Title>
              <h2>Book suggested by genres you selected</h2>
            </Title>
            {recmbook.length > 0 ? (
              recmbook.map((book, index) => {
                if (book.volumeInfo.imageLinks === undefined ? false : true) {
                  const bool=verifylikebook1(book);
                  return (
                    <Fragment key={index}>
                      <BookCard book={book} hearted={bool?'hearted':'unhearted'} user={user} />
                    </Fragment>
                  );
                }
              })
            ) : (
              <h1>"No Book Found !!"</h1>
            )}
          </div>
        </div>
      )}
      {!usertoggle && (
        <div className="books">
          <div className="row">
            <Title>
              <h2>Book suggested by book you liked</h2>
            </Title>
            {recmbook.length > 0 ? (
              recmbook.map((book, index) => {
                if (book.volumeInfo.imageLinks === undefined ? false : true) {
                  const bool=verifylikebook1(book);
                  return (
                    <Fragment key={index}>
                      <BookCard book={book}  hearted={bool?'hearted':'unhearted'}user={user} />
                    </Fragment>
                  );
                }
              })
            ) : (
              <h1>"No Book Found !!"</h1>
            )}
          </div>
        </div>
      )}
      {!usertoggle && (
        <div className="books">
          <div className="row">
            <Title>
              <h2>Book suggested by people you follow</h2>
            </Title>
            {recmbook.length > 0 ? (
              recmbook.map((book, index) => {
                if (book.volumeInfo.imageLinks === undefined ? false : true) {
                  const bool=verifylikebook1(book);
                  return (
                    <Fragment key={index}>
                      <BookCard book={book} hearted={bool?'hearted':'unhearted'} />
                    </Fragment>
                  );
                }
              })
            ) : (
              <h1>"No Book Found !!"</h1>
            )}
          </div>
        </div>
      )}
      {usertoggle && recmuser.length > 0 && usererror.length == 0 ? (
        <div>
          {recmuser.map((eachuser, index) => {
            return (
              <UserProfile
                key={index}
                eachuser={eachuser}
                onClick={userprofile}
              ></UserProfile>
            );
          })}
        </div>
      ) : (
        <Errorwrapper>
          <h2>{usererror}</h2>
        </Errorwrapper>
      )}
    </>
  );
};

const H4div = styled.div`
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0px 20px;
  h4 {
    text-align: center;
  }
`;
const Option = styled.option`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  color: rgba(27, 79, 114);

  &:hover {
    color: blue;
  }
`;
const Title = styled.div`
  margin: 25px 0px;
  color: rgba(27, 79, 114);
  h2 {
    font-size: 22px;
  }
`;
const Errorwrapper = styled.div`
  width: 100%;
  h2 {
    text-align: center;
    color: rgba(27, 79, 114);
  }
`;
export default HomePage;
