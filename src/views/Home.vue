<template>
  <div class="home">
    <Head/>
    <Question/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue'
import Head from '@/components/Head.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Head,
    Question,
    Footer,
  },
  mounted: function() {
    this.$store.dispatch('reboot');
  },
}
</script>
