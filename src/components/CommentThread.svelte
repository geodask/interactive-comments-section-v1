<script lang="ts">
  import type { Comment } from '../services/comments/types';
  import CommentItem from './CommentItem.svelte';

  export let comments: Comment[];
</script>

{#each comments as comment}
  {#if comment.replies && comment.replies.length > 0}
    <div class="comment-thread">
      <CommentItem {comment} />
      <div class="comment-thread__replies">
        <svelte:self comments={comment.replies} />
      </div>
    </div>
  {:else}
    <div class="comment-thread">
      <CommentItem {comment} />
    </div>
  {/if}
{/each}

<style scoped>
  .comment-thread {
    margin-top: 1.2rem;
  }

  .comment-thread__replies {
    border-left: 2px solid var(--color-neutral-light-gray);
    margin-left: 3%;
    padding-left: 3%;
  }
</style>
