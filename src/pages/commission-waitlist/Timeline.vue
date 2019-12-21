<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
    >
        <v-list dense>
            <v-list-item link href="/">
                <v-list-item-action>
                <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>HOME</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link href="/social">
                <v-list-item-action>
                <v-icon>mdi-internet-explorer</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>SOCIAL</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link href="/ref">
                <v-list-item-action>
                <v-icon>mdi-image-album</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>REFERENCES</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="v-list-item--active" link href="/waitlist">
                <v-list-item-action>
                <v-icon>mdi-timelapse</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>COMMISSION WAITLIST</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        clipped-left
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>XENPHIRA</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row>
          <v-col>
            <h3 v-disabled-tooltip="'Debug Info: \n' + JSON.stringify(dat)">
              Commission ID: <span v-html="path"></span>
            </h3>
            <p>Latest status link: <a v-bind:href="dat['latest_status_link']" target="_blank">{{ dat['latest_status_link'] }}</a></p>
            <h4>Details:</h4>
            <p>
              Artist(s):<br />
              <a
                v-for="artist in dat.detail_artist"
                v-bind:href="artist['artist_url']"
                v-bind:key="artist"
                target="_blank"
                >{{ artist["artist_name"] }} <br
              /></a>
            </p>
            <p>Name: {{ dat["commission_name"] }}</p>
            <br />
            <!--<p style="font-style: italic;">Note: Times listed in Eastern Time</p>-->
          </v-col>
        </v-row>
        <v-row>
          <vue-horizontal-timeline :items="items" />
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; XENPHIRA {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import moment from "moment";
  import json from "./data/data.json";
  // eslint-disable-next-line
  var currentUrl = window.location.pathname;
  var currentSearch = window.location.search;
  var currentcommid = currentSearch.split("?")[1];
  //console.log(currentSearch);
  if (currentcommid == null) {
    currentcommid = 'Not Specified, <a href="/">Go Home</a>';
  }
  var currentcommdata = "";

  for (var i = 0; i < json.length; i++) {
    if (json[i]["commission_id"] == currentcommid) {
      currentcommdata = json[i];
      //JSON.stringify(json[i]);
    }
  }

  var itemsfromjson = [];
  // eslint-disable-next-line
  for (var i = 0; i < currentcommdata["updates"].length; i++) {
    var t = currentcommdata["updates"][i]["timestamp"] / 1;
    let ts = moment.unix(t).format("MM/DD/YY@hh:mm a");
    var message = "";
    if(currentcommdata["updates"][i]["link"]){
      message+=currentcommdata["updates"][i]["status"];
      message+=" - ";
      message+="Link: "+currentcommdata["updates"][i]["link"];
    } else {
      message+=currentcommdata["updates"][i]["status"];
    }
    itemsfromjson.push({
      title: ts,
      content: message
    });
  }

  // eslint-disable-next-line
  var currentcomm = json;
  export default {
    components: {
      
    },

    data() {
      return {
        path: currentcommid,
        dat: currentcommdata,
        items: itemsfromjson,
        drawer: null,
      };
    },

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>

<style>
/*.timeline {
  margin-top: 50px;
}*/

.vue-horizontal-timeline .timeline .title {
  font-size: 1rem !important;
}

.vue-horizontal-timeline .timeline .content {
  font-size: 0.75rem !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

pre {
  text-align: left;
  margin-left: 25%;
  margin-right: 25%;
}

.commgroup {
  text-align: left;
  margin-left: 60px;
  margin-right: 60px;
}

.comm {
  margin-bottom: 12pt;
}

.commtable {
  border-collapse: collapse;
}

.commdata {
  padding: 1em;
}

a.notstarted {
  color: red;
}

a.inprogress {
  color: orangered;
}

a.done {
  color: green;
}

/*  tooltip  */
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
