<script lang="ts">
  import { getContext } from 'svelte';
  import type { Comment } from '../services/comments/types';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import CommentNew from './CommentNew.svelte';
  import { COMMENTS_KEY, type CommentsContext } from './CommentsProvider.svelte';
  import LikeCounter from './LikeCounter.svelte';
  import TextArea from './TextArea.svelte';

  export let comment: Comment = undefined;

  const { currentUser, onDelete, onEdit, onScoreUpdate } =
    getContext<CommentsContext>(COMMENTS_KEY);

  $: isYou = comment.user.username === $currentUser.username;

  let loading = false;
  let openReply = false;
  let editMode = false;
  let newContent = comment.content;

  const onClick = async (action: 'edit' | 'delete' | 'reply' | 'update' | 'cancelEdit') => {
    if (action === 'reply') {
      openReply = !openReply;
      return;
    }
    if (action === 'edit') {
      editMode = true;
      return;
    }

    if (action === 'cancelEdit') {
      editMode = false;
      return;
    }

    loading = true;
    if (action === 'delete') {
      await onDelete(comment.id);
    } else if (action === 'update') {
      await onEdit(comment.id, newContent);
      editMode = false;
    }
    loading = false;
  };
</script>

<div class="comment {loading ? 'comment--disabled' : ''}">
  <div class="comment__like-counter">
    <LikeCounter
      on:update={(event) => {
        onScoreUpdate(comment.id, event.detail);
      }}
      score={comment.score}
      orientation="vertical"
    />
  </div>

  <div class="comment__user-info">
    <img class="comment__user-avatar" width="40" src={comment.user.image.png} alt="avatar" />
    <div class="comment__user-name">{comment.user.username}</div>
    {#if isYou}
      <Badge color="blue" size="sm">you</Badge>
    {/if}
  </div>

  <div class="comment__date">
    <Badge color="gray" type="text-only" size="lg">{comment.createdAt}</Badge>
  </div>

  {#if !editMode}
    <div class="comment__buttons">
      {#if isYou}
        <Button on:click={() => onClick('delete')} icon="delete" color="red" type="text-only">
          Delete
        </Button>
        <Button on:click={() => onClick('edit')} icon="edit" type="text-only">Edit</Button>
      {:else}
        <Button on:click={() => onClick('reply')} icon="reply" type="text-only">Reply</Button>
      {/if}
    </div>
  {/if}

  <p class="comment__content">
    {#if editMode}
      <div class="comment__edit-area">
        <TextArea bind:content={newContent} />
        <div>
          <Button color="gray" on:click={() => onClick('cancelEdit')}>CANCEL</Button>
          <Button on:click={() => onClick('update')}>UPDATE</Button>
        </div>
      </div>
    {:else}
      {#if comment.replyingTo}
        <span class="comment__replying-to">{comment.replyingTo}</span>
      {/if}
      {comment.content}
    {/if}
  </p>
</div>

{#if openReply}
  <br />
  <CommentNew bind:open={openReply} replyingTo={comment} />
{/if}

<style scoped>
  .comment {
    display: grid;
    grid-template-columns: auto auto 1fr 1fr;
    grid-template-rows: auto 1fr;
    background: var(--color-neutral-white);
    column-gap: 20px;
    padding: 20px;
    border-radius: 12px;
  }

  .comment--disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.4;
  }

  .comment__like-counter {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    align-self: flex-start;
  }

  .comment__user-info {
    grid-column: 2 / 3;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    font-weight: 700;
    color: var(--color-neutral-dark-blue);
  }

  .comment__date {
    align-self: center;
  }
  .comment__buttons {
    justify-self: flex-end;
  }

  .comment__content {
    grid-row: 2 / 3;
    grid-column: 2 / 5;
    color: var(--color-neutral-grayish-blue);
  }

  .comment__edit-area {
    display: flex;
    flex-direction: column;
  }

  .comment__edit-area > :last-child {
    margin-top: 1rem;
    align-self: flex-end;
  }

  .comment__content .comment__replying-to {
    color: var(--color-primary-moderate-blue);
    font-weight: 700;
  }
</style>
