import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Link } from "react-router-dom";
import {
  AiOutlineCalendar as DateIcon,
  AiOutlineUser as AuthorIcon,
} from "react-icons/ai";

const PostItem = styled.li`
  display: flex;
  justify-content: space-around;
  padding: 25px;
  width: 100%;
  list-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.text.primary};
  transition: all 0.3s ease 0s;
  :hover {
    opacity: 0.5;
  }
  background-color: ${({ theme }) => theme.background.opacity};
  ${MEDIA_QUERY_SM} {
    padding: 20px;
  }
`;

const PostLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  margin-right: 24px;
`;

const PostRightContainer = styled.div`
  width: 80%;
`;

const PostDate = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

const PostTitle = styled(Link)`
  width: fit-content;
  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: 22px;
  font-weight: 500;
  :hover {
    color: red;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 20px;
  }
`;

const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  svg {
    margin-right: 3px;
    color: ${({ theme }) => theme.text.second};
  }
`;

const PostContent = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.text.second};
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default function Post({ post }) {
  return (
    <PostItem>
      <PostLeftContainer>
        <PostDate>
          <DateIcon />
          {new Date(post.createdAt).toLocaleDateString()}
        </PostDate>
      </PostLeftContainer>
      <PostRightContainer>
        <PostHeader>
          <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
          <PostAuthor>
            <AuthorIcon />
            {post.user}
          </PostAuthor>
        </PostHeader>
        <PostContent>
          <p>{post.body}</p>
        </PostContent>
      </PostRightContainer>
    </PostItem>
  );
}
