<template>
  <div class="mt-10 mb-4">
    <div v-if="ready">
      <div v-if="answers.length > 0">
        <Filters v-if="useFilters"/>
        <div class="my-3">
          <span class="italic font-bold">{{this.question}}</span>
        </div>
        <Answer :answer="answer" :question="question" v-for="(answer, i) in answers" :key="i + '-' + answer.probability"/>
        <span v-if="allowFeedback">
          <div class="my-6" v-if="!ratingSent">
            <h3>Satisfait des résultats de votre recherche ?</h3>
            <star-rating
              v-model="rating"
              :class="'flex justify-center'"
              :rating="4"
              :increment="0.01"
              :fixed-points="2"
              :show-rating="false"
              :animate="true"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
              @rating-selected="sendFeedbacks"
              ></star-rating>
          </div>
          <div class="my-6" v-else>
            <h3>Merci, nous avons pris en compte votre avis</h3>
          </div>
        </span>
        <router-link class="fr-btn" :to="{ name: 'Home' }">Poser une nouvelle question</router-link>
      </div>
      <div v-else>
        Pas de réponse pour la question <span class="italic font-bold">{{this.question}}</span><br><br>
        <router-link class="rounded bg-blue-700 text-white hover:bg-blue-800 p-1" :to="{ name: 'Home' }">Poser une nouvelle question</router-link><br><br>
        <span v-if="useFilters">ou modifier les filtres</span>
        <Filters v-if="useFilters"/>
      </div>
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
import Filters from './Filters.vue'
import Answer from './Answer.vue'
import StarRating from 'vue-star-rating'
import {sendFeedbackAsync} from '../store/api_utils'
import {Feedback} from '../feedback'

export default Vue.extend({
  name: 'Answers',
  data: () => ({
    ready: false,
    useFilters: global.piafAgentConfig.FILTERS.data.length > 0,
    allowFeedback: global.piafAgentConfig.ALLOW_FEEDBACK,
    rating: 0,
    ratingSent: false
  }),
  computed: {
    ...mapState([
     'answers',
     'question'
   ]),
 },
  components: {
    Spinner,
    Answer,
    Filters,
    StarRating
  },
  methods: {
    // here we have to define unsubscribe (otherwise, Typescirpt says this has no funciton such as unsubscribe)
    unsubscribe(): void{
      // console.log('here');
    },
    unsubscribe2(): void{
      // console.log('here');
    },
    sendFeedbacks(): void{
      const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
      console.log('\nrating:',this.rating, ' | isbot:',isBot);
      // we take this hypothesis: if rating < 3 then all answers are considered wrong
      // if satisfied, we can't tell which answer is correct from here.
      // so we don't do anything : we hope the person clicks on the link
      // since clicking the link will send a positive feedback on this answer
      if(this.rating < 3){
        for (const obj of this.answers) {
          const feedback: Feedback = {
            question: this.question,
            is_correct_answer: false,
            document_id: obj.document_id,
            model_id: obj.model_id,
            is_correct_document: false,
            answer: obj.answer,
            offset_start_in_doc: obj.offset_start
          }
          sendFeedbackAsync(feedback)
          if (global.piafAgentConfig.MATOMO) {
            // first we save the rating
            window._paq.push(['trackEvent', 'search', window.location.pathname, 'rating' , this.rating])
          }
        }
      }
      this.ratingSent = true
    }
  },
  beforeDestroy(): void {
    this.unsubscribe();
    this.unsubscribe2();
  },
  created: function() {
    this.$store.dispatch('callInference');

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setAnswers') {
        if (state.answers) {
          this.ready = true
        }
      }
    });

    this.unsubscribe2 = this.$store.subscribeAction((action) => {
      if (action.type === 'callInference') {
        this.ready = false
      }
    })

    // then we save the search results
    window._paq.push(['trackSiteSearch',
      // Search keyword searched for
      this.question,
      // Search category selected in your search engine.
      window.location.pathname,
      this.answers.length
    ]);
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
