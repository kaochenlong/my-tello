<template>
  <div>
    <div class="card" @click="editing = true">
      {{ card.name }}
    </div>

    <div v-if="editing" class="dialog">
      <div class="inner">
        <a href="#" class="closeButton" @click="close">
          <i class="fas fa-times"></i>
        </a>
        <textarea class="content">{{ card.name }}</textarea>
        <button class="updateButton" @click="update">更新</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card', 
  data: function() {
    return {
      editing: false
    }
  },
  props: ['card'], 
  methods: {
    close(event) {
      event.preventDefault();
      this.editing = false;
    }, 

    update(event) {
      event.preventDefault();
      this.editing = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @apply .bg-gray-100 .mb-2 .rounded-sm .px-2 .py-2 .cursor-pointer;
}

.dialog {
  background-color: rgba(0, 0, 0, 0.7);
  @apply .fixed .w-full .h-full .top-0 .left-0 .flex .items-center .justify-center;

  .inner {
    @apply .bg-white .flex .flex-col .px-6 .py-2;
    width: 700px;

    .closeButton {
      @apply .text-gray-800 .text-right;
    }

    .content {
      @apply .px-2 .py-2 .border .border-gray-300 .mt-2;

      &:focus {
        @apply .outline-none;
      }
    }

    .updateButton {
      @apply .bg-gray-400 .px-3 .py-2 .mt-2 .rounded;

      &:focus {
        @apply .outline-none;
      }
    }
  }
}
</style>
