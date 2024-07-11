<template>
    <div class="container">
      <h1>댓글 수정</h1>
      <div v-if="editedComment">
        <label for="content">댓글 내용</label>
        <textarea id="content" class="form-control" v-model="editedComment.content"></textarea>
        <label for="password">비밀번호</label>
        <input type="password" id="password" class="form-control" v-model="password">
        <button class="btn btn-danger mt-2" @click="cancel">취소</button>
        <button class="btn btn-primary mt-2" @click="updateComment">수정</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  interface Comment {
    id: number;
    post_id: number;
    content: string;
    password: string; // 비밀번호 필드 추가
  }
  
  export default defineComponent({
    name: 'CommentModify',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const editedComment = ref<Comment | null>(null); // 초기값 null로 설정
      const password = ref<string>(''); // 비밀번호 입력을 위한 변수
  
      // 댓글 정보 불러오기
      const fetchComment = async () => {
        try {
          const commentId = Number(route.params.id);
          const response = await axios.get<Comment>(`/api/comment/detail/${commentId}`);
          editedComment.value = response.data;
        } catch (error) {
          console.error('Failed to fetch comment:', error);
        }
      };
  
      // 댓글 수정
      const updateComment = async () => {
        try {
          if (!editedComment.value) return; // editedComment가 null일 경우 빠르게 리턴
          const commentId = editedComment.value.id;
          const response = await axios.put(`/api/comment/${commentId}`, {
            content: editedComment.value.content,
            password: password.value, // 비밀번호 데이터 전송
          });
          if (response.status === 200) {
            router.push(`/posts/${editedComment.value.post_id}`);
          } else {
            console.error('Failed to update comment:', response.data);
          }
        } catch (error) {
            alert('비밀번호 틀림!');
          console.error('Failed to update comment:', error);
        }
      };
  
      // 취소
      const cancel = () => {
        router.push(`/comment/${editedComment.value?.post_id}`);
      };
  
      // 컴포넌트가 마운트될 때 댓글 정보 불러오기
      fetchComment();
  
      return {
        editedComment,
        password,
        updateComment,
        cancel,
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    margin: 0 auto;
    width: 50%;
    padding: 20px;
  }
  
  .btn {
    margin-top: 10px;
  }
  </style>  