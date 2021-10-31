<template>
  <div>
    <div>
      <!-- <h2>Search and add a pin</h2> -->
      <!-- <GmapAutocomplete @place_changed="setPlace" /> -->
      <!-- <gmap-autocomplete class="introInput">
        <template v-slot:input="slotProps">
          <v-text-field
            outlined
            prepend-inner-icon="place"
            placeholder="Location Of Event"
            ref="input"
            v-on:listeners="slotProps.listeners"
            v-on:attrs="slotProps.attrs"
          >
          </v-text-field>
        </template>
      </gmap-autocomplete> -->
    </div>
    <br />
    <GmapMap
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100%; height: 250px"
      ><GmapMarker
        v-if="marker"
        :position="marker.position"
        :clickable="true"
        :draggable="true"
        @dragend="updateCoordinates"
        @click="center = marker.position"
    /></GmapMap>
  </div>
</template>

<script>
  import { gmapApi } from "gmap-vue";

  export default {
    name: "g-map",
    data() {
      return {

        center: { lat: 24.694061084357084, lng: 46.67799070650271 },
        currentPlace: null,
        marker: null,
        places: null,
      };
    },
    computed: {
      google: gmapApi,
    },
    mounted() {
      this.geolocate();
    },
    methods: {
      // setPlace(place) {
      //   this.currentPlace = place;
      //   this.addMarker();
      // },
      addMarker() {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng(),
          };
          this.marker = { position: marker };
          this.$emit("gotlocation", this.marker);

          this.places = this.currentPlace;
          // this.$emit("gotplace", this.place);
          this.center = marker;
        }
      },
      geolocate: function () {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.marker = {
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          };
          this.$emit("gotlocation", this.marker);

          // const geocoder = new this.google.maps.Geocoder();
          // geocoder.geocode({ latLng: this.marker.position }, (result, status) => {
          //   if (status === this.google.maps.GeocoderStatus.OK) {
          //     set the input field value with address:
          //     document.querySelector(".pac-target-input").value =
          //       result[0].formatted_address;
          //     this.$emit("gotplace", result[0].formatted_address);
          //   }
          // });
        });
      },
      updateCoordinates(location) {
        let x = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng(),
        };
        this.$emit("gotlocation", { position: x });
        // const geocoder = new this.google.maps.Geocoder();
        // geocoder.geocode({ latLng: x }, (result, status) => {
        //   if (status === this.google.maps.GeocoderStatus.OK) {
        //     set the input field value with address:
        //     document.querySelector(".pac-target-input").value =
        //       result[0].formatted_address;
        //     this.$emit("gotplace", result[0].formatted_address);
        //   }
        // });
      },
    },
  };
</script>
