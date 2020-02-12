import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import Rails from '@rails/ujs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: []
  }, 

  getters: {
    lists: state => state.lists
  }, 

  mutations: {
    UPDATE_LISTS(state, lists) {
      state.lists = lists;
    }
  }, 

  actions: {
    moveList({ commit, state }, event) {
      let data = new FormData();
      data.append("list[position]", event.moved.newIndex + 1);

      Rails.ajax({
        url: `/lists/${state.lists[event.moved.newIndex].id}/move`, 
        type: 'PUT', 
        data,
        dataType: 'json'
      });
    }, 

    loadList({ commit }) {
      Rails.ajax({
        url: '/lists.json', 
        type: 'GET', 
        dataType: 'json', 
        success: resp => {
          commit("UPDATE_LISTS", resp);
        }, 
        error: err => {
          console.log(err);
        }
      });
    }

  }
});
