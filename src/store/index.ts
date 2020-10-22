import Vue from 'vue'
import Vuex from 'vuex'
import {callInferenceAsync} from './api_utils'

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
    async callInference({ commit, state }) {
      const a = await callInferenceAsync(state.question, state.filters)
      if(a){
        commit('setAnswers', a[0].answers)
        return true
      }else{
        // eslint-disable-next-line
        console.log('problem loading the new paragraph');
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
