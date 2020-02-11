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

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board');

  if (el) {
    new Vue({
      el,
      data: {
        lists: JSON.parse(el.dataset.lists)
      }, 
      components: { List }
    });
  }
})
