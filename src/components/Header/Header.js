import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import SearchBox from "../Search";
import ModeToggler from "../ModeToggler";

const HeaderContainer = styled.header`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 20%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.background.body};
  border-bottom: 1px solid ${({ theme }) => theme.text.primary};
  ${MEDIA_QUERY_SM} {
    justify-content: space-evenly;
    flex-direction: column;
    height: 200px;
    padding: 0 30px;
  }
`;

const Brand = styled(Link)`
  font-size: 24px;
  font-weight: 650;
  letter-spacing: 0.08rem;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const NavItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  box-sizing: border-box;
  width: fit-content;
  padding: 0 12px 0 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.primary};
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.08rem;
  ${(props) =>
    props.$active &&
    `    border-radius: 2.4em 0.8em;
  background: transparent;
  background-image: linear-gradient(
    to right,
    rgba(255, 225, 0, 0.1),
    rgba(255, 225, 0, 0.7) 24%,
    rgba(255, 225, 0, 0.3)
  );
`}
  &:hover {
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

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-left: 64px;
  }
`;

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") navigate("/");
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand to="/">Rex Blog</Brand>
        <NavbarList>
          <NavItem to="/" $active={location.pathname === "/"}>
            Homepage
          </NavItem>
          <NavItem to="/posts" $active={location.pathname === "/posts"}>
            Posts
          </NavItem>
          {user && (
            <NavItem to="/add-post" $active={location.pathname === "/add-post"}>
              New Post
            </NavItem>
          )}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        <ModeToggler />
        <SearchBox />
        {!user && (
          <NavItem to="/login" $active={location.pathname === "/login"}>
            Login
          </NavItem>
        )}
        {!user && (
          <NavItem to="/register" $active={location.pathname === "/register"}>
            Register
          </NavItem>
        )}
        {user && (
          <NavItem to="/" onClick={handleLogOut}>
            Logout
          </NavItem>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
