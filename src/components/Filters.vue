<template>
  <div>
    <div class="w-11/12 max-w-screen-md mx-auto flex flex-row flex-no-wrap justify-start overflow-x-auto">
      <Fil v-for="(node, i) in filtersAsArray" :key="i + node.type" :placeholder="node.type.replace('_',' ')" :filterOptions="node.options" :filterId="node.type" :filtersToRemove="filtersToRemoveIfChanging(node.depth)"/>
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-4" v-on:click="onClick">
      Affiner la recherche
    </button>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex'
import Fil from './Filter.vue' //Filter is a reserved word and won't work
import filtersJson from '../../filters.json'

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
    filtersJson: filtersJson.data,
    filtersCurrentDepth: 0,
  }),
  computed: {
    ...mapState([
       'filters'
    ]),
    filtersAsArray: function(): Array<FilterArrElement>{
      const arr: Array<FilterArrElement> = []
      let tree: any = this.filtersJson
      let type: string
      let idInFilter: string
      let options: Array<string>
      for (let i = 0; i <= this.filtersCurrentDepth; i++) {
        // if tree is not defined, the we quit
        if (!tree) {
          console.log('tree not defined => we stop here');
          return arr
        }
        // at specific depth, all types are the same.
        type = tree[0]['type']
        // let's grab the value to filter by for this type of filter
        const filStable: any = JSON.parse(JSON.stringify(this.filters))

        idInFilter = (filStable && type && Object.prototype.hasOwnProperty.call(filStable,type)) ? filStable[type] : undefined

        options = tree?.map((el: any) => el.name)
        // we store in the array every info required to display a filter button

        arr.push({ depth: i, id: idInFilter, type: type, options: options})
        // let go one step down into our tree
        if (idInFilter) {
          console.log(tree.find((obj: TreeNode) => obj.name === idInFilter));
          console.log('i:',i,'tree',tree,'idInFilter',idInFilter);

          tree = tree.find((obj: TreeNode) => obj.name === idInFilter).data
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

   // this function provides with the name of the properties that will be deleted if the filter is changed : meaning the properties bellow this one
   filtersToRemoveIfChanging(depth: number){
     const nodes: any = JSON.parse(JSON.stringify(this.filtersAsArray))
     return nodes.filter((node: any) => depth < node.depth && node.id).map((node: any) => node.type)
   },
   unsubscribe(): void{
     // console.log('here');
   },
  },
  created: function() {
    this.filtersCurrentDepth = Object.keys(this.filters ? this.filters : []).length;

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setFilters') {
          this.filtersCurrentDepth = Object.keys(this.filters).length
      }
    });
  },
  beforeDestroy(): void {
    this.unsubscribe();
  },
});
</script>
