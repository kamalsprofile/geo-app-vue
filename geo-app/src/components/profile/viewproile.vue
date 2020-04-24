<template>
    <div class="profile container">
        <div v-if="profile" class="card">
            <h2  class="deep-purple-text center">{{profile.alias}}'s Profile</h2>
            <ul class="comments collection">
              <li v-for="(comments,index) in comments" :key="index">
                <div class="deep-purple-text"> {{comments.from}}</div>
                <div class="grey-text text-darken-2">{{comments.comment}}</div>
              </li>
            </ul>
            <form @submit.prevent="addComment">
              <div class="field">
                <label for="comment">Add a comment</label>
                <input type="text" name="comment" v-model="comment">
                <p v-if="feedback" class="red-text center">{{feedback}}</p>
              </div>
            </form>
        </div>
    </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Profile",
  data() {
    return {
      profile: null,
      comment: null,
      feedback: null,
      currentUser: null,
      comments: []
    };
  },
  created() {
    let ref = db.collection("users");
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          this.currentUser = doc.data();
          this.currentUser.id = doc.id;
        });
      });
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });
    // comments
    db
      .collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.comments.unshift({
              from: change.doc.data().from,
              comment: change.doc.data().content
            });
          }
        });
      });
  },
  methods: {
    addComment() {
      if (this.comment) {
        this.feedback = null;
        db
          .collection("comments")
          .add({
            to: this.$route.params.id,
            from: this.currentUser.id,
            content: this.comment,
            time: Date.now()
          })
          .then(() => {
            this.comment = null;
          });
      } else {
        this.feedback = "You must add comment";
      }
    }
  }
};
</script>
<style>
.profile,
.card {
  padding: 30px;
  margin-top: 60px;
}
.profile h2 {
  margin-top: 0;
  font-size: 2em;
}
.profile li {
  padding: 10px;
  border-bottom: solid 1px #ccc;
}
</style>
