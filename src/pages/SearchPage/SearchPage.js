import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import Post from "../../components/Post";
import Loading from "../../components/Loading";
import { getPosts } from "../../WebAPI";
import { SearchContext } from "../../contexts";
import { useParams } from "react-router-dom";
import { Wrapper, Container } from "../../layouts/layouts";

const EmptyDataTitle = styled.h1``;

const Title = styled.p`
  margin-bottom: 30px;
  font-size: 22px;
  color: ${({ theme }) => theme.text.primary};
  line-height: 1.8;
  span {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.8;
    border-bottom: 1px dotted ${({ theme }) => theme.text.second};
  }
  ${MEDIA_QUERY_SM} {
    font-size: 20px;
    span {
      font-size: 20px;
    }
  }
`;

export default function SearchPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchData, setSearchData } = useContext(SearchContext);
  let { keyword } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setSearchData(keyword);
    getPosts()
      .then((res) => res)
      .then((data) => {
        const results = data.filter(
          ({ title, body }) =>
            title.toLowerCase().includes(keyword) ||
            body.toLowerCase().includes(keyword)
        );
        setPosts(results);
        setIsLoading(false);
      });
  }, [setSearchData, keyword]);

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <Container>
        {posts.length === 0 ? (
          <EmptyDataTitle>目前無符合的資料。</EmptyDataTitle>
        ) : (
          <Title>
            以下是與「
            <span>{searchData}</span>
            」相符的文章
          </Title>
        )}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Container>
    </Wrapper>
  );
}
