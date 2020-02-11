<template>
  <div class="list">
    <h2 class="header">{{ list.name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'List', 
  props: ["list"]
}
</script>

<style lang="scss" scoped>
.list {
  @apply .bg-gray-300 .mx-2 .w-64 .rounded;

  .header {
    @apply .px-3 .py-1 .font-bold;
  }
}
</style>
