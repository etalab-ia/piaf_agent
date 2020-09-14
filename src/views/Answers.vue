<template>
  <div>
    <Head/>
    <Answers/>
  </div>
</template>

<script>
// @ is an alias to /src
import Answers from '@/components/Answers.vue'
import Head from '@/components/Head.vue'

export default {
  name: 'Home',
  components: {
    Head,
    Answers
  }
}
</script>
