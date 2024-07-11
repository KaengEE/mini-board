<template>
    <div id="app">
      <header>
        <nav class="navbar navbar-dark bg-dark">
          <div class="container">
            <router-link to="/" class="navbar-brand">API 연결연습 게시판</router-link>
          </div>
        </nav>
      </header>
      <main>
        <!-- 라우터를 사용하고있기때문에 직접적으로 PostList안넣어두댐 -->
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "App",
  };
  </script>
  
  <style>
  /* 필요한 스타일 추가 */
  </style>
  