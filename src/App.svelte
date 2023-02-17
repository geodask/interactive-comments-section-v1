<script lang="ts">
  import Comment from './components/Comment.svelte';
  import LikeCounter from './components/LikeCounter.svelte';
</script>

<main>
  <!-- <Comment /> -->
  <LikeCounter />
  <LikeCounter />

</main>

<footer>
  <div class="attribution">
    Challenge by
    <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer"
      >Frontend Mentor</a
    >. Coded by <a href="https://github.com/geodask">geodask</a>.
  </div>
</footer>

<style>
  .attribution {
    font-size: 11px;
    text-align: center;
  }
  .attribution a {
    color: hsl(228, 45%, 44%);
  }
</style>
