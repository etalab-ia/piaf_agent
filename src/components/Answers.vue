<template>
  <div class="mt-10">
    <div v-if="ready && answer">
      <Answer :answer="answer"/>
      <router-link class="rounded bg-blue-700 text-white hover:bg-blue-800 p-1" :to="{ name: 'Home' }">Poser une nouvelle question</router-link>
    </div>
    <div v-else>
    <Spinner/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex'
import Spinner from './Spinner.vue'
import Answer from './Answer.vue'
import SelectText from '@vinyll/selecttext'

export default Vue.extend({
  name: 'Answers',
  data: () => ({
    ready: true,
  }),
  computed: {
    ...mapState([
     'answer',
   ]),
 },
  components: {
    Spinner,
    Answer
  },
  methods: {
    // here we have to define unsubscribe (otherwise, Typescirpt says this has no funciton such as unsubscribe)
    unsubscribe(): void{
      console.log('here');
    },
  },
  beforeDestroy(): void {
    this.unsubscribe();
  },
  created: function() {
    this.$store.dispatch('callInference');

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setAnswer') {
        if (state.answer) {
          this.ready = true
        }
      }
    });
  },

});
</script>



<style>
.paragraph span {
  cursor: pointer;
  user-select: none;
}
.paragraph span.first {
  color: #ffffff;
  background-color: #4169e1;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.paragraph span.last {
  color: #ffffff;
  background-color: #4169e1;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.paragraph span.selected {
  color: #ffffff;
  background-color: #4169e1;
}
</style>
