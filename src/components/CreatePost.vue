<template>
    <div class="create-post">
      <h2>새 게시글 작성</h2>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">제목</label>
          <input
            type="text"
            id="title"
            v-model="title"
            required
            placeholder="제목을 입력하세요"
          />
        </div>
        <div class="form-group">
          <label for="content">내용</label>
          <textarea
            id="content"
            v-model="content"
            required
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="비밀번호설정"
          />
        </div>
        <button type="submit">게시글 작성</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'CreatePost',
    setup() {
      const title = ref('');
      const content = ref('');
      const password = ref(''); // 비밀번호 추가
      const message = ref('');
      const router = useRouter(); // userRouter 훅 사용
  
      const submitPost = async () => {
        try {
          const response = await axios.post('/api/posts', {
            title: title.value,
            content: content.value,
            password: password.value,
          });
          message.value = '게시글이 성공적으로 작성되었습니다!';
          title.value = '';
          content.value = '';
          password.value = '';
          console.log('Created Post:', response.data);
          //PostList로 돌아가기
          router.push('/');

        } catch (error) {
          message.value = '게시글 작성에 실패했습니다.';
          console.error('Failed to create post:', error);
        }
      };
  
      return {
        title,
        content,
        password,
        message,
        submitPost,
      };
    },
  });
  </script>
  
  <style>  

  </style>