import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { getPost, deletePost } from "../../WebAPI";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { AiOutlineLeft as BackIcon } from "react-icons/ai";
import { MEDIA_QUERY_MD } from "../../constants/breakpoint";
import { Wrapper, Container } from "../../layouts/layouts";
import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
  AiOutlineCalendar as CalendarIcon,
  AiOutlineUser as PersonIcon,
} from "react-icons/ai";
import { formatTime } from "../../utils";

const PostToolHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  padding: 0 25px;
  color: #505050;
  svg {
    margin-right: 3px;
    font-size: 16px;
  }
`;

const PostEdit = styled(Link)`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 15px;
  color: ${({ theme }) => theme.text.searchBox};
  border: 1px solid ${({ theme }) => theme.text.searchBox};
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.text.searchBox};
    color: ${({ theme }) => theme.background.searchBox};
  }
`;

const PostDelete = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 3px;
  margin-left: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.searchBox};
  border: 1px solid ${({ theme }) => theme.text.searchBox};
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.text.searchBox};
    color: ${({ theme }) => theme.background.searchBox};
  }
`;

const PostContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.second};
  background-color: ${({ theme }) => theme.background.opacity};
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  justify-content: flex-start;
  width: 100%;
  border-radius: 10px 10px 0 0;
  box-shadow: ${({ theme }) => theme.boxShadow.float};
  padding: 20px 25px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.background.header};
  color: ${({ theme }) => theme.text.primary};
`;

const PostTitle = styled.div`
  font-size: 24px;
  margin-left: 10px;
  flex-basis: 72%;

  ${MEDIA_QUERY_MD} {
    flex-basis: 78%;
  }
`;

const PostBody = styled.div`
  padding: 25px;
`;
const PostContent = styled.p`
  color: ${({ theme }) => theme.text.primary};
  line-height: 1.5;
  font-size: 17px;
  word-break: break-word;
`;

const PostInfo = styled.div`
  margin-bottom: 30px;
  div + div {
    margin-top: 5px;
  }
`;
const PostAuthor = styled.div`
  color: ${({ theme }) => theme.text.second};
  font-size: 16px;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 4px;
  }
`;

const PostDate = styled.div`
  color: ${({ theme }) => theme.text.second};
  font-size: 16px;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 4px;
  }
`;

const PostLink = styled(Link)`
  align-self: center;
  height: 16px;
`;

export default function PostPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [postAuthor, setPostAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    deletePost(id).then(() => {
      navigate("/posts");
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getPost(id)
      .then((post) => {
        setPost(post);
        setPostAuthor(post.user.username);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading>載入中</Loading>}{" "}
        {user && postAuthor === user.username && (
          <PostToolHeader>
            <PostEdit to={`/edit/${post.id}`}>
              <EditIcon />
              編輯
            </PostEdit>
            <PostDelete onClick={handleDelete}>
              <DeleteIcon />
              刪除
            </PostDelete>
          </PostToolHeader>
        )}
        {post && (
          <PostContainer>
            <PostHeader>
              <PostLink to="/posts">
                <BackIcon />
              </PostLink>
              <PostTitle>{post.title}</PostTitle>
            </PostHeader>
            <PostBody>
              <PostInfo>
                <PostAuthor>
                  <PersonIcon />
                  {`作者:  ${postAuthor}`}
                </PostAuthor>
                <PostDate>
                  <CalendarIcon />
                  {`時間:  ${formatTime(post.createdAt)}`}
                </PostDate>
              </PostInfo>
              <PostContent>{post.body}</PostContent>
            </PostBody>
          </PostContainer>
        )}
      </Container>
    </Wrapper>
  );
}
