import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";

const AddArticleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.text.primary};
  ${MEDIA_QUERY_SM} {
    margin-bottom: 15px;
    font-size: 20px;
  }
`;

const TitleInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  transition: 0.3s;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContentTextarea = styled.textarea`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  height: 500px;
  border: 1px solid transparent;
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  transition: 0.3s;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
  ${MEDIA_QUERY_SM} {
    height: 400px;
  }
`;

const SubmitReminder = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 40px;
  background-color: ${({ theme }) => theme.background.searchBox};
  color: ${({ theme }) => theme.text.searchBox};
  border: transparent;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.div`
  position: absolute;
  left: 0;
  width: fit-content;
  color: ${({ theme }) => theme.error};
  ${MEDIA_QUERY_SM} {
    bottom: -35px;
  }
`;

export default function PostEdit({
  pageTitle,
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
  handleSubmit,
  errorMessage,
  setErrorMessage,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const inputActions = {
      title: (val) => setPostTitle(val),
      content: (val) => setPostContent(val),
    };

    setErrorMessage("");

    inputActions[name](value);
  };
  return (
    <AddArticleForm onSubmit={handleSubmit}>
      <Title>{pageTitle}</Title>
      <TitleInput
        type="text"
        name="title"
        placeholder="?????????????????????"
        value={postTitle}
        onChange={handleInputChange}
      />
      <ContentTextarea
        type="text"
        name="content"
        placeholder="?????????????????????"
        value={postContent}
        onChange={handleInputChange}
      />
      <SubmitReminder>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <SubmitButton>????????????</SubmitButton>
      </SubmitReminder>
    </AddArticleForm>
  );
}
