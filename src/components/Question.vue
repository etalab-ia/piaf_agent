<template>
  <div>
    <div class="mb-1 mt-6 fr-search-bar justify-center">
      <input class="fr-input w-full max-w-screen-md w-11/12" id="question" type="text" placeholder="Poser votre question ici"
      v-on:keyup.enter="onClick" v-model="newQuestion">
    </div>
    <div class="mx-2 mt-0 mb-2 flex justify-center">
      <p v-if="error" id="text-input-error-desc-error" class="fr-error-text mt-0">
        {{error}}
      </p>
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
  computed: {
    error: function(): string {
      if (this.newQuestion === '') {
        return 'Votre question ne peut être vide'
      }else if (this.newQuestion.trim().slice(-1) !== '?') {
        return 'Votre question doit finir par un \'?\''
      }
      return ''
    }
  },
  methods: {
   onClick(){
     if (this.error === '') {
       this.$store.commit('setQuestion',this.newQuestion)
       this.$router.push('Answers')
     } else {
       return
     }

   }
  },


});
</script>
