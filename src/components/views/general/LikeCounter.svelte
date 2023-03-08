<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import iconMinusActive from '@/assets/images/icon-minus-active.svg';
  import iconMinus from '@/assets/images/icon-minus.svg';
  import iconPlusActive from '@/assets/images/icon-plus-active.svg';
  import iconPlus from '@/assets/images/icon-plus.svg';

  export let score: number = 0;
  export let orientation: 'horizontal' | 'vertical' = 'vertical';

  const dispatch = createEventDispatcher();

  let isPlusIconActive = false;
  let isMinusIconActive = false;
  let counter = score;

  const incremenet = () => {
    counter++;
    dispatchUpdateEvent();
  };

  const decrement = () => {
    counter--;
    dispatchUpdateEvent();
  };

  const setIconActive = (target: 'plus' | 'minus', active: boolean) => {
    if (target === 'plus') {
      isPlusIconActive = active;
    } else {
      isMinusIconActive = active;
    }
  };

  const dispatchUpdateEvent = () => dispatch('update', counter);
</script>

<div class="counter counter--{orientation}">
  <button
    class="counter__button"
    on:click={incremenet}
    on:focus={() => setIconActive('plus', true)}
    on:mouseover={() => setIconActive('plus', true)}
    on:mouseleave={() => setIconActive('plus', false)}
    on:blur={() => setIconActive('plus', false)}
  >
    <img hidden={isPlusIconActive} src={iconPlus} alt="plus" />
    <img hidden={!isPlusIconActive} src={iconPlusActive} alt="plus" />
  </button>
  <div class="counter__label">{counter}</div>
  <button
    class="counter__button"
    on:click={decrement}
    on:focus={() => setIconActive('minus', true)}
    on:mouseover={() => setIconActive('minus', true)}
    on:mouseleave={() => setIconActive('minus', false)}
    on:blur={() => setIconActive('minus', false)}
  >
    <img hidden={isMinusIconActive} src={iconMinus} alt="minus" />
    <img hidden={!isMinusIconActive} src={iconMinusActive} alt="minus" />
  </button>
</div>

<style scoped>
  .counter {
    display: inline-flex;
    border-radius: 8px;
    background: var(--color-neutral-light-gray);
  }

  .counter--horizontal {
    display: inline-flex;
    align-items: baseline;
  }

  .counter--vertical {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    .counter--horizontal {
      display: inline-flex;
      align-items: baseline;
    }

    .counter--vertical {
      flex-direction: row;
      display: inline-flex;
      align-items: baseline;
    }
  }

  .counter__label {
    font-weight: 500;
    color: var(--color-primary-moderate-blue);
    text-align: center;
  }

  .counter--horizontal > .counter__label {
    min-width: 28px;
  }

  .counter--vertical > .counter__label {
    min-width: 50px;
  }

  .counter__button {
    background: transparent;
    width: 100%;
    padding: 1rem;
    border: none;
    cursor: pointer;
  }

  .counter__button > img[alt='minus'] {
    margin-bottom: 3px;
  }
</style>
