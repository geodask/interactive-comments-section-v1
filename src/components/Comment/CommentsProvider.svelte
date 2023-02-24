<script lang="ts" context="module">
  import { onMount, setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { useCommentsService } from '../../services/comments';
  import type { Comment, User } from '../../services/comments/types';

  export const COMMENTS = Symbol('comments');

  export type CommentsContext = {
    currentUser: Writable<User>;
    comments: Writable<Comment[]>;
    onDelete: (id: number) => Promise<void>;
    onScoreUpdate: (id: number, score: number) => Promise<void>;
    onEdit: (id: number, content: string) => Promise<void>;
    onReply: (id: number, content: string) => Promise<void>;
  };
</script>

<script lang="ts">
  const commentsService = useCommentsService();

  let currentUser: Writable<User> = writable(null);
  let comments: Writable<Comment[]> = writable([]);

  setContext<CommentsContext>(COMMENTS, {
    currentUser,
    comments,
    onDelete: async (id: number) => {
      await commentsService.deleteComment(id);
      $comments = await commentsService.getComments();
    },
    onScoreUpdate: async (id: number, score: number) => {
      await commentsService.updateComment({
        score: score,
        id,
      });
    },
    onEdit: async (id: number, content: string) => {
      await commentsService.updateComment({
        content: content,
        id,
      });
    },
    onReply: async (id: number, content: string) => {
      await commentsService.createComment({
        replyTo: id,
        content: content,
      });
      $comments = await commentsService.getComments();
    },
  });

  onMount(async () => {
    $currentUser = await commentsService.getCurrentUser();
    $comments = await commentsService.getComments();
  });
</script>

<slot />
