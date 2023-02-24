<script lang="ts">
  import { getContext } from 'svelte';
  import Button from './Button.svelte';
  import { COMMENTS_KEY, type CommentsContext } from './CommentsProvider.svelte';
  import TextArea from './TextArea.svelte';

  export let replyToId: number = undefined;
  export let open: boolean = true;

  const { currentUser, onReply, onCreate } = getContext<CommentsContext>(COMMENTS_KEY);

  $: yourAvatarPromise =
    $currentUser && import(`../assets/images/avatars/${$currentUser.image.png}`);

  let loading = false;
  let content: string = '';
</script>

{#if open && yourAvatarPromise}
  <div class="comment {loading ? 'comment--disabled' : ''}">
    <div class="comment__user-info">
      {#await yourAvatarPromise}
        <div class="comment__user-avatar" />
      {:then { default: avatar }}
        <img class="comment__user-avatar" width="40" src={avatar} alt="avatar" />
      {/await}
    </div>

    <div class="comment__content">
      <TextArea bind:content />
    </div>

    <div class="comment__buttons">
      {#if replyToId}
        <Button
          on:click={async () => {
            loading = true;
            await onReply(replyToId, content);
            loading = false;
            open = false;
          }}
        >
          REPLY
        </Button>
      {:else}
        <Button
          on:click={async () => {
            loading = true;
            await onCreate(content);
            loading = false;
          }}
        >
          SEND
        </Button>
      {/if}
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

  .comment__user-info {
    grid-column: 1 / 2;
    align-self: flex-start;
  }

  .comment__user-info {
    grid-column: 1 / 2;
    align-self: flex-start;
  }

  .comment__content {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }
</style>
