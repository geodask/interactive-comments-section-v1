<script lang="ts">
  import { getContext } from 'svelte';
  import type { Comment } from '../services/comments/types';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import LikeCounter from './LikeCounter.svelte';
  import CommentNew from './CommentNew.svelte';
  import { COMMENTS_KEY, type CommentsContext } from './CommentsProvider.svelte';

  export let comment: Comment = undefined;
  export let replyingTo: string = undefined;

  const { currentUser, onDelete, onEdit, onScoreUpdate } =
    getContext<CommentsContext>(COMMENTS_KEY);

  $: isYou = comment.user.username === $currentUser.username;
  $: avatarPromise = import(`./../assets/images/avatars/${comment.user.image.png}`);

  let loading = false;
  let openReply = false;
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
    {#await avatarPromise}
      <div class="comment__user-avatar" />
    {:then { default: avatar }}
      <img class="comment__user-avatar" width="40" src={avatar} alt="avatar" />
    {/await}
    <div class="comment__user-name">{comment.user.username}</div>
    {#if isYou}
      <Badge color="blue" size="sm">you</Badge>
    {/if}
  </div>

  <div class="comment__date">
    <Badge color="gray" type="text-only" size="lg">{comment.createdAt}</Badge>
  </div>

  <div class="comment__buttons">
    {#if isYou}
      <Button
        on:click={async () => {
          loading = true;
          await onDelete(comment.id);
          loading = false;
        }}
        icon="delete"
        color="red"
        type="text-only">Delete</Button
      >
      <Button on:click={() => onEdit(comment.id, '')} icon="edit" type="text-only">Edit</Button>
    {:else}
      <Button
        on:click={() => {
          openReply = true;
        }}
        icon="reply"
        type="text-only">Reply</Button
      >
    {/if}
  </div>

  <p class="comment__content">
    {#if replyingTo}
      <span class="comment__replying-to">{replyingTo}</span>
    {/if}
    {comment.content}
  </p>
</div>

{#if openReply}
  <br />
  <CommentNew bind:open={openReply} replyToId={comment.id} />
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

  .comment--reply .comment__buttons {
    grid-row: 1 / 3;
    grid-column: 3 / 4;
    justify-self: flex-end;
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

  .comment__replying-to {
    color: var(--color-primary-moderate-blue);
    font-weight: 700;
  }
</style>
