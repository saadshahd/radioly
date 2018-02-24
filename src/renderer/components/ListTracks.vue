<template>
  <ul>
    <li v-for="item of items">
      <div class="flex">
        <div>
          <span v-if="item.title">{{item.title}}</span>
          <span v-else-if="item.name">{{item.name}}</span>

        </div>
        <div v-if="item.artist[0]"> by {{item.artist[0]}}</div>
        <div>
          <span v-for="genre of item.genre">{{genre}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'list-tracks',
    props: ['items'],
  };
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .flex {
    display: flex;
    justify-content: space-between;
  }
</style>
