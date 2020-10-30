<template>
  <div>
    <DropD :config="config" @setSelectedOption="setSelectedAction($event)" class="mx-2"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import DropD from './atomic/dropdown.vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Filter',
  components: {
    DropD
  },
  props:{
    filterOptions: Array,
    placeholder: String,
    filterId: String,
    filtersToRemove: Array,
  },
  computed: {
    ...mapState([
       'filters'
    ]),
    config: function(): any {
      const options: Array<any> = []
      this.filterOptions.forEach(el => {
        options.push({id: this.filterId, value : el})
      });
      return {
          placeholder: this.placeholder,
          options: options,
          backgroundColor: "#ffffff",
          backgroundExpandedColor: "#ffffff",
          hoverBackgroundColor: "#b3dcff",
          textColor: "black",
          border: "1px solid #4d5559",
          disabled: false,
          selectedFilter: this.filters[this.filterId],
      }
    },
  },
  methods: {
    setSelectedAction(arg: any) {
      const storeFilters = this.filters
      this.filtersToRemove.forEach(function(f: any){ delete storeFilters[f] } );
      storeFilters[arg.id] = arg.value
      this.$store.commit('setFilters',storeFilters)
    },
    unsubscribe(): void{
      // console.log('here');
    },
  },
  created: function() {
     this.config.selectedFilter = this.filters[this.filterId]
     this.unsubscribe = this.$store.subscribe((mutation, state) => {
       if (mutation.type === 'setFilters') {
           this.config.selectedFilter = this.filters[this.filterId]
       }
     });
  },
  beforeDestroy(): void {
   this.unsubscribe();
  },
});
</script>
