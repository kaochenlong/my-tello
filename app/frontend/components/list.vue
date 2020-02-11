<template>
  <div class="list">
    <h2 class="header">{{ list.name }}</h2>

    <div class="deck">
      <Card v-for="card in list.cards" :card="card" :key="card.id"></Card>
    </div>
  </div>
</template>

<script>
import Card from 'components/card';

export default {
  name: 'List', 
  props: ["list"], 
  components: { Card }
}
</script>

<style lang="scss" scoped>
.list {
  @apply .bg-gray-300 .mx-2 .w-64 .rounded .px-3 .py-1 ;

  .header {
    @apply .font-bold;
  }

  .deck {
    @apply .mt-2;
  }
}
</style>
