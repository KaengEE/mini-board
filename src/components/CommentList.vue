<template>
    <div class="container">
        <h1>댓글 목록</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Comments</th>
                    <th scope="col">📝</th>
                    <th scope="col">🗑️</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="comments.length === 0" class="text-center">
                    <p>아직 댓글이 없습니다!</p>
                </div>
                <tr v-for="comment in comments" :key="comment.id">
                    <td>{{ comment.content }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm mt-2" @click="navigatorToModify(comment.id)">수정</button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm mt-2" @click="promptPasswordToDelete(comment)">삭제</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <form @submit.prevent="addComment">
            <div class="mb-3">
                <label for="newComment" class="form-label">새 댓글</label>
                <input type="text" class="form-control" id="newComment" v-model="newComment" placeholder="댓글을 입력하세요" />
                <label for="newPassword" class="form-label">비밀번호</label>
                <input type="password" class="form-control" id="newPassword" v-model="newPassword" required
                    placeholder="비밀번호 설정하십시오" />
            </div>
            <button type="submit" class="btn btn-primary">작성</button>
        </form>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
  
  interface Comment {
    id: number;
    postId: number;
    content: string;
  }
  
  export default defineComponent({
    name: 'CommentList',
    setup() {
      const comments = ref<Comment[]>([]);
      const newComment = ref<string>('');
      const newPassword = ref<string>('');
      const route = useRoute();
      const router = useRouter();
  
      const fetchComments = async () => {
      try {
        const postId = Number(route.params.id);
        const response = await axios.get(`/api/comment/${postId}`);
        comments.value = response.data;
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
  
    const addComment = async () => {
      try {
        const postId = Number(route.params.id);
        const response = await axios.post('/api/comment', {
          post_id: postId,
          content: newComment.value,
          password: newPassword.value
        });
        //console.log(response.data);
        newComment.value = '';
        newPassword.value = '';
        fetchComments(); // 댓글 작성 후 목록 다시 불러오기
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    };
  
      //vue의 prompt
      const promptPasswordToDelete = (comment: Comment) => {
        const userPassword = window.prompt('댓글 삭제를 위해 비밀번호를 입력하세요:');
        if (userPassword === null) return; // 사용자가 취소를 누른 경우
        deleteComment(comment.id, userPassword);
      };
  
      const deleteComment = async (commentId: number, userPassword: string) => {
        try {
          await axios.delete(`/api/comment/${commentId}`, { data: { password: userPassword } });
          fetchComments();
        } catch (error) {
          console.error('Failed to delete comment:', error);
        }
      };
  
      //페이지이동
      const navigatorToModify = (id:number) => {
        router.push(`/comments/update/${id}`)
      }

      // 초기 데이터 로드
      fetchComments();
  
      return {
        comments,
        newComment,
        newPassword,
        promptPasswordToDelete,
        addComment,
        navigatorToModify,
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    margin: 0 auto;
    width: 100%;
  }
  
  .table {
    margin-top: 20px;
  }
  
  .btn-sm {
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
  }
  
  .mb-3 {
    margin-top: 20px;
  }
  </style>  