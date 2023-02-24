<script lang="ts">
  export let placeholder: string = '';
  export let content: string = '';

  const onChange = (event: Event) => {
    content = (event.target as HTMLTextAreaElement).value;
  };
</script>

<textarea
  on:change={onChange}
  data-placeholder={placeholder}
  contenteditable="true"
  class="text-area"
/>

<style scoped>
  .text-area {
    border-radius: inherit;
    padding: 12px 24px;
    overflow-y: auto;
    min-height: 100px;
    height: 100%;
    width: 100%;
    scrollbar-gutter: 10px;
    color: var(--color-neutral-grayish-blue);
    font-size: inherit;
    border: 1px solid var(--color-primary-moderate-blue);
  }

  .text-area:focus {
    outline: none;
    border: 2px solid var(--color-primary-moderate-blue);
  }

  .text-area::-webkit-scrollbar {
    width: 6px;
  }

  .text-area::-webkit-scrollbar-track {
    background-color: var(--color-primary-grayish-blue);
  }

  .text-area::-webkit-scrollbar-thumb {
    border-radius: inherit;
    background-color: var(--color-primary-moderate-blue);
  }
</style>
