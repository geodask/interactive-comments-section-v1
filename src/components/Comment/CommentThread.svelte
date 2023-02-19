<script lang="ts">
  import type { Comment } from '../../services/comments/types';
  import CommentItem from './CommentItem.svelte';
  import NewComment from './NewComment.svelte';

  export let comments: Comment[];

  comments.sort((a, b) => b.score - a.score);

  const replyingToId = 1;
</script>

{#each comments as comment}
  {#if comment.replies && comment.replies.length > 0}
    <div class="comment-thread">
      <CommentItem {comment} />
      <div class="comment-thread__replies">
        <svelte:self comments={comment.replies} />
      </div>
      {#if comment.id === replyingToId}
        <div class="comment-thread__new-comment">
          <NewComment
            replyingTo={comments.find((comment) => comment.id === replyingToId).user.username}
          />
        </div>
      {/if}
    </div>
  {:else}
    <div class="comment-thread">
      <CommentItem {comment} />
      {#if comment.id === replyingToId}
        <div class="comment-thread__new-comment">
          <NewComment
            replyingTo={comments.find((comment) => comment.id === replyingToId).user.username}
          />
        </div>
      {/if}
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

  .comment-thread__new-comment {
    margin-top: 1.2rem;
  }

  .comment-thread__replies {
    border-left: 2px solid var(--color-neutral-light-gray);
    margin-left: 3%;
    padding-left: 3%;
  }
</style>
