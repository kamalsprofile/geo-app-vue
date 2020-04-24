<template>
    <div class="log-in container">
        <form @submit.prevent="logIn" action="" class="card-panel">
            <h2 class="center deep-purple-text">Log In</h2>
            <div class="field">
               <label for="email">Email:</label>
               <input type="email" name="email" v-model="email" >
           </div>
           <div class="field">
               <label for="pass">Pass:</label>
               <input type="password" name="pass" v-model="pass"> 
           </div>
           <div class="field center">
                <p v-if="feedBack" class="red-text">{{feedBack}}</p>
                <button type="submit" class="btn deep-purple">Log In</button>
           </div>
          
        </form>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "LogIn",
  data() {
    return {
      email: null,
      pass: null,
      feedBack: null
    };
  },
  methods: {
    logIn() {
      if (this.email && this.pass) {
        this.feedBack = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.pass)
          .then(cred => {
            console.log(cred.user);
            this.$router.push({ name: "GMap" });
          })
          .catch(err => {
            this.feedBack = err.message;
          });

        console.log(this.email);
      } else {
        this.feedBack = "Please enter both email and password";
      }
    }
  }
};
</script>
<style>
.log-in {
  max-width: 400px;
  margin-top: 60px;
}
.log-in h2 {
  font-size: 2.4em;
}
.log-in .field {
  margin-bottom: 16px;
}
</style>
