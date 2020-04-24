<template>
    <din class="map">
        <div class="google-map" id="map">

        </div>
    </din>
</template>
<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -4
    };
  },
  methods: {
    renderMap() {
      const google = window.google;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 7,
        maxZoom: 15,
        minZoom: 3
      });
      db
        .collection("users")
        .get()
        .then(cred => {
          cred.docs.forEach(doc => {
            let data = doc.data();
            if (data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map
              });
              marker.addListener("click", () => {
                this.$router.push({ name: "Profile", params: { id: doc.id } });
              });
            }
          });
        });
    }
  },
  mounted() {
    const currentUser = firebase.auth().currentUser;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          db
            .collection("users")
            .where("user_id", "==", currentUser.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db
                  .collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
          this.renderMap();
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 4000 }
      );
    } else {
      this.renderMap();
    }
  }
};
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
