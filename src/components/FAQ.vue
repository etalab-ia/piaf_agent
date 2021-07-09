<template>
  <div v-if="faq.data.length > 0" class="max-w-screen-md mx-auto mt-8 p-2">
    <h1 class="fr-display-xs">FAQ</h1>
    <ul class="fr-accordions-group">
      <li v-for="(line, i) in faq.data" :key="i + '-' + line.title">
        <section class="fr-accordion">
          <h3 class="fr-accordion__title">
            <button class="fr-accordion__btn" aria-expanded="false" :aria-controls="'accordion-' + i">{{line.title}}</button>
          </h3>
          <div class="fr-collapse" :id="'accordion-' + i">
            {{line.paragraphs[0].context}}
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'FAQ',
  data: () => ({
    faq: global.piafAgentConfig.FAQ,
  }),
  props: [
  ],
  methods: {
  },
});
</script>



<style>
</style>
