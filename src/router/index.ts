import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PostList from "../views/PostList.vue";
import CreatePost from "../components/CreatePost.vue";
import PostDetail from '../views/PostDetail.vue';
import UpdatePost from "../components/UpdatePost.vue";
import DeletePost from "../components/DeletePost.vue";
import CommentModify from "../components/CommentModify.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'PostList',
        component: PostList
    },
    {
        path: '/create',
        name: 'CreatePost',
        component: CreatePost
    },
    {
        path: '/posts/:id',
        name : 'PostDetail',
        component: PostDetail
    },
    {
        path: '/posts/update/:id',
        name: 'UpdatePost',
        component: UpdatePost
    },
    {
        path: '/posts/delete/:id',
        name: 'DeletePost',
        component: DeletePost
    },
    {
        // 댓글 수정페이지
        path: '/comments/update/:id',
        name: 'CommentModify',
        component: CommentModify
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;