# React Blog

---

### 這是使用 React, react-router-dom 及串接 Lidemy API 實作的 SPA 部落格


> 測試帳號：test 
> 
> 測試密碼：Lidemy

[DEMO](https://rexindredatw.github.io/react-blog/)

[Lidemy API](https://github.com/Lidemy/lidemy-student-json-api-server)


![image](https://github.com/rexindredatw/react-blog/blob/master/react-blog.png?raw=true)

---

#### 功能

- 使用 JWT 實作身份驗證之登入 / 註冊功能，密碼為常數
- 支援文章之 CRUD 
- 支援文章之分頁功能
- 支援關鍵字搜尋標題和文章內容
- 支援深淺色模式切換
- 支援讀取頁面動畫

---

#### 使用技術

- 以 React 及 react-router-dom 實作 SPA
- 以 JSX 及 styled-components 撰寫 component
- 使用 function component 及 react hooks

---

#### 專案結構

- /src
    - /components
      - App.js
      - Header.js
      - Footer.js
      - Post.js
      - PostEdit.js
      - Loading.js
      - ModeToggler.js
      - Pagination.js
      - Search.js
    - /pages
       - HomePage.js
       - PostPage.js
       - PostsPage.js
       - LoginPage.js
       - RegisterPage.js
       - AddPostPage.js
       - EditPostPage.js
       - SearchPage.js
    - /constants
      - breakpoint.js
    - /hooks
      - usePagination.js
    - /images
    - /layouts
    - WebAPI.js
    - context.js
    - utils.js
    - theme.js
