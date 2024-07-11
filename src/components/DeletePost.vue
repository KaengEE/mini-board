<template>
    <div class="container">
      <h3>게시물을 삭제 하시겠습니까?</h3>
      <p>댓글도 함께 삭제 됩니다.</p>
      <form @submit.prevent="deletePost">
        <div>
          <label for="password">비밀번호:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <div>
          <button @click="navigateToDetail">취소</button>
          <button type="submit">삭제</button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';
  
  export default defineComponent({
    name: 'DeletePost',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const password = ref<string>('');
  
      const deletePost = async () => {
        try {
          const postId = Number(route.params.id);
          console.log('Deleting post with ID:', postId);
          console.log('Using password:', password.value);
          await axios.delete(`/api/posts/${postId}`, {
            data: {
              password: password.value
            }
          });
          alert('게시물이 삭제되었습니다.');
          router.push('/');
        } catch (error) {
          console.error('Failed to delete post:', error);
          alert('게시물 삭제에 실패했습니다. 비밀번호를 확인해 주세요.');
        }
      };
  
      const navigateToDetail = () => {
        router.push(`/posts/${route.params.id}`);
      };
  
      return {
        password,
        deletePost,
        navigateToDetail,
      };
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-bottom: 10px;
  }
  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  