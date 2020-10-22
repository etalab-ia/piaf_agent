<template>
  <div>
    <div class="w-11/12 max-w-screen-md mx-auto flex flex-row flex-no-wrap justify-start overflow-x-auto">
      <Fil :placeholder="'Dossier'" :filterOptions="['Famille','Argent']" />
      <Fil :placeholder="'Theme'" :filterOptions="['gosse','divorce']" />
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-4" v-on:click="onClick">
      Affiner la recherche
    </button>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Fil from './Filter.vue' //Filter is a reserved word and won't work

export default Vue.extend({
  name: 'Filters',
  components: {
    Fil
  },
  data: () => ({
    newFilter: {},
  }),
  methods: {
   onClick(){
     // this.$router.push('Answers')
   }
  },
  created() {
    console.log(process.env.VUE_APP_FILTER_JSON);

  }


});
</script>
