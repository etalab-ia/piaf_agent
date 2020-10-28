<template>
  <div class="home">
    <Head/>
    <div class="mt-10">
      <div>
        Il y a eu un erreur, désolé pour ça ! <br><br>
        <router-link class="rounded bg-blue-700 text-white hover:bg-blue-800 p-1" :to="{ name: 'Home' }">Poser une nouvelle question</router-link>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Head from '@/components/Head.vue'

export default Vue.extend({
  name: 'Error',
  components : {
    Head,
  },
});
</script>
