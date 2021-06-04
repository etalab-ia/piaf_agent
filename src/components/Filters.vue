<template>
  <div>
    <div class="w-11/12 max-w-screen-md mx-auto flex flex-row flex-no-wrap justify-start overflow-x-auto">
      <Fil v-for="(node, i) in filtersAsArray" :key="i + node.type" :placeholder="node.type.replace('_',' ')" :filterOptions="node.options" :filterId="node.type" :depth="node.depth"/>
    </div>
    <button class="bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 border border-blue-700 rounded mt-4" v-on:click="onClick">
      Affiner la recherche
    </button>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex'
import Fil from './Filter.vue' //Filter is a reserved word and won't work
import { FilterData } from '@/config'

interface FilterArrElement {
  depth: number;
  id: string;
  type: string;
  options: Array<string>;
}

interface TreeNode {
  id: string;
  type: string;
  name: string;
  data: Array<any>;
}

export default Vue.extend({
  name: 'Filters',
  components: {
    Fil
  },
  data: () => ({
    filtersJson: global.piafAgentConfig.FILTERS.data,
    filtersCurrentDepth: 0,
  }),
  computed: {
    ...mapState([
       'filters'
    ]),
    filtersAsArray: function(): Array<FilterArrElement>{
      const arr: Array<FilterArrElement> = []
      let tree: FilterData[] | undefined = this.filtersJson
      let type: string
      let idInFilter: any
      let idInFilterId: string
      let options: Array<string>
      for (let i = 0; i <= this.filtersCurrentDepth; i++) {
        // if tree is not defined, the we quit
        if (!tree) {
          console.log('tree not defined => we stop here');
          return arr
        }
        // at specific depth, all types are the same.
        type = tree[0].type
        // let's grab the value to filter by for this type of filter
        const filStable: any = JSON.parse(JSON.stringify(this.filters))

        idInFilter = filStable.find((fil: any) => fil["id"] === type)
        idInFilterId = (idInFilter) ? idInFilter["id"] : undefined

        options = tree?.map((el) => el.name)
        // we store in the array every info required to display a filter button

        arr.push({ depth: i, id: idInFilterId, type: type, options: options})
        // let go one step down into our tree
        if (idInFilter) {
          console.log(tree?.find((obj: TreeNode) => obj.name === idInFilter));
          console.log('i:',i,'tree',tree,'idInFilter',idInFilter);

          tree = tree?.find((obj: TreeNode) => obj.name === idInFilter.value)?.data
        }else if (i != this.filtersCurrentDepth){
          console.log('probably a bug here');
          return arr
        }
      }
      return arr
    },
  },
  methods: {
   onClick(){
     this.$store.dispatch('callInference');
   },

   unsubscribe(): void{
     // console.log('here');
   },
  },
  created: function() {
    this.filtersCurrentDepth = this.filters.length;

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setFilters') {
          this.filtersCurrentDepth = this.filters.length
      }
    });
  },
  beforeDestroy(): void {
    this.unsubscribe();
  },
});
</script>
