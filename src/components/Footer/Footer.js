import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import {
  AiOutlineGithub as GithubIcon,
  AiOutlineMail as MailIcon,
} from "react-icons/ai";

const FooterContainer = styled.footer`
  margin: 0 auto;
  padding: 30px 50px;
  color: ${({ theme }) => theme.text.second};
  ${MEDIA_QUERY_SM} {
    margin: 30px auto 0 auto;
    padding: 20px 30px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterIcon = styled.a`
  display: flex;
  margin-left: 15px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.second};
  transition: 0.3s;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <p>Rex Chiang</p>
        <FooterIcon href="https://github.com/rexindredatw" target="_blank">
          <GithubIcon />
        </FooterIcon>
        <FooterIcon href="mailto:rexrexchian@gmail.com">
          <MailIcon />
        </FooterIcon>
      </FooterContent>
    </FooterContainer>
  );
}
