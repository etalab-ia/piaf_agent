import Vue from 'vue'
import Vuex from 'vuex'
import {callInferenceAsync} from './api_utils'
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    question : undefined,
    answer : undefined,
    answers : [],
    filters : {},
  },
  mutations: {
    setQuestion(state,newQuestion) {
      state.question = newQuestion
    },
    setAnswers(state,res) {
      state.answers = res
    },
    setFilters(state,res) {
      state.filters = res
    },
  },
  actions: {
    async callInference({ commit, state, dispatch }) {
      const a = await callInferenceAsync(state.question, state.filters)
      if(a){
        commit('setAnswers', a[0].answers)
        return true
      }else{
        // eslint-disable-next-line
        console.log('problem loading the new paragraph');
        dispatch('reboot');
        router.push('Error')
        return false
      }
    },
    async reboot({ commit }) {
      commit('setAnswers', [])
      commit('setFilters', {})
    },
  },
  modules: {
  }
})
