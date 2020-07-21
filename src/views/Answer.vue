<template>
  <div>
    <Head/>
    <Answer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Answer from '@/components/Answer.vue'
import Head from '@/components/Head.vue'

export default {
  name: 'Home',
  components: {
    Head,
    Answer
  }
}
</script>
