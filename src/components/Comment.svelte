<script langs="ts">
  const image = import('../assets/images/avatars/image-amyrobson.png');
</script>

<div class="comment">
  {#await image}
    <div>loading...</div>
  {:then { default: avatar }}
    <img src={avatar} alt="avatar" />
  {/await}
  <div>amyrobson</div>
  <div>1 month ago</div>
  <div>
    <img src="/src/assets/images/icon-reply.svg" alt="reply" />
    Reply
  </div>
</div>
