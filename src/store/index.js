import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	isLoaging:false
};

export default new Vuex.Store({
  state,
  getters:{
	  isLoaging(state){
		  return state.isLoaging
	  }
  },
  mutations:{
	  getloading(state,data){
		  state.isLoaging=data
	  }
  },
  actions:{
	  getloading({commit},data){
		  commit('getloading',data)
	  }
  }
});
