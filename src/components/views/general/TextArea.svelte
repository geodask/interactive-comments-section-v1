<script lang="ts">
  export let placeholder: string = '';
  export let content: string = '';

  const onChange = (event: Event) => {
    content = (event.target as HTMLTextAreaElement).value;
  };
</script>

<div class="text-area-container">
  <textarea {placeholder} value={content} on:change={onChange} class="text-area" />
</div>

<style scoped>
  .text-area-container {
    border-radius: 12px;
    background-origin: border-box;
    overflow: hidden;
    border: 1px solid var(--color-primary-moderate-blue);
  }

  .text-area-container:focus-within {
    border: 2px solid var(--color-primary-moderate-blue);
  }

  .text-area {
    resize: none;
    padding: 12px 24px;
    min-height: 100px;
    height: 100%;
    width: 100%;
    scrollbar-gutter: 100px;
    color: var(--color-neutral-grayish-blue);
    font-size: inherit;
    border-radius: inherit;
    border: none;
    outline: none;
  }

  .text-area::-webkit-scrollbar {
    width: 6px;
  }

  .text-area::-webkit-scrollbar-track {
    background-color: var(--color-primary-grayish-blue);
  }

  .text-area::-webkit-scrollbar-thumb {
    border-radius: inherit;
    background-clip: border-box;
    background-color: var(--color-primary-moderate-blue);
  }
</style>
