require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

import 'scripts'
import 'styles'

// vue.js

import Vue from 'vue/dist/vue.esm';
import Rails from '@rails/ujs';
import draggable from 'vuedraggable';
import store from 'stores/list';
import { mapGetters, mapActions } from 'vuex';
import List from 'components/list';
import Newlist from 'components/newlist';

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board');

  if (el) {
    window.$store = store;
    new Vue({
      el,
      store,
      computed: {
        // ...mapGetters(["lists"])
        lists: {
          get() {
            return this.$store.state.lists;
          }, 

          set(value) {
            this.$store.commit('UPDATE_LISTS', value);
          }
        }
      },
      components: { List, Newlist, draggable }, 
      methods: {
        ...mapActions(["loadList", "moveList"]), 
      }, 
      beforeMount() {
        this.loadList();
      }
    });
  }
})
