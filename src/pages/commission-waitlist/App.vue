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
        fluid
      >
        <v-row align="center" justify="center">
          <h1>COMMISSION WAITLIST</h1>
        </v-row>
        <v-row align="center" justify="center">
          <p><span v-html="currentOptions"></span></p>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="commissions"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.commission_name="{ item }">
                <a :href="'/timeline?' + item.commission_id"
                  v-tooltip="'Click to view timeline'">{{ item.commission_name }}</a>
              </template>
              <template v-slot:item.detail_artist="{ item }">
                <a
                  v-for="artist in item.detail_artist"
                  v-bind:href="artist.artist_url"
                  v-bind:key="artist"
                  >{{ artist.artist_name }}<br
                /></a>
              </template>
              <template v-slot:item.detail_date_of_commission="{ item }">
                {{ (item.detail_date_of_commission / 1)
                          | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
              </template>
              <template v-slot:item.detail_date_of_completed_payment="{ item }">
                <span v-tooltip="
                        'Value of commission in USD: $' + item.commission_cost_USD
                      ">{{ (item.detail_date_of_completed_payment / 1)
                          | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
              </template>
              <template v-slot:item.latest_status="{ item }">
                <a
                  v-bind:href="item.latest_status_link"
                  target="_blank"
                  v-bind:class="item.state_css"
                  >{{ item.latest_status }}</a
                >
              </template>
              <template v-slot:item.commissiontime="{ item }">
                {{ item | timecalc }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; XENPHIRA {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import data from "./data/data.json";

  var currentUrl = window.location.pathname;
  var currentSearch = window.location.search;
  var currentOptions = currentSearch.split("?")[1];
  var currentOptionsDisplayText = "";
  var showDone = false;
  if (currentOptions == "includefinished") {
    currentOptionsDisplayText =
      '<a href="/waitlist"><button>Showing Completed Items, click to exclude completed</button></a>';
    showDone = true;
  } else {
    currentOptionsDisplayText =
      '<a href="?includefinished"><button>Hiding Completed Items, click to include completed</button></a>';
  }

  var json_effective = [];
  for (var ctr = 0; ctr < data.length; ctr++) {
    var obj = data[ctr];
    if (obj["state_complete"] == false) {
      json_effective.push(obj);
    } else if (showDone == true) {
      json_effective.push(obj);
    }
  }
  
  var now = Math.floor(new Date().getTime() / 1000);

  // VUE JS STUFF
  export default {
    components: {
      
    },

    data() {
      return {
        commissions: json_effective,
        time: now,
        currentOptions: currentOptionsDisplayText,
        drawer: null,
        headers: [
          {
            text: "Commission",
            align: "left",
            sortable: false,
            value: "commission_name"
          },
          {
            text: "Artist(s)",
            align: "left",
            sortable: true,
            value: "detail_artist"
          },
          {
            text: "Date of Commission",
            align: "left",
            sortable: true,
            value: "detail_date_of_commission"
          },
          {
            text: "Date of Payment",
            align: "left",
            sortable: true,
            value: "detail_date_of_completed_payment"
          },
          {
            text: "Status",
            align: "left",
            sortable: false,
            value: "latest_status"
          },
          {
            text: "Time Since Start of Commission",
            align: "left",
            sortable: false,
            value: "commissiontime"
          }
        ]
      };
    },
    computed: {
      activeComms: function() {
        return this.commissions.filter(function(u) {
          return !u.state_complete;
        });
      }
    },
    filters: {
      timesince: function(date) {
        var seconds = parseInt(now - date, 10);
        var days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        var hrs = Math.floor(seconds / 3600);
        seconds -= hrs * 3600;
        var mnts = Math.floor(seconds / 60);
        seconds -= mnts * 60;
        return (
          days + " days, " + hrs + " hours, " + mnts + " minutes" //, " +
          // seconds +
          // " seconds"
        );
      },
      timecalc: function(comm) {
        if (comm.detail_date_of_completed_payment==0) {
          return("Not yet paid");
        }
        if (comm.latest_status === "Done") {
          var date = comm.updates[comm.updates.length - 1].timestamp;
          var seconds = parseInt(
            date - comm.detail_date_of_completed_payment,
            10
          );
          var days = Math.floor(seconds / (3600 * 24));
          seconds -= days * 3600 * 24;
          var hrs = Math.floor(seconds / 3600);
          seconds -= hrs * 3600;
          var mnts = Math.floor(seconds / 60);
          seconds -= mnts * 60;
          return (
            "Received finished piece after " +
            days +
            " days, " +
            hrs +
            " hours, " +
            mnts +
            " minutes" //, " +
            // seconds +
            // " seconds"
          );
        } else {
          date = comm.detail_date_of_completed_payment;
          seconds = parseInt(now - date, 10);
          days = Math.floor(seconds / (3600 * 24));
          seconds -= days * 3600 * 24;
          hrs = Math.floor(seconds / 3600);
          seconds -= hrs * 3600;
          mnts = Math.floor(seconds / 60);
          seconds -= mnts * 60;
          return (
            "Waiting for " +
            days +
            " days, " +
            hrs +
            " hours, " +
            mnts +
            " minutes" //, " +
            // seconds +
            // " seconds"
          );
        }
      }
    },
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
  color: red !important;
}

a.inprogress {
  color: orangered !important;
}

a.done {
  color: green !important;
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
  box-shadow: 0 5px 30px rgba(black, .1);
}
 
.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}
 
.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}
 
.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
