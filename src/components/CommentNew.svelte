<script lang="ts">
  import { getContext } from 'svelte';
  import type { Comment } from '../services/comments/types';
  import Button from './Button.svelte';
  import { COMMENTS_KEY, type CommentsContext } from './CommentsProvider.svelte';
  import TextArea from './TextArea.svelte';

  export let replyingTo: Comment = undefined;
  export let open: boolean = true;

  const { currentUser, onReply, onCreate } = getContext<CommentsContext>(COMMENTS_KEY);

  let loading = false;
  let content: string = '';

  const onClick = async () => {
    try {
      loading = true;
      if (!replyingTo) {
        await onCreate(content);
      } else {
        open = true;
        await onReply(replyingTo.id, content);
        open = false;
      }
      content = '';
    } catch {
    } finally {
      loading = false;
    }
  };
</script>

{#if open}
  <div class="comment {loading ? 'comment--disabled' : ''}">
    {#if $currentUser}
      <img class="comment__user-avatar" width="40" src={$currentUser.image.png} alt="avatar" />
    {/if}

    <div class="comment__content">
      <TextArea
        placeholder={replyingTo ? `Reply to ${replyingTo.user.username}...` : 'Add a new comment...'}
        bind:content
      />
    </div>

    <div class="comment__buttons">
      <Button on:click={onClick}>
        {#if replyingTo}
          REPLY
        {:else}
          SEND
        {/if}
      </Button>
    </div>
  </div>
{/if}

<style scoped>
  .comment {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
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
</style>
