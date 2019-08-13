<template>
    <div class="detail">
        <shop1></shop1>
        <shop2></shop2>
    </div>
</template>

<script>

  export default {
    name: "Detail",
    data(){
        return {

        }
    },
  mounted(){
  },
    components:{
        "shop1": ()=> import ('./shops/shop1'),
        "shop2": ()=> import ('./shops/shop2'),
    }
}
</script>

<style scoped>

</style>
