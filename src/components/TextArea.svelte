<script lang="ts">
  export let placeholder: string = '';
  export let content: string = '';
</script>

<div class="text-area">
  <div data-placeholder={placeholder} contenteditable="true" class="text-area__input-area">
    {#if content}
      <span class="text-area__fixed-content" contenteditable="false">{content}&nbsp;</span>
    {/if}
  </div>
</div>

<style scoped>
  .text-area {
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid var(--color-neutral-light-gray);
    color: var(--color-neutral-grayish-blue);
  }

  .text-area__fixed-content {
    color: var(--color-primary-moderate-blue);
  }

  .text-area__input-area:empty::before {
    content: attr(data-placeholder);
    color: var(--color-neutral-grayish-blue);
  }

  .text-area:hover {
    border-color: var(--color-primary-moderate-blue);
  }

  .text-area:focus-within {
    outline: 1px solid var(--color-primary-moderate-blue);
  }
  .text-area:focus {
    outline: 1px solid var(--color-primary-moderate-blue);
  }

  .text-area__input-area:focus {
    outline: none;
  }

  .text-area__input-area {
    border-radius: inherit;
    padding: 12px 24px;
    overflow-y: auto;
    min-height: 100px;
    max-height: 150px;
    width: 100%;
    scrollbar-gutter: 10px;
  }

  .text-area__input-area::-webkit-scrollbar {
    width: 6px;
  }

  .text-area__input-area::-webkit-scrollbar-track {
    background-color: var(--color-primary-grayish-blue);
  }

  .text-area__input-area::-webkit-scrollbar-thumb {
    border-radius: inherit;
    background-color: var(--color-primary-moderate-blue);
  }
</style>
