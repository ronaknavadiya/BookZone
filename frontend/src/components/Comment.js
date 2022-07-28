import React from 'react'
import styled from 'styled-components' 
import { useAppContext } from '../context/appContext';
const comment = ({user}) => {

  return (
<>
    <Mainwrapper>
    <Bookdiv>
        <ImgWrapper>
            <img src={user.profilePicture}></img>
            </ImgWrapper>
            <h3>Fucker:</h3>
        </Bookdiv>
        <CommentWrapper>
        <h3>Tari gand loda feedback wali nni</h3>
        </CommentWrapper>
      
    </Mainwrapper>
    </>
  );
}
const CommentWrapper=styled.div`
width:70%;

h3{
    margin-left: 20px;
}
`;
const Bookdiv=styled.div`

display: flex;
align-items: center;
h3{
    margin-left: 15px;
    color: var(--blue);
    margin-bottom: 5px;
}
`;
const Mainwrapper=styled.div`
display: flex;
flex-direction:column ;
margin: 30px 10px;
padding:15px;
box-shadow: 10px 10px 10px rgba( 0, 0, 0, 0.2);
border-radius: 20px;
            
`;
const ImgWrapper=styled.div`
width:50px;
height: 50px;
border-radius: 50%;
img{
    width: 100%;
    height:100%;
    object-fit: cover;
}
`
export default comment;