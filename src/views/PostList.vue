<template>
    <div class="post-list container">
      <h2 class="my-4">자유게시판</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post,index) in sortedPosts" :key="post.id" @click="navigateToDetail(post.id)" style="cursor: pointer;">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ post.title }}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end">
      <button class="btn btn-primary mb-3" @click="navigatorToCreate">새글 작성하기</button>
      </div>

    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  // Define the Post interface
  interface Post {
    id: number;
    title: string;
  }
  
  export default defineComponent({
    name: 'PostList',
    setup() {
      // Define posts as a ref with an empty array
      const posts = ref<Post[]>([]);
      const router = useRouter();
  
      // Fetch posts from the API
      const fetchPosts = async () => {
        try {
          const response = await axios.get('/api/posts');  // Use '/api' as per the proxy setup
          posts.value = response.data;  // Store the response data in posts
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      // Fetch posts when the component is mounted
      onMounted(() => {
        fetchPosts();
      });
  
      // Navigate to create post page
      const navigatorToCreate = () => {
        router.push('/create');
      };
  
      // Navigate to post detail page
      const navigateToDetail = (id: number) => {
        router.push(`/posts/${id}`);
      };

      //오름차순
      const sortedPosts = computed(() => {
      return posts.value.slice().sort((a, b) => a.id - b.id);
      });
  
      return {
        posts,
        navigatorToCreate,
        navigateToDetail,
        sortedPosts,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add necessary styling */
  .table {
    cursor: pointer;
  }
  </style>
  