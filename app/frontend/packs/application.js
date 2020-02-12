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
import List from 'components/list';
import Rails from '@rails/ujs';
import draggable from 'vuedraggable';

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board');

  if (el) {
    new Vue({
      el,
      data: {
        lists: []
      }, 
      components: { List, draggable }, 
      methods: {
        listMoved(event) {
          console.log(event);

          let data = new FormData();
          data.append("list[position]", event.moved.newIndex + 1);

          Rails.ajax({
            url: `/lists/${this.lists[event.moved.newIndex].id}/move`, 
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
      beforeMount() {
        Rails.ajax({
          url: '/lists.json', 
          type: 'GET', 
          dataType: 'json', 
          success: resp => {
            this.lists = resp;
          }, 
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }
})
