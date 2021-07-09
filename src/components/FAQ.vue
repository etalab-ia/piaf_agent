<template>
  <div class="mb-10" v-if="faq.data.length > 0">
    FAQ
    <div v-for="(line, i) in faq.data" :key="i + '-' + line.title">
      <div class="mb-10">
        <div class="alignLeft w-11/12 max-w-screen-md mx-auto mt-8 p-2 text-left border-blue-400 border-2 rounded border-solid relative">
          <p class="mt-2 truncate underline">
            {{line.title}}
          </p>
          <div>
            <span>{{line.paragraphs[0].context}}</span>
          </div>
          <a v-if="line.link" class="text-blue-800 hover:text-blue-600 absolute border-blue-400 border-2 rounded-lg border-solid bg-white px-1 link" :href="line.link" target="_blank"> <i></i>lien vers la fiche</a>
        </div>
      </div>
    </div>
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
