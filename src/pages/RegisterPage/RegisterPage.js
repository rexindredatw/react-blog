import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { register, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { Wrapper, Container } from "../../layouts/layouts";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import {
  AiOutlineEye as VisibleIcon,
  AiOutlineEyeInvisible as InvisibleIcon,
} from "react-icons/ai";

const RegisterForm = styled.form`
  position: relative;
  margin: 20% auto;
  padding: 40px 40px 50px 40px;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background.toolbar};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  ${MEDIA_QUERY_SM} {
    margin-top: 30px;
    padding: 30px 30px 40px 30px;
  }
`;
const Title = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.button.submit};
`;
const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputArea = styled.input`
  width: 100%;
  padding: 10px;
  height: 45px;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  color: ${({ theme }) => theme.text.body};
  background-color: ${({ theme }) => theme.background.body};
  transition: 0.3s;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const VisibleToggler = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.button.submit};
    width: 100%;
    height: auto;
  }
`;
const ToLoginLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.remind};
  transition: 0.3s;
  &:hover {
    color: ${({ theme }) => theme.button.submit};
    border-radius: 2.4em 0.8em;
    background: transparent;
    background-image: linear-gradient(
      to right,
      rgba(255, 225, 0, 0.1),
      rgba(255, 225, 0, 0.7) 24%,
      rgba(255, 225, 0, 0.3)
    );
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 4px 0;
  color: ${({ theme }) => theme.text.negative};
  background-color: ${({ theme }) => theme.button.submit};
  border: transparent;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const WarningMessage = styled.div`
  margin: 12px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text.remind};
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: 12px;
  color: ${({ theme }) => theme.error};
`;

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("Lidemy");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!nickname || !username || !password) {
      e.preventDefault();
      return setErrorMessage("請輸入帳號、暱稱及密碼");
    }
    register(nickname, username, password).then((data) => {
      if (data.ok === 0 && data.code === 3) {
        return setErrorMessage("此帳號已有人使用");
      } else if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(res.toString());
        }
        setUser(res.data);
        navigate("/");
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const inputActions = {
      nickname: (val) => setNickname(val),
      username: (val) => setUsername(val),
      password: (val) => setPassword(val),
    };

    setErrorMessage("");

    inputActions[name](value);
  };

  const handleToggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Wrapper>
      <Container>
        <RegisterForm onSubmit={handleSubmit}>
          <Title>註冊</Title>
          <InputContainer>
            <InputArea
              type="text"
              name="nickname"
              value={nickname}
              placeholder="請輸入暱稱"
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <InputArea
              type="text"
              name="username"
              value={username}
              placeholder="請輸入帳號"
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <InputArea
              type={isVisible ? "text" : "password"}
              name="password"
              value={"Lidemy"}
              placeholder="請輸入密碼"
              onChange={handleInputChange}
            />
            <VisibleToggler onClick={handleToggleVisible}>
              {isVisible ? <VisibleIcon /> : <InvisibleIcon />}
            </VisibleToggler>
          </InputContainer>
          <WarningMessage>此網站未做加密，密碼皆會更改為預設值</WarningMessage>
          <ToLoginLink to="/login">已經是會員？點此登入</ToLoginLink>
          <SubmitButton>註冊</SubmitButton>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </RegisterForm>
      </Container>
    </Wrapper>
  );
}
