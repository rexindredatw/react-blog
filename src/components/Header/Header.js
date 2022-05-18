import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import SearchBox from "../Search";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";

const HeaderContainer = styled.header`
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 25%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.background.body};
  border-bottom: 1px solid ${({ theme }) => theme.text.primary};
`;

const Brand = styled(Link)`
  font-size: 24px;
  font-weight: 650;
  letter-spacing: 0.08rem;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const HamburgerTop = styled.span`
  top: 17px;
`;

const HamburgerMiddle = styled.span`
  top: 24px;
`;

const HamburgerBottom = styled.span`
  bottom: 17px;
`;

const HamburgerMenu = styled.div`
  position: relative;
  margin-right: 12px;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.button.menu};
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 81, 195, 0.1);
  cursor: pointer;
  transition: 0.3s;
  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 2px;
    background-color: #0051c3;
    transition: 0.3s;
  }
  &:hover {
    ${HamburgerTop} {
      top: 15px;
    }
    ${HamburgerBottom} {
      bottom: 15px;
    }
  }
  ${MEDIA_QUERY_SM} {
    margin-left: 20px;
  }
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
  color: black;
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

/*
background: linear-gradient(to bottom, transparent 62%, #fff87e 0) left
center/0% 75% no-repeat;
*/

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-left: 64px;
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const handleLogOut = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") navigate("/");
  };
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  return (
    <HeaderContainer>
      <LeftContainer>
        <HamburgerMenu onClick={handleMenuClick}>
          <HamburgerTop />
          <HamburgerMiddle />
          <HamburgerBottom />
        </HamburgerMenu>
        <Brand to="/">Rex Blog</Brand>
        <NavbarList>
          <NavItem to="/" $active={location.pathname === "/"}>
            首頁
          </NavItem>
          <NavItem to="/posts" $active={location.pathname === "/posts"}>
            文章列表
          </NavItem>
          {user && (
            <NavItem to="/add-post" $active={location.pathname === "/add-post"}>
              發布文章
            </NavItem>
          )}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        <SearchBox />
        {!user && (
          <NavItem to="/login" $active={location.pathname === "/login"}>
            登入
          </NavItem>
        )}
        {!user && (
          <NavItem to="/register" $active={location.pathname === "/register"}>
            註冊
          </NavItem>
        )}
        {user && (
          <NavItem to="/" onClick={handleLogOut}>
            登出
          </NavItem>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
