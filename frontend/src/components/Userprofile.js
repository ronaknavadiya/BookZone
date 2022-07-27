import React,{useState} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
function Userprofile({eachuser}) {
  const navigate=useNavigate();
  console.log(eachuser.profilePicture);
    const [isFollowed, setIsFollowed] = useState(false);
    const handleFollowUnfollow = () => {};
    const userprofile=(e)=>{
      
    console.log(eachuser);
      navigate('/userprofile',{state:eachuser});
    }
  return (
    <div onClick={userprofile}>
        <Maincontainer >
            <Userwrapper >  
          <Imagewrapper className="col-md-1">
          <img
            src= {eachuser.profilePicture}
            alt="userimage"
            className="userImage"
          />
        </Imagewrapper>
        <Detailwrapper>
            <h2>{eachuser.userName}</h2>
            <button
            type="button"
            onClick={handleFollowUnfollow}
            className="follow-unfollow-btn"
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        </Detailwrapper>
       
        </Userwrapper>
        </Maincontainer>
    </div>
  )
}

const Maincontainer=styled.div`
width:50%;
height:200px;
margin: 20px auto;
pointer-events: fill;
box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);;
`;
const Userwrapper=styled.div`
display: flex;
flex-direction: row;
height: 100%;
justify-content: space-between;
pointer-events: fill;
align-items: center;
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
`
const Imagewrapper=styled.div`
width:150px;
height: 150px;
object-fit: cover;
margin-left: 20px;
img{
    width: 100%;
    height: 100%;
    border-radius:50%;
}
`;
const Detailwrapper=styled.div`
width:70%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export default Userprofile;