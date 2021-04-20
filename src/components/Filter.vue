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
    depth: Number,
  },
  computed: {
    ...mapState([
       'filters'
    ]),
    config: function(): any {
      const options: Array<any> = []
      this.filterOptions.forEach(el => {
        options.push({id: this.filterId, value : el, depth: this.depth})
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
          selectedFilter: this.filters.find((fil: any) => fil["id"] === this.filterId)?.value,
      }
    },
  },
  methods: {
    setSelectedAction(arg: any) {
      let storeFilters = this.filters
      // here we keep filters with lower depth
      storeFilters = storeFilters.filter((fil: any) => fil.depth < this.depth)
      storeFilters.push({"id": arg.id, "value": arg.value, "depth": arg.depth})
      this.$store.commit('setFilters',storeFilters)
    },
    unsubscribe(): void{
      // console.log('here');
    },
  },
  created: function() {
     this.config.selectedFilter = this.filters.find((fil: any) => fil["id"] === this.filterId)?.value
     this.unsubscribe = this.$store.subscribe((mutation, state) => {
       if (mutation.type === 'setFilters') {
           this.config.selectedFilter = this.filters.find((fil: any) => fil["id"] === this.filterId)?.value
       }
     });
  },
  beforeDestroy(): void {
   this.unsubscribe();
  },
});
</script>
