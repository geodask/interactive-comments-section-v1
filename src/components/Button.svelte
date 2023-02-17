<script lang="ts">
  import iconDelete from '../assets/images/icon-delete.svg';
  import iconEdit from '../assets/images/icon-edit.svg';
  import iconReply from '../assets/images/icon-reply.svg';

  export let icon: 'reply' | 'delete' | 'edit' | undefined = undefined;
  export let color: 'blue' | 'red' | 'gray' = 'blue';
  export let iconPosition: 'left' | 'right' = 'left';
  export let type: 'solid' | 'outline' | 'text-only' = 'solid';

  $: iconSrc = {
    reply: iconReply,
    delete: iconDelete,
    edit: iconEdit,
  }[icon];
</script>

<button on:click class="button button--{color} button--icon-{iconPosition} button--{type}">
  {#if iconSrc}
    <img src={iconSrc} alt="reply" class="button__icon" />
  {/if}
  <span class="button__label">
    <slot />
  </span>
</button>

<style scoped>
  .button {
    --main-color: var(--color-primary-moderate-blue);

    border: none;
    padding: 0.5rem 0.8rem;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    background-color: var(--main-color);
    color: var(--color-neutral-white);
  }

  .button--icon-left {
    flex-direction: row;
  }

  .button--icon-right {
    flex-direction: row-reverse;
  }

  .button--blue {
    --main-color: var(--color-primary-moderate-blue);
  }

  .button--red {
    --main-color: var(--color-primary-soft-red);
  }

  .button--gray {
    --main-color: var(--color-neutral-grayish-blue);
  }

  .button--outline {
    background: none;
    border: 1px solid var(--main-color);
    color: var(--main-color);
  }

  .button--text-only {
    background: none;
    color: var(--main-color);
  }

  .button:hover {
    opacity: 0.7;
  }

  .button--icon-left > :first-child + * {
    margin-left: 0.4rem;
  }

  .button--icon-right > :first-child + * {
    margin-right: 0.4rem;
  }
</style>
