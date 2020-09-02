<template>
  <div>
    Hello!
    <ul>
      <li v-for="(mes, idx) in messages" :key="idx">{{mes}}</li>
    </ul>
    <form v-on:submit.prevent="onSubmit">
      <input v-model="messageInput"/>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    socket: null,
    messageInput: "",
    messages: [],
  }),
  props: {
    msg: String,
  },
  methods:{
    onSubmit(){
      this.socket.send(this.messageInput)
      this.messageInput = ""
    }
  },
  mounted() {
    const url = "ws://localhost:8001";
    this.socket = new WebSocket(url, "protocolOne");

    this.socket.onopen = () => {
      // this.socket.send("hey");
      // this.socket.send("privet");
    };

    this.socket.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };

    this.socket.onmessage = (e) => {
      this.messages.push(e.data)
      console.log(e.data);
    };

    this.socket.on('test', (m)=>console.log(m, "MMMM"))
  },
};
</script>
