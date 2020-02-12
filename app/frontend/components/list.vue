<template>
  <div class="list">
    <header>
      <h2 class="header">{{ list.name }}</h2>
      <a href="#" @click="deleteList">
        <i class="far fa-trash-alt"></i>
      </a>
    </header>

    <div class="deck">
      <draggable v-model="cards" ghost-class="ghost" group="list" @change="cardMoved">
        <Card v-for="card in cards" :card="card" :key="card.id"></Card>
      </draggable>

      <div class="input-area">
        <button v-if="!editing" class="button bg-gray-400" @click="newCard">新增卡片</button>
        <textarea v-if="editing" class="content" v-model="content"></textarea>
        <button v-if="editing" class="button bg-green-400" @click="createCard">建立卡片</button>
        <button v-if="editing" class="button bg-gray-400" @click="editing = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import Rails from '@rails/ujs';
import Card from 'components/card';
import draggable from 'vuedraggable';

export default {
  name: 'List', 
  props: ["list"], 
  components: { Card, draggable }, 
  data: function() {
    return {
      content: '', 
      cards: this.list.cards, 
      editing: false
    }
  }, 
  methods: {
    deleteList(event) {
      event.preventDefault();
      if (confirm('確認刪除列表?')) {
        this.$store.dispatch("removeList", this.list.id);
      }
    },

    cardMoved(event) {
      let evt = event.added || event.moved;
      if (evt) {
        let el = evt.element;
        let card_id = el.id;

        let data = new FormData();
        data.append("card[list_id]", this.list.id);
        data.append("card[position]", evt.newIndex + 1);

        Rails.ajax({
          url: `/cards/${card_id}/move`, 
          type: 'PUT', 
          data, 
          dataType: 'json', 
          success: resp => {
            console.log(resp);
          }, 
          error: err => {
            console.log(err);
          }
        });
      }
    },

    newCard(event) {
      event.preventDefault();
      this.editing = true;
    },

    createCard(event) {
      event.preventDefault();

      let data = new FormData();
      data.append("card[list_id]", this.list.id);
      data.append("card[name]", this.content);

      Rails.ajax({
        url: '/cards', 
        type: 'POST', 
        data, 
        dataType: 'json', 
        success: resp => {
          this.cards.push(resp);
          this.content = "";
          this.editing = false;
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.ghost {
  @apply .border-2 .border-gray-400 .border-dashed .bg-gray-200;
}

.list {
  @apply .bg-gray-300 .mx-2 .w-64 .rounded .px-3 .py-3 .flex-none .h-full;

  .header {
    @apply .font-bold;
  }

  .deck {
    @apply .mt-2;
  }


  .input-area {
    @apply .mt-2;

    .content {
      @apply .w-full .p-2 .rounded-sm;

      &:focus {
        @apply .outline-none;
      }
    }

    .button {
      @apply .px-3 .py-1 .font-semibold .text-sm .rounded;

      &:focus {
        @apply .outline-none;
      }
    }
  }
}

header {
  @apply .flex .justify-between .items-center;
}
</style>
