<script lang="ts" context="module">
  import { createEventDispatcher, setContext } from 'svelte';
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { useCommentsService } from '../../services/comments';
  import type { User, Comment } from '../../services/comments/types';

  export const COMMENTS = Symbol('comments');

  export type CommentsContext = {
    currentUser: Writable<User>;
    comments: Writable<Comment[]>;
    onDelete: (id: number) => Promise<void>;
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
    onEdit: async (id: number, content: string) => {
      console.log('EDIT COMMENT', id, content);
      // $comments = await commentsService.getComments();
    },
    onReply: async (id: number, content: string) => {
      console.log('REPLY TO COMMENT', id, content);
      // $comments = await commentsService.getComments();
    },
  });

  onMount(async () => {
    $currentUser = await commentsService.getCurrentUser();
    $comments = await commentsService.getComments();
  });
</script>

<slot />
