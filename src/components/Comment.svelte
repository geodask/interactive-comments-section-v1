<script langs="ts">
  import avatar from '../assets/images/avatars/image-amyrobson.png';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import LikeCounter from './LikeCounter.svelte';
</script>

<div class="comment">
  <div class="comment__like-counter">
    <LikeCounter orientation="vertical" />
  </div>

  <div class="comment__user-info">
    <img class="comment__user-avatar" width="40" src={avatar} alt="avatar" />
    <div class="comment__user-name">amyrobson</div>
    <Badge color="blue" size="sm">you</Badge>
  </div>

  <div class="comment__date">
    <Badge color="gray" type="text-only" size="lg">1 month ago</Badge>
  </div>

  <div class="comment__buttons">
    <Button icon="reply" type="text-only">Reply</Button>
  </div>

  <p class="comment__content">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatem aliquid sequi quod
    molestiae illum nemo exercitationem sit totam eveniet atque, asperiores possimus officiis
    inventore eos. Tempore doloribus deleniti placeat excepturi odio id, perspiciatis alias saepe
    sequi, suscipit laudantium! Libero nisi quas praesentium ut deserunt corrupti architecto et
    assumenda natus!
  </p>
</div>

<style scoped>
  .comment {
    display: grid;
    grid-template-columns: auto auto 1fr 1fr;
    grid-template-rows: auto 1fr;
    background: var(--color-neutral-white);
    column-gap: 20px;
    padding: 20px;
    border-radius: 12px;
  }

  .comment__like-counter {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    align-self: flex-start;
  }

  .comment__user-info {
    grid-column: 2 / 3;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    font-weight: 700;
    color: var(--color-neutral-dark-blue);
  }

  .comment__date {
    align-self: center;
  }
  .comment__buttons {
    justify-self: flex-end;
  }

  .comment__content {
    grid-row: 2 / 3;
    grid-column: 2 / 5;
    color: var(--color-neutral-grayish-blue);
  }
</style>
