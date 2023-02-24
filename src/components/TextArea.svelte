<script lang="ts">
  export let placeholder: string = '';
  export let content: string = '';

  const onChange = (event: Event) => {
    content = (event.target as HTMLTextAreaElement).value;
  };
</script>

<div class="text-area-container">
  <textarea
    on:change={onChange}
    data-placeholder={placeholder}
    contenteditable="true"
    class="text-area"
  />
</div>

<style scoped>
  .text-area {
    border-radius: 12px;
    padding: 12px 24px;
    min-height: 100px;
    height: 100%;
    width: 100%;
    scrollbar-gutter: 100px;
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
