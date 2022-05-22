import React from "react";
import styled from "styled-components";
import {
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_LG,
} from "../../constants/breakpoint";
import { Wrapper } from "../../layouts/layouts";
import { Link } from "react-router-dom";
import { ReactComponent as AvatarImage } from "../../images/avatar.svg";
import { AiOutlineArrowRight as ArrowRight } from "react-icons/ai";

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 32px;
  width: 60%;
  max-width: 1200px;
  & > svg {
    width: 60%;
    max-width: 700px;
    ${MEDIA_QUERY_MD} {
      width: 100%;
    }
  }
  ${MEDIA_QUERY_LG} {
    margin: 100px auto;
    padding: 0 80px;
    max-width: 1100px;
  }
  ${MEDIA_QUERY_MD} {
    justify-content: center;
    flex-direction: column-reverse;
  }
  ${MEDIA_QUERY_SM} {
    margin: 60px auto 50px auto;
    padding: 0 30px;
  }
`;

const Description = styled.div`
  width: 32%;
  line-height: 1.2;
  h1 {
    margin-bottom: 15px;
    font-size: 34px;
    color: ${({ theme }) => theme.text.primary};
  }
  p {
    color: ${({ theme }) => theme.text.second};
  }
  ${MEDIA_QUERY_MD} {
    margin-top: 60px;
    width: 100%;
  }
`;

const DescriptionButton = styled(Link)`
  position: relative;
  display: inline-flex;
  display: -webkit-inline-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 24px;
  padding: 8px 40px 8px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.background.searchBox};
  text-decoration: none;
  color: ${({ theme }) => theme.text.searchBox};
  z-index: 0;
  svg {
    position: absolute;
    right: 18px;
    height: 100%;
    font-size: 15px;
    transition: 0.3s;
  }
  &:hover {
    svg {
      right: 15px;
    }
  }
`;

export default function HomePage() {
  return (
    <Wrapper>
      <BannerContainer>
        <Description>
          <h1>Hi, 這是 Rex 的部落格</h1>
          <p>（網站尚在施工中⋯⋯）</p>
          <DescriptionButton to="/posts">
            <span>全部文章</span>
            <ArrowRight />
          </DescriptionButton>
        </Description>
        <AvatarImage />
      </BannerContainer>
    </Wrapper>
  );
}
