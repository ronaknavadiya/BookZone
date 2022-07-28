import React from "react";
import styled from "styled-components";
const comment = ({ comObj }) => {
  return (
    <>
      <Mainwrapper>
        <Bookdiv>
          <h3>{comObj.book}</h3>
        </Bookdiv>
        <CommentWrapper>
          <h3>{comObj.comment}</h3>
        </CommentWrapper>
      </Mainwrapper>
    </>
  );
};
const CommentWrapper = styled.div`
  width: 70%;

  h3 {
    margin-left: 20px;
  }
`;
const Bookdiv = styled.div`
  h3 {
    margin-left: 15px;
  }
`;
const Mainwrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 10px;
  padding: 15px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
`;
export default comment;
