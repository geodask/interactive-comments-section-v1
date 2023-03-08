<script lang="ts">
  export let color: 'blue' | 'red' | 'gray';
  export let type: 'text-only' | 'outline' | 'normal' = 'normal';
  export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="badge badge--{type} badge--{color} badge--{size}">
  <slot />
</div>

<style scoped>
  .badge {
    --main-color: var(--color-primary-moderate-blue);
    --font-size: 15px;

    display: inline-block;
    padding: 0.2rem 0.4rem;
    font-weight: 400;
    border-radius: 2px;

    font-size: var(--font-size);
    color: var(--color-neutral-white);
    background-color: var(--main-color);
  }

  .badge--outline {
    border: 1px solid var(--main-color);
    color: var(--main-color);
    background-color: transparent;
  }

  .badge--sm {
    --font-size: 10px;
  }

  .badge--md {
    --font-size: 12px;
  }

  .badge--lg {
    --font-size: 15px;
  }

  .badge--text-only {
    color: var(--main-color);
    background-color: transparent;
  }

  .badge--blue {
    --main-color: var(--color-primary-moderate-blue);
  }

  .badge--red {
    --main-color: var(--color-primary-soft-red);
  }

  .badge--gray {
    --main-color: var(--color-neutral-grayish-blue);
  }
</style>
