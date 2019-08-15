<template>
  <div class="card">
    <card1></card1>
  </div>
</template>

<script>
// "topnav": () => import("../first/components/topnav"),
// import card1 from './cards/card1'
export default {
  name:"card",
  data() {
    return {

    };
  },
  
  methods: {
     
  },
  components: {
    card1: () => import('./cards/card1'),
    // card2: () => import('./cards/card2'),
    // card3: () => import('./cards/card3')
  },
};
</script>

<style scoped>
</style>
