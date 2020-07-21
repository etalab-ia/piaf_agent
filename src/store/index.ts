import Vue from 'vue'
import Vuex from 'vuex'
import {callInferenceAsync} from './api_utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    question : undefined,
    answer : undefined,
  },
  mutations: {
    setQuestion(state,newQuestion) {
      state.question = newQuestion
    },
    setAnswer(state,newAnswer) {
      state.answer = newAnswer
    },
  },
  actions: {
    async callInference({ commit, state }) {
      const a = await callInferenceAsync(state.question)
      if(a){
        console.log(a[0].answers[0]);

        commit('setAnswer', a[0].answers[0])
        return true
      }else{
        // eslint-disable-next-line
        console.log('problem loading the new paragraph');
        return false
      }
    },
  },
  modules: {
  }
})
