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
      state.answers = res[0].answers
    },
    setAnswer(state) {
      if (state.answers.length > 0) {
        state.answer = state.answers[0]
      }
    },
  },
  actions: {
    async callInference({ commit, state }) {
      const a = await callInferenceAsync(state.question)
      if(a){
        commit('setAnswers', a)
        commit('setAnswer', a)
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
