<template>
  <div>
    <v-data-table
      :loading="!instrumentsGetter.length"
      loading-text="Loading..."
      :headers="headers"
      :items="instrumentsGetter"
      class="elevation-1"
    >
      <template v-slot:item.symbol="{ item }">
        <router-link :to="`/history/${item.symbol}`" style="text-decoration:none">
          <h3>{{item.symbol}}</h3>
        </router-link>
      </template>
      <template v-slot:item.lastPrice="{ item }">
        <p style="cursor:pointer" @click="openModal(item.symbol)">{{item.lastPrice}}</p>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500">
      <v-card class="container">
        <v-card-title class="headline">Choose an action</v-card-title>
        <v-select class="px-6" :items="sides" label="Side" v-model="side"></v-select>
        <v-text-field
          min="1"
          class="px-6"
          label="Order Qty"
          type="number"
          v-model.number="orderQty"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn :color="side==='Buy'?'green':'red'" text @click="instrumentAction()">{{side}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Instruments",
  data: () => ({
    socket: null,
    dialog: false,
    side: "Buy",
    orderQty: 1,
    symbol: null,
    sides: ["Sell", "Buy"],
    headers: [
      { text: "Symbol", value: "symbol" },
      { text: "Last price", value: "lastPrice" },
    ],
  }),
  computed: {
    ...mapGetters(["instrumentsGetter"]),
  },
  methods: {
    ...mapActions(["getInstruments", "createNewOrder"]),
    ...mapMutations(["updateInstruments"]),
    openModal(symbol) {
      this.dialog = true;
      this.symbol = symbol;
    },
    instrumentAction() {
      const order = {
        symbol: this.symbol,
        side: this.side,
        orderQty: this.orderQty,
        ordType: "Market",
      };
      this.createNewOrder(order);

      this.orderQty = 1;
      this.side = "Buy";
      this.symbol = null;
      this.dialog = false;
    },
  },
  watch: {
    orderQty(val) {
      this.orderQty = Math.max(1, val);
    },
  },
  mounted() {
    this.getInstruments();

    const url = "wss://testnet.bitmex.com/realtime/";
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      this.socket.send(`{"op": "subscribe", "args": "instrument"}`);
    };
    this.socket.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };
    this.socket.onmessage = (e) => {
      if (e.data) {
        this.updateInstruments(JSON.parse(e.data));
      }
    };
  },
  beforeDestroy() {
    this.socket.close();
  },
};
</script>