<template>
  <div>
    <!-- <div class="mb-2 mt-6 mx-2">
      <button  @click="isOpen = !isOpen"  class="block h-8 rounded-lg overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
        {{placeholdder}}
      </button>
    </div>
    <div v-if="isOpen"  class="mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
      <a v-for="option in filterOptions" :key="option" href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"> {{option}}</a>
    </div> -->
    <DropD :config="config" @setSelectedOption="myLocalSetterFunction($event)"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import DropD from './atomic/dropdown.vue'

export default Vue.extend({
  name: 'Filter',
  data: () => ({
    isOpen: false
  }),
  components: {
    DropD
  },
  props:{
    filterName: String,
    filterOptions: Array,
    placeholder: String,
  },
  computed: {
    config: function() {
      return {
          placeholder: this.placeholder,
          // width:"1.5em",
          options: [
              {
                  value: "option 1"
              },
              {
                  value: "option 2"
              }
          ],
          backgroundColor: "green",
          hoverBackgroundColor: "blue",
          disabled: false,
      }
    },
  },
  created() {
    console.log(process.env.VUE_APP_FILTER_JSON);

    const handleEscape: any = (e: any) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
    document.addEventListener('keydown', handleEscape)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape)
    })
  }

});
</script>
