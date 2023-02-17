<script lang="ts">
  import { fade, scale } from 'svelte/transition';

  export let open: boolean = false;
  export let title: string = '';
  export let closeOnBackdropClick: boolean = false;

  let applyHeartbeatAnimation = false;

  const onBackdropClick = () => {
    if (closeOnBackdropClick) {
      open = false;
      return;
    }
    triggerHeartbeatAnimation();
  };

  const triggerHeartbeatAnimation = () => {
    applyHeartbeatAnimation = true;
    setTimeout(() => {
      applyHeartbeatAnimation = false;
    }, 400);
  };

  function eventListener(e) {
    console.log('KEYDOWN');
    if (e.key === 'Escape') {
      onBackdropClick();
    }
  }

  $: if (open) {
    window.addEventListener('keydown', eventListener);
  } else {
    window.removeEventListener('keydown', eventListener);
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    in:fade={{
      delay: 100,
      duration: 100,
    }}
    class="backdrop"
    on:click|self={onBackdropClick}
  >
    <div
      in:scale={{
        duration: 350,
      }}
      class="modal"
      class:heartbeat={applyHeartbeatAnimation}
    >
      <div class="modal__header">
        <h2>{title}</h2>
      </div>
      <div class="modal__content">
        <slot />
      </div>

      <div class="modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
{/if}

<style scoped>
  @import '../animations.css';

  .backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
  }

  .modal {
    padding: 1.5rem;
    border-radius: 8px;
    background: var(--color-neutral-white);
    min-height: 100px;
    max-width: 350px;
    margin: auto auto 50vh auto;
  }

  .modal__header {
    color: var(--color-neutral-dark-blue);
  }

  .modal__header h2 {
    margin-top: 0;
    font-weight: 500;
  }

  .modal__content {
    font-size: 15px;
    color: var(--color-neutral-grayish-blue);
  }

  .modal__footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
</style>
