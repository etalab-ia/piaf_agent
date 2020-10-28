<template>
  <div>
    <div class="w-11/12 max-w-screen-md mx-auto flex flex-row flex-no-wrap justify-start overflow-x-auto">
      <Fil v-for="(node, i) in filtersNodesReducesToCurrentDepth" :key="i" :placeholder="node.name" :filterOptions="getList(node)" :filterId="node.id" />
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
import filtersNodeNamesJson from '../../filtersNodeNames.json'

interface NodeElement {
  depth: number;
  name: string;
  id: string;
}

export default Vue.extend({
  name: 'Filters',
  components: {
    Fil
  },
  data: () => ({
    filtersNodeNames: filtersNodeNamesJson.nodes,
    filtersJson: filtersJson,
    filtersCurrentDepth: 0,
  }),
  computed: {
    ...mapState([
       'filters'
    ]),
    filtersNodesReducesToCurrentDepth: function(): any{
      return this.filtersNodeNames.filter(node => node.depth <= this.filtersCurrentDepth)
    },
  },
  methods: {
   onClick(){
     this.$store.dispatch('callInference');
   },
   getList(node: NodeElement){
     const nodes: any = JSON.parse(JSON.stringify(this.filtersNodesReducesToCurrentDepth))
     node = JSON.parse(JSON.stringify(node))
     let filtersSubTree: any = this.filtersJson
     // we have to go through each node, from the NodesNames definiton
     // then we take nodes one at a time, in their depth order
     // for each nodes, we check if it's already in the app filters
     // no => we stop here, and take a list of properties from the JSON
     // yes => we take the subtree for the JSON, and reiterate
     for (let i = 0; i < nodes.length; i++) {
       const LoopNode: any = nodes.filter((el: NodeElement) => el.depth === i).shift()
       // we are at the right node, we can retreive the list of choices for this filter
       if (node.depth === LoopNode.depth) {
         return Object.keys(filtersSubTree);
       }
       else{
         filtersSubTree = filtersSubTree[this.filters[LoopNode['id']]]
       }
     }
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
