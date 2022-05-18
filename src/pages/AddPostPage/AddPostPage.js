import React, { useState, useContext } from "react";
import { Wrapper, Container } from "../../layouts/layouts";
import styled from "styled-components";
import { addPost } from "../../WebAPI";
import { useNavigate } from "react-router";
import { getAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import PostEdit from "../../components/PostEdit";

export default function AddPostPage() {
  const { user } = useContext(AuthContext);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  if (!getAuthToken() && !user) navigate("/");

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    const token = getAuthToken();
    if (!token) return;
    */
    if (!postTitle || !postContent) {
      return setErrorMessage("請輸入文章標題及內容");
    }
    addPost(postTitle, postContent).then((data) => {
      if (!data.ok) {
        navigate("/posts");
      } else {
        return setErrorMessage(data.message);
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <PostEdit
          pageTitle={"新增文章"}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postContent={postContent}
          setPostContent={setPostContent}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </Container>
    </Wrapper>
  );
}
