<template>
  <div class="container">
    <!-- 뒤로가기 -->
    <div class="d-flex justify-content-start mt-3">
      <button class="btn btn-secondary" @click="navigateToList">뒤로가기</button>
    </div>
    <!-- 본문 -->
    <div class="post-detail mt-4">
      <h2>{{ post?.title }}</h2>
      <hr/>
      <p>{{ post?.content }}</p>
    </div>

    <!-- 버튼 박스 -->
    <div class="buttonBox mt-5 d-flex justify-content-end">
      <button class="btn btn-primary me-2" @click="navigateToUpdate">수정</button>
      <button class="btn btn-danger" @click="navigateToDelete">삭제</button>
    </div>

    <!-- 댓글 -->
    <div class="mt-4">
      <CommentList />
    </div>
    
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import CommentList from '../components/CommentList.vue';

  interface Post {
    id: number;
    title: string;
    content: string;
  }
  
  export default defineComponent({
    name: 'PostDetail',
    components:{
        CommentList
    },
    setup() {
      const route = useRoute(); // 파라미터, 쿼리, 메타데이터 접근
      const router = useRouter(); // 기능사용, 제어 및 네비게이션 수행
      const post = ref<Post | null>(null);
  
      const fetchPost = async (id: number) => {
        try {
          const response = await axios.get(`/api/posts/${id}`);
          post.value = response.data;
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      const navigateToList = () => {
        router.push('/');
      }

      const navigateToUpdate = () => {
        if(post.value){
            router.push(`/posts/update/${post.value.id}`)
        }
      }
  
      const navigateToDelete = async () => {
        if(post.value){
            // /posts/delete/:id
            router.push(`/posts/delete/${post.value.id}`)
        }
      }

      onMounted(() => {
        const id = Number(route.params.id);
        fetchPost(id);
      });
  
      return {
        post,
        navigateToList,
        navigateToUpdate,
        navigateToDelete,

      };
    },
  });
  </script>
  
  <style scoped>
.container {
    margin-top: 50px;
    width: 80%;
}
  </style>
  