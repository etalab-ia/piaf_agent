import Vue from 'vue'
import Vuex from 'vuex'
import {callInferenceAsync} from './api_utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    question : undefined,
    answer : undefined,
    answers : [],
  },
  mutations: {
    setQuestion(state,newQuestion) {
      state.question = newQuestion
    },
    setAnswers(state,res) {
      state.answers = res
    },
    setAnswer(state) {
      if (state.answers.length > 0) {
        state.answer = state.answers[0]
      }else{
        state.answer = undefined
      }
    },
  },
  actions: {
    async callInference({ commit, state }) {
      const a = await callInferenceAsync(state.question)
      if(a){
        commit('setAnswers', a[0].answers)
        commit('setAnswer', a)
        return true
      }else{
        // eslint-disable-next-line
        console.log('problem loading the new paragraph');
        return false
      }
    },
    async reboot({ commit }) {
      commit('setAnswers', [])
      commit('setAnswer', undefined)
    },
  },
  modules: {
  }
})
