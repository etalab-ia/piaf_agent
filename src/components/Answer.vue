<template>
  <div v-if="displayAnswer()" class="mb-10">
    <div class="alignLeft paragraph w-11/12 max-w-screen-md mx-auto mt-8 p-2 text-left border-blue-400 border-2 rounded border-solid relative">
      <p class="italic text-left rounded text-white px-2" style="width:fit-content" v-bind:class="bgColorTrust()" v-if="displayProbability">
        Indice de confiance : {{ Number(answer.probability * 100).toLocaleString('fr',{maximumSignificantDigits:2}) }} %
      </p>
      <p class="flex fr-tag ml-auto" style="width:fit-content" v-if="tagname !== ''">
        <span>{{ answer.meta[tagname] }}</span>
      </p>
      <p v-if="displayTitle()" class="mt-2 truncate underline">
        {{answer.meta.name}}
      </p>
      <div ref="answ">
        <span>{{getContext()}}</span><span v-if="getContext().slice(-1) !== '.'">...</span>
      </div>
      <a v-if="answer.meta && answer.meta.link" class="text-blue-800 hover:text-blue-600 absolute border-blue-400 border-2 rounded-lg border-solid bg-white px-1 link" :href="answer.meta.link" target="_blank" @click="sendFeedback"> <i></i>lien vers la fiche</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import SelectText from '@vinyll/selecttext'
import {sendFeedbackAsync} from '@/store/api_utils'
import {Feedback} from '@/feedback'

export default Vue.extend({
  name: 'Answer',
  data: () => ({
    displayProbability: global.piafAgentConfig.DISPLAY_PROBABILITIES,
    allowFeedback: global.piafAgentConfig.ALLOW_FEEDBACK,
    tagname: global.piafAgentConfig.TAGNAME
  }),
  props: [
    'answer',
    'question',
  ],
  methods: {
    answerified() {
      return this.answer.meta.answerified ?? false
    },
    displayTitle(): boolean {
      return !(this.answerified()) && global.piafAgentConfig.DISPLAY_TITLES && this.answer.meta.name
    },
    displayAnswer(): boolean {
      return Number(this.answer.probability) > 0.2 || (this.answer?.meta?.weight ?? 0) > 50
    },
    getContext(): string {
      if (this.answerified()) {
        return this.answer.context.substring(0, 200)
      } else {
        return  this.answer.context
      }
    },
    printAnswer(): void{
      const paragraph: any = this.$refs.answ
      if (!paragraph) {
        return
      }
      if (!this.answerified()) {
        const selector = new SelectText(paragraph)
        selector.addSelection(paragraph.textContent.indexOf(this.answer.answer), this.answer.answer.length)

        // here we have to clone this to remove the addeventlistner that selects text
        const elClone = selector.container.cloneNode(true);
        paragraph.parentNode.replaceChild(elClone, paragraph);
      }
    },
    // here we have to define unsubscribe (otherwise, Typescirpt says this has no funciton such as unsubscribe)
    unsubscribe(): void{
      // console.log('here');
    },
    bgColorTrust(): string {
      let bgColor: string
      if (this.answer.probability < 0.5) {
        bgColor = 'bg-red-700'
      } else if (this.answer.probability < 0.6) {
        bgColor = 'bg-orange-700'
      } else if (this.answer.probability < 0.7) {
        bgColor = 'bg-yellow-600'
      } else if (this.answer.probability < 0.8) {
        bgColor = 'bg-teal-700'
      } else if (this.answer.probability < 0.9) {
        bgColor = 'bg-green-600'
      } else {
        bgColor = 'bg-green-800'
      }
      return bgColor
    },
    sendFeedback(): void{
      if(!this.allowFeedback){
        return
      }
      const feedback: Feedback = {
        question: this.question,
        is_correct_answer: true,
        document_id: this.answer.document_id,
        model_id: this.answer.model_id,
        is_correct_document: true,
        answer: this.answer.answer,
        offset_start_in_doc: this.answer.offset_start
      }
      sendFeedbackAsync(feedback)
      return
    }
  },
  beforeDestroy(): void {
    this.unsubscribe();
  },
  mounted: function() {
    this.$nextTick(function () {
      // execute this only after the HTML get fully rendered
      this.printAnswer()
    })
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
.link {
  bottom: -15px;
  right: 10px;
}
</style>
