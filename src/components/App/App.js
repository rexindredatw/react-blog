import React, { Fragment } from "react";
import styled from "styled-components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import Header from "../Header";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  return (
    <Root>
      <Router>
        <Fragment>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Routes>
        </Fragment>
      </Router>
    </Root>
  );
}

export default App;
