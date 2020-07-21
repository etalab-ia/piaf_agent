<template>
  <div class="mt-10">
    <div v-if="ready">
      <div v-if="trustable" class="mb-10">
        <p class="italic">Indice de conficance : {{ Number(answer.probability * 100).toLocaleString('fr',{maximumSignificantDigits:2}) }} %</p>
        <div class="alignLeft paragraph w-11/12 max-w-screen-md mx-auto mt-8" ref="answ">
          <span>{{answer.context}}</span>
        </div>
      </div>
      <div v-else class="mb-10">
        <p class="italic">Indice de conficance trop faible : {{ Number(answer.probability * 100).toLocaleString('fr',{maximumSignificantDigits:2}) }} %. Nous ne pouvons afficher la réponse.</p>
      </div>
      <a href="/" class="rounded bg-blue-700 text-white hover:bg-blue-800 p-1">Poser une nouvelle question</a>
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
import SelectText from '@vinyll/selecttext'

export default Vue.extend({
  name: 'Answer',
  data: () => ({
    ready: false,
    trustable: false,
  }),
  computed: {
    ...mapState([
     'answer',
   ]),
 },
  components: {
    Spinner
  },
  methods: {
    printAnswer() {
      const paragraph = this.$refs.answ
      const selector = new SelectText(paragraph)
      selector.addSelection(paragraph.textContent.indexOf(this.answer.answer),this.answer.answer.length)

      // here we have to clone this to remove the addeventlistner that selects text
      const elClone = selector.container.cloneNode(true);
      paragraph.parentNode.replaceChild(elClone, paragraph);
    },
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  created: function() {
    this.$store.dispatch('callInference');

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setAnswer') {
        if (state.answer) {
          this.ready = true
          if (Number(state.answer.probability) > 0.90) {
            this.trustable = true
            // we need the timeout otherwise $refs is undefined
            setTimeout(() => this.printAnswer() , 500)
          }

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
