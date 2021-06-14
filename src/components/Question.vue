<template>
  <div>
    <div class="mb-2 mt-6 fr-search-bar justify-center">
      <input class="fr-input w-full max-w-screen-md w-11/12" id="question" type="text" placeholder="Poser votre question ici"
      v-on:keyup.enter="onClick" v-model="newQuestion">
    </div>
    <button class="fr-btn" v-on:click="onClick" title="Rechercher">
      Chercher
    </button>
    <div class="text-center text-gray-600 mt-10 italic">
      <p>ex: "{{exampleQuestion}}"</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Question',
  data: () => ({
    newQuestion: '',
    exampleQuestion: global.piafAgentConfig.EXAMPLE_QUESTION
  }),
  methods: {
   onClick(){
     this.$store.commit('setQuestion',this.newQuestion)
     this.$router.push('Answers')
   }
  },


});
</script>
