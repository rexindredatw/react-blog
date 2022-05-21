import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { AuthContext, ThemeContext, SearchContext } from "../../contexts";
import themes from "../../themes";
import { ThemeProvider } from "styled-components";
import { getMe } from "../../WebAPI";
import GlobalStyle from "../../layouts/globalStyle";

import {
  HomePage,
  LoginPage,
  AddPostPage,
  PostPage,
  PostsPage,
  RegisterPage,
  SearchPage,
  EditPostPage,
} from "../../pages";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [searchData, setSearchData] = useState(null);
  const themeMode = theme === "light" ? themes.light : themes.dark;

  useEffect(() => {
    getMe().then((res) => {
      if (res.ok) {
        setUser(res.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <SearchContext.Provider value={{ searchData, setSearchData }}>
          <ThemeProvider theme={themeMode}>
            <GlobalStyle />
            <Router>
              <Header />
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/add-post" element={<AddPostPage />} />
                <Route path="/edit/:id" element={<EditPostPage />} />
                <Route exact path="/posts" element={<PostsPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/search/:keyword" element={<SearchPage />}></Route>
              </Routes>
              <Footer />
            </Router>
          </ThemeProvider>
        </SearchContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
