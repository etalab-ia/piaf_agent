<template>
  <div class="home">
    <router-link :to="{ name: 'Home' }">
    <img alt="Piaf logo" src="../assets/logopiaf.png" style="max-height:120px;max-width:120px;" class="mx-auto mt-8"></router-link>
    <h1 class="m-0 mt-1 text-5xl"> <span class="text-red-600">PIAF</span> & <span style="color:#47abd9">{{clientName}}</span></h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Head',
  data: () => ({
    clientName: global.piafAgentConfig.DISPLAY_NAME
  }),
});
</script>
