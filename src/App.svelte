<script lang="ts">
  import { onMount } from 'svelte';
  import Badge from './components/Badge.svelte';
  import Button from './components/Button.svelte';
  import Comments from './components/Comment/Comments.svelte';
  import CommentsProvider from './components/Comment/CommentsProvider.svelte';
  import LikeCounter from './components/LikeCounter.svelte';
  import Modal from './components/Modal.svelte';
  import TextArea from './components/TextArea.svelte';
  import { useCommentsService } from './services/comments';
  import type { Comment, User } from './services/comments/types';

  export let openModal = false;

  const commentsService = useCommentsService();

  let comments: Comment[];
  let currentUser: User;

  onMount(async () => {
    currentUser = await commentsService.getCurrentUser();
    comments = await commentsService.getComments();
  });

  const onDelete = async (event: CustomEvent<{ id: number }>) => {
    await commentsService.deleteComment(event.detail.id);
    comments = await commentsService.getComments();
  };

  const onReply = (event: CustomEvent<{ id: number }>) => {
    console.log('reply to comment');
  };

  const onEdit = (event: CustomEvent<{ id: number; content: string }>) => {
    console.log('update comment');
  };
</script>

<main>
  <LikeCounter />
  <Button>REPLY</Button>
  <Button color="red" type="outline">Delete</Button>
  <Button color="blue" type="text-only" icon="edit">Edit</Button>
  <Button color="red" type="text-only" icon="delete">Delete</Button>
  <Button color="blue">SEND</Button>

  <Button color="gray">NO, CANCEL</Button>
  <Button color="red">YES, DELETE</Button>

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

  <Button
    on:click={() => {
      openModal = true;
    }}>Open Modal</Button
  >

  <Modal bind:open={openModal} title="Delete comment">
    <p>
      Are you sure you want to delete this comment? This will remove the comment and can't be
      undone.
    </p>

    <svelte:fragment slot="footer">
      <Button color="gray">NO, CANCEL</Button>
      <Button color="red">YES, DELETE</Button>
    </svelte:fragment>
  </Modal>

  <div class="container">
    <CommentsProvider>
      <Comments />
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
</style>
