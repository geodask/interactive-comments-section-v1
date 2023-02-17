<script lang="ts">
  import iconDelete from '../assets/images/icon-delete.svg';
  import iconEdit from '../assets/images/icon-edit.svg';
  import iconReply from '../assets/images/icon-reply.svg';

  export let action: 'reply' | 'delete' | 'edit';

  $: label = {
    reply: 'Reply',
    delete: 'Delete',
    edit: 'Edit',
  }[action];

  $: icon = {
    reply: iconReply,
    delete: iconDelete,
    edit: iconEdit,
  }[action];

  $: modifier = {
    reply: 'info',
    edit: 'info',
    delete: 'danger',
  }[action];
</script>

<button class="action-button action-button--{modifier}">
  {#if action}
    <img src={icon} alt="reply" class="action-button__icon" />
  {/if}
  <span class="action-button__label">
    {label}
  </span>
</button>

<style scoped>
  .action-button {
    border: none;
    padding: 0.5rem 0.8rem;
    font-size: 15px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background: none;
    color: var(--color-primary-moderate-blue);
  }

  .action-button--info {
    color: var(--color-primary-moderate-blue);
  }

  .action-button--danger {
    color: var(--color-primary-soft-red);
  }

  .action-button:hover {
    opacity: 0.5;
  }

  .action-button > :first-child {
    margin-right: 0.4rem;
  }
</style>
