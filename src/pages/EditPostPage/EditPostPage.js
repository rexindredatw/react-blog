import React, { useState, useContext, useEffect } from "react";
import { Wrapper, Container } from "../../layouts/layouts";
import styled from "styled-components";
import { updatePost, getPost } from "../../WebAPI";
import { useNavigate, useParams } from "react-router";
import { getAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import PostEdit from "../../components/PostEdit";
import Loading from "../../components/Loading";

export default function EditPostPage() {
  const { user } = useContext(AuthContext);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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
    updatePost(id, postTitle, postContent).then((data) => {
      if (!data.ok) {
        navigate("/posts");
      } else {
        return setErrorMessage(data.message);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getPost(id).then((data) => {
      setPostTitle(data.title);
      setPostContent(data.body);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        <PostEdit
          pageTitle={"編輯文章"}
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
