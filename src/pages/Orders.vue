<template>
  <div>
    <v-data-table
      :loading="!ordersHistoryGetter.length"
      loading-text="Loading..."
      :headers="headers"
      :items="ordersHistoryGetter"
      class="elevation-1"
      :items-per-page="25"
    >
      <template v-slot:item.timestamp="{ item }">
        <p>{{item.timestamp | date}}</p>
      </template>
      <template v-slot:item.price="{ item }">
        <p>{{item.price}}</p>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Orders",
  data: () => ({
    headers: [
      { text: "Symbol", value: "symbol" },
      { text: "Order ID", value: "orderID" },
      { text: "Order qty", value: "orderQty" },
      { text: "Timestamp", value: "timestamp" },
      { text: "Side", value: "side" },
      { text: "Price", value: "price" },
      { text: "Order status", value: "ordStatus" },
    ],
  }),
  computed: {
    ...mapGetters(["ordersHistoryGetter"]),
  },
  methods: {
    ...mapActions(["getOrdersHistory"]),
  },
  mounted() {
    this.getOrdersHistory();

    const url = "wss://testnet.bitmex.com/realtime/";
    const socket = new WebSocket(url);
    socket.onopen = () => {
      socket.send(`{"op": "subscribe", "args": "instrument"}`);
    };
    socket.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };
    socket.onmessage = (e) => {
      if (e.data) {
        this.updateInstruments(JSON.parse(e.data));
      }
    };
  },
};
</script>

<style>
</style>