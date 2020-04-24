<template>
    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">

                 <router-link :to="{name:'GMap'}" class="left brand-logo">GeoApp</router-link>   
              
                <ul class="right">
                    <li v-if="user"><a @click="logOut">Log out</a></li>
                    <li v-if="!user"><router-link :to='{name:"SignUp"}'>Sign up</router-link></li>
                    <li v-if="user"><a>{{user.email}}</a></li>
                    <li v-if="!user"><router-link :to='{name:"LogIn"}'>Log in</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "NavBar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({
            name: "SignUp"
          });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }
};
</script>
<style>
</style>
