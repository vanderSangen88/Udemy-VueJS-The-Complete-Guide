<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">

      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h3>
      </div>

      <div class="panel-body">
        <div class="pull-left">
          <input type="number" class="form-control" placeholder="Quantity" v-model="quantity">
        </div>
        
        <div class="pull-right">
          <button class="btn btn-success" :class="{'btn-danger': insufficientFunds}" @click="buyStock" :disabled="quantity <= 0 || !Number.isInteger(parsedQuantity) || insufficientFunds">Buy</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    }
  },
  computed: {
    parsedQuantity(){
      // console.log("Parsing quantity string to number...");
      return Number(this.quantity);
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };

      // Call action and pass order as payload
      this.$store.dispatch('buyStock', order);
      
      this.quantity = 0;
    }
  }
}
</script>

