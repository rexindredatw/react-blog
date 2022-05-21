import React, { useState, useEffect, useMemo } from "react";
import Pagination from "../../components/Pagination/Pagination";
import styled from "styled-components";
import { getPosts } from "../../WebAPI";
import db from "../../firebase";
import { Wrapper, Container } from "../../layouts/layouts";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import Post from "../../components/Post";
import Loading from "../../components/Loading";
import { AiOutlineConsoleSql } from "react-icons/ai";

let PageSize = 5;

const Posts = styled.ul`
  margin: 0 0 30px 0;
  padding: 0;
`;

export default function PostsPage() {
  const [posts, setPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /*
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
    */
    setIsLoading(true);
    getPosts()
      .then((posts) => {
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const currentTableData = useMemo(() => {
    if (posts) {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return posts.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, posts]);

  return (
    <Wrapper>
      <Container>
        <Posts>
          {isLoading && <Loading />}
          {currentTableData &&
            currentTableData.map((post) => <Post post={post} key={post.id} />)}
        </Posts>
        {currentTableData && (
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={posts.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          ></Pagination>
        )}
      </Container>
    </Wrapper>
  );
}
