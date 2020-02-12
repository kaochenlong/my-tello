import consumer from "./consumer"
 
// consumer.subscriptions.create({ channel: "ChatChannel", room: "Best Room" })

consumer.subscriptions.create("BoardChannel", {
  received(data) {
    if (data.commit) {
      window.$store.commit(data.commit, JSON.parse(data.payload));
    }
  }
});
