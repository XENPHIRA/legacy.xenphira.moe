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
            <v-list-item class="v-list-item--active" link href="/ref">
                <v-list-item-action>
                <v-icon>mdi-image-album</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>REFERENCES</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link href="/waitlist">
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
        <v-row
          align="center"
          justify="center"
        >
          <v-col
           v-for="character in char"
           v-bind:key="character"
           >
            <img width="250 em" :src="getImgUrl(character)" :alt="character['character']" />
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

  import chardata from "./data.json";

  var currentUrl = window.location.pathname;
  var currentSearch = window.location.search;
  var currentOptions = currentSearch.split("?")[1].split("&");
  //currentOptions.shift(); // remove blank first element

  console.log(currentUrl);
  console.log(currentOptions);

  var enabled_chars = [];

  var i = 0;
  for (i=0; i<chardata["characters"].length; i++) {
    if (chardata["characters"][i]["character_data"]["enabled"] == true) {
      enabled_chars.push(chardata["characters"][i]);
    }
  }

  export default {
    components: {
      
    },

    methods: {
      getImgUrl: function(c){
        return require('../../assets/ref/characters/'+c["character"]+'/thumb.png');
      }
    },

    data: () => ({
      drawer: null,
      char: enabled_chars
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
