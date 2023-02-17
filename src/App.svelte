<script lang="ts">
  import Badge from './components/Badge.svelte';
  import Button from './components/Button.svelte';
  import LikeCounter from './components/LikeCounter.svelte';
  import TextArea from './components/TextArea.svelte';
</script>

<main>
  <LikeCounter />
  <Button>Reply</Button>
  <Button color="red" type="outline">Delete</Button>
  <Button color="blue" type="text-only" icon="edit">Edit</Button>


  <Badge color="blue" size="sm">You</Badge>
  <Badge color="blue">You</Badge>
  <Badge color="blue" size="lg">You</Badge>

  <Badge color="red" type="outline" size="sm">2 months ago</Badge>
  <Badge color="red" type="outline">2 months ago</Badge>
  <Badge color="red" type="outline" size="lg">2 months ago</Badge>

  <Badge color="gray" type="text-only" size="sm">2 months ago</Badge>
  <Badge color="gray" type="text-only">2 months ago</Badge>
  <Badge color="gray" type="text-only" size="lg">2 months ago</Badge>

  <TextArea />
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
