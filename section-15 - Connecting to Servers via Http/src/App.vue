<template>
  <router-view :searchInit="search"></router-view>
</template>

<script>
export default {
 data(){
   return {
     search: "Avengers"
   }
 }
};
</script>

<style>

</style>
