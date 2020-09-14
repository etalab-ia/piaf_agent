<template>
  <div class="home">
    <Head/>
    <Question/>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue'
import Head from '@/components/Head.vue'

export default {
  name: 'Home',
  components: {
    Head,
    Question
  },
  mounted: function() {
    this.$store.dispatch('reboot');
  },
}
</script>
