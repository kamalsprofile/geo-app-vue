<template>
   <div class="signup container">
       <form @submit.prevent="signUp" class="card-panel">
           <h2 class="center deep-purple-text">
               Signup
           </h2>
           <div class="field">
               <label for="email">Email:</label>
               <input type="email" name="email" v-model="email" >
           </div>
           <div class="field">
               <label for="pass">Pass:</label>
               <input type="password" name="pass" v-model="pass"> 
           </div>
           <p class="red-text" v-if="feedBcak">{{feedBcak}}</p>
           <div class="field">
               <label for="alias">Alias:</label>
               <input type="text" name="alias" v-model="alias">
           </div>
           <div class="field center">
               <button type="submit" class="btn deep-purple">Signup</button>
           </div>
       </form>
   </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "SignUp",
  data() {
    return {
      email: null,
      pass: null,
      alias: null,
      feedBcak: null,
      slug: null
    };
  },
  methods: {
    signUp() {
      if (this.alias && this.email && this.pass) {
        this.slug = this.alias
          .replace(/[^a-z]+/gi, "-")
          .replace(/^-|-$/g, "")
          .toLowerCase();
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          console.log("my doc", doc);
          if (doc.exists) {
            this.feedBcak = "The alias tou entered is already exist";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.pass)
              .then(cred => {
                ref.set({
                  alias: this.alias,
                  geolocation: null,
                  user_id: cred.user.uid
                });
              })
              .then(() => {
                this.$router.push({
                  name: "GMap"
                });
              })
              .catch(err => {
                this.feedBcak = err.message;
              });
            this.feedBcak = "this alias is free to use";
          }
        });
      } else {
        this.feedBcak = "You should enter all fields";
      }
    }
  }
};
</script>
<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
