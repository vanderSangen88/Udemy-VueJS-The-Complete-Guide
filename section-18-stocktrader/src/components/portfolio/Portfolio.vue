<template>
  <div>
    <app-stock v-for="(stock, i) in stocks" :key="i" :stock="stock"></app-stock>
  </div>
</template>

<script>
// import helper method 'mapGetters'
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';

export default {
  computed: {
    ...mapGetters({ // Pass object to use different name for getter
      stocks: 'stockPortfolio'
    })
  },
  components: {
    appStock: Stock
  }
}
</script>
