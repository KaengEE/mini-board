<template>
    <div class="container">
      <div class="backBtn">
        <button @click="navigateToDetail">뒤로가기</button>
      </div>
      <div class="post-detail">
        <h2>{{ post?.title }}</h2>
        <textarea v-if="post" v-model="post.content"></textarea>
      </div>
      <div class="passwordForm">
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <div class="buttonBox">
        <button @click="updatePost">수정 완료</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';
  
  interface Post {
    id: number;
    title: string;
    content: string;
  }
  
  export default defineComponent({
    name: 'UpdatePost',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const post = ref<Post | null>(null);
      const password = ref<string>(''); // 비밀번호 입력을 위한 상태
  
      const fetchPost = async (id: number) => {
        try {
          const response = await axios.get(`/api/posts/${id}`);
          post.value = response.data;
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
  
      const updatePost = async () => {
        try {
          if (post.value) {
            const { title, content } = post.value;
            
            // 비밀번호와 함께 PUT 요청 보내기
            await axios.put(`/api/posts/${post.value.id}`, {
              title,
              content,
              password: password.value, // 비밀번호도 함께 전송
            });
  
            router.push(`/posts/${post.value.id}`);
          }
        } catch (error) {
          console.error('Failed to update post:', error);
          alert("비밀번호 틀림!");
        }
      };
  
      const navigateToDetail = () => {
        router.push(`/posts/${post.value?.id}`);
      };
  
      onMounted(() => {
        const id = Number(route.params.id);
        fetchPost(id);
      });
  
      return {
        post,
        password,
        updatePost,
        navigateToDetail,
      };
    },
  });
  </script>
  
  <style scoped>
  /* 필요한 스타일링 추가 */
  </style>  