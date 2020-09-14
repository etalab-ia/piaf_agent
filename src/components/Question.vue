<template>
  <div>
    <div class="mb-2 mt-6">
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-screen-md w-11/12" id="question" type="text" placeholder="Poser votre question ici"
      v-on:keyup.enter="onClick" v-model="newQuestion">
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-4" v-on:click="onClick">
      Chercher
    </button>
    <div class="text-center text-gray-600 mt-10 italic">
      <p>ex: "Quel est le coût d'un passeport ?"</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Question',
  data: () => ({
    newQuestion: '',
  }),
  methods: {
   onClick(){
     if(this.newQuestion.length >= 200) {return false}
     this.$store.commit('setQuestion',this.newQuestion)
     this.$router.push('Answer')
   }
  },


});
</script>
