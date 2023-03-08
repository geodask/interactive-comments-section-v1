<script lang="ts">
  import CommentNew from '@/components/views/comments/CommentNew.svelte';
  import Comments from '@/components/views/comments/Comments.svelte';
  import CommentsProvider from '@/components/providers/CommentsProvider.svelte';
</script>

<main>
  <div class="container">
    <CommentsProvider>
      <Comments />
      <CommentNew open />
    </CommentsProvider>
  </div>
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
  .container {
    width: 50%;
    margin: auto;
  }
  .attribution {
    font-size: 11px;
    text-align: center;
  }
  .attribution a {
    color: hsl(228, 45%, 44%);
  }

  @media (max-width: 1024px) {
    .container {
      width: 100%;
      padding: 1rem;
    }
  }
</style>
