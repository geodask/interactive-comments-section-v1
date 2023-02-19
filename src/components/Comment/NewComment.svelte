<script lang="ts">
  import { useCommentsService } from '../../services/comments';
  import Button from '../Button.svelte';
  import TextArea from '../TextArea.svelte';

  export let replyingTo: string = '';

  const commentsService = useCommentsService();
  const currentUser = commentsService.getCurrentUser();

  const avatarPromise = import(`../../assets/images/avatars/${currentUser.image.png}`);
</script>

<div class="comment">
  <div class="comment__user-info">
    {#await avatarPromise}
      <div class="comment__user-avatar" />
    {:then { default: avatar }}
      <img class="comment__user-avatar" width="40" src={avatar} alt="avatar" />
    {/await}
  </div>

  <TextArea placeholder="Add a comment..." content={replyingTo && `@${replyingTo}\t`} />

  <div class="comment__buttons">
    <Button>
      {#if replyingTo}
        REPLY
      {:else}
        SEND
      {/if}
    </Button>
  </div>
</div>

<style scoped>
  .comment {
    display: grid;
    grid-template-columns: auto 1fr auto;
    background: var(--color-neutral-white);
    column-gap: 20px;
    padding: 20px;
    border-radius: 12px;
  }
</style>
