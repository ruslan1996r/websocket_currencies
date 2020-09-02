<template>
  <div>
    <v-data-table
      :loading="!quotesHistoryGetter.length"
      loading-text="Loading..."
      :headers="headers"
      :items="quotesHistoryGetter"
      class="elevation-1"
      :items-per-page="25"
    >
      <template v-slot:item.timestamp="{ item }">
        <p>{{item.timestamp | date}}</p>
      </template>
      <template v-slot:item.open="{ item }">
        <p>{{item.open | currency}}</p>
      </template>
      <template v-slot:item.high="{ item }">
        <p>{{item.high | currency}}</p>
      </template>
      <template v-slot:item.low="{ item }">
        <p>{{item.low | currency}}</p>
      </template>
      <template v-slot:item.close="{ item }">
        <p>{{item.close | currency}}</p>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "History",
  data: () => ({
    socket: null,
    headers: [
      { text: "Timestamp", value: "timestamp" },
      { text: "Open", value: "open" },
      { text: "High", value: "high" },
      { text: "Low", value: "low" },
      { text: "Close", value: "close" },
      { text: "Gross value", value: "grossValue" },
    ],
  }),
  computed: {
    ...mapGetters(["quotesHistoryGetter"]),
  },
  methods: {
    ...mapActions(["getQuoteHistory"]),
    ...mapMutations(["updateHistory"]),
  },
  mounted() {
    this.getQuoteHistory(this.$route.params.symbol);

    const url = "wss://testnet.bitmex.com/realtime/";
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      this.socket.send(
        `{"op": "subscribe", "args": "tradeBin1m:${this.$route.params.symbol}"}`
      );
    };
    this.socket.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };
    this.socket.onmessage = (e) => {
      if (e.data) {
        this.updateHistory(JSON.parse(e.data));
      }
    };
  },
  beforeDestroy() {
    this.socket.close();
  },
};
</script>