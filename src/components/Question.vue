<template>
  <div>
    <div class="mb-1 mt-6 fr-search-bar justify-center">
      <template v-if="autocompleteQuestions.activate">
        <autocomplete :search="retrieveSuggestions" :debounceTime="500" class="fr-input w-full max-w-screen-md w-11/12" placeholder="Poser votre question ici" @submit="handleAutoCompleteSubmit" ref="autocomplete"></autocomplete>
      </template>
      <template v-else>
        <input class="fr-input w-full max-w-screen-md w-11/12" id="question" type="text" placeholder="Poser votre question ici" v-on:keyup.enter="onClick" v-model="newQuestion">
      </template>
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
    <FAQ />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FAQ from "@/components/FAQ.vue";
// Waiting for types: https://github.com/trevoreyre/autocomplete/issues/58
// eslint-disable-next-line
// @ts-ignore
import Autocomplete from '@trevoreyre/autocomplete-vue'
import levenshtein from 'js-levenshtein'


export default Vue.extend({
  name: 'Question',
  components: { FAQ, Autocomplete },
  data: () => ({
    newQuestion: '',
    exampleQuestion: global.piafAgentConfig.EXAMPLE_QUESTION,
    autocompleteQuestions: global.piafAgentConfig.AUTOCOMPLETE_QUESTIONS
  }),
  computed: {
    error: function(): string {
      if (this.newQuestion === '') {
        return 'Votre question ne peut être vide'
      } else if (this.newQuestion.trim().slice(-1) !== '?') {
        return 'Votre question doit finir par un \'?\''
      }
      return ''
    }
  },
  methods: {
    retrieveSuggestions(input: string) {
      if (input.length < 1) { return [] }
      this.newQuestion = input;
      return this.autocompleteQuestions.questions
          .filter(question => {
            return question.toLowerCase().includes(input.toLowerCase())
          })
          .sort((first_string, second_string) => {
            return levenshtein(input, first_string) - levenshtein(input, second_string);
          })
          .slice(0, 10)
    },
    handleAutoCompleteSubmit(value: string | undefined) {
      if (value === undefined) {
        // Retrieving the value directly in the autocomplete component when no suggestion match
        // eslint-disable-next-line
        // @ts-ignore
        value = this.$refs.autocomplete?.value;
      }
      this.newQuestion = value ?? '';
      this.onClick();
    },
    onClick(){
      if (this.error === '') {
        this.$store.commit('setQuestion',this.newQuestion)
        this.$router.push('Answers')
      } else {
        return
      }
    },
  },


});
</script>

<style>
#app .autocomplete-input:focus {
  box-shadow: none;
  background-color: var(--g200);
  border-color: var(--g200);

}
</style>