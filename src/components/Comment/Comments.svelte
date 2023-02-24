<script lang="ts">
  import { getContext } from 'svelte';
  import type { Comment } from '../../services/comments/types';
  import CommentComponent from './Comment.svelte';
  import { COMMENTS, type CommentsContext } from './CommentsProvider.svelte';

  export let nestedComments: Comment[] = undefined;

  const { comments } = getContext<CommentsContext>(COMMENTS);

  $: commentsArray = nestedComments || $comments;
</script>

{#each commentsArray as comment (comment.id)}
  {#if comment.replies.length > 0}
    <div class="comment-thread">
      <CommentComponent {comment} replyingTo={comment.replyingTo} />
      <div class="comment-thread__reply">
        <svelte:self nestedComments={comment.replies} />
      </div>
    </div>
  {:else}
    <div class="comment-thread">
      <CommentComponent {comment} replyingTo={comment.replyingTo} />
    </div>
  {/if}
{/each}

<style scoped>
  .comment-thread {
    margin-bottom: 1.2rem;
  }

  .comment-thread:first-child {
    margin-top: 1.2rem;
  }

  .comment-thread__reply {
    border-left: 2px solid var(--color-neutral-light-gray);
    margin-left: 3%;
    padding-left: 3%;
  }
</style>
