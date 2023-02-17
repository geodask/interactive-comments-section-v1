<script lang="ts">
</script>

<div class="text-area">
  <div contenteditable="true" class="text-area__input-area" />
</div>

<style scoped>
  .text-area {
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid var(--color-neutral-light-gray);
  }

  .text-area:hover {
    border-color: var(--color-primary-moderate-blue);
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
