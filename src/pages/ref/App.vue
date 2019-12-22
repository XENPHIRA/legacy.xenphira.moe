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
        fluid
      >
        <div
          v-if="singleCharPage"
        >
          <v-row align="center" justify="center">
            <h1>{{ singleCharData['character_data']['name'] }}</h1>
          </v-row>
          <v-row align="center" justify="center">
            <h4>
              {{ singleCharData['character_data']['age'] }}
              //
              {{ singleCharData['character_data']['pronouns'] }}
              //
              {{ singleCharData['character_data']['species'] }}
            </h4>
          </v-row>
          <v-row align="center" justify="center">
            <h5>
              {{ singleCharData['character_data']['description'] }}
            </h5>
          </v-row>
          <!-- 
            TODO:
             - Dynamically generate color squares/rectangles 
               with color(s) from char data that include 
               the hex and label
          -->
          <v-row align="center" justify="center">
            <v-col align="center">
              <h3>Likes</h3>
                <ul>
                  <li
                    v-for="like in singleCharData['character_data']['likes']"
                    v-bind:key="like"
                  >{{ like }}</li>
                </ul>
            </v-col>
            <v-col align="center">
              <h3>Dislikes</h3>
              <ul>
                  <li
                    v-for="dislike in singleCharData['character_data']['dislikes']"
                    v-bind:key="dislike"
                  >{{ dislike }}</li>
              </ul>
            </v-col>
          </v-row>

        </div>
        <v-row
          align="center"
          justify="center"
          v-if="multiCharPage"
        >
          <v-col
           v-for="character in char"
           v-bind:key="character['character']"
           >
            <a :href="'/ref?char='+character['character']"><img width="250 em" :src="getImgUrl(character)" :alt="character['character']" /></a>
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

  // var currentUrl = window.location.pathname;
  var currentSearch = window.location.search;
  var currentOptions;

  var singleCharPage = false; // if true, then art of one character will be displayed
  var singleCharData = null;

  var sfw = true; // false if going to display nsfw

  try {
    currentOptions = currentSearch.split("?")[1].split("&");
    var breakdown = [];
    for (var countr = 0; countr < currentOptions.length; countr++) {
      breakdown.push({
        "key": currentOptions[countr].split("=")[0],
        "value": currentOptions[countr].split("=")[1]
      });
    }
    singleCharPage = true;

    // get arts and display
    var charName = (breakdown) => {
      for (var i=0; i < breakdown.length; i++) {
        if(breakdown[i].key === "char") {
          return breakdown[i].value.replace(/%20/g, " ");
        }
      }
      return "null";
    }

    charName = charName(breakdown);
    console.log(charName);

    // get char data from list (Find the char first)
    var getCharData = (charName, charData) => {
      for(var i=0; i < charData["characters"].length; i++) {
        if(charData["characters"][i].character === charName) {
          return charData["characters"][i];
        }
      }
      return "Whoops! No Data!";
    }

    singleCharData = getCharData(charName, chardata);

  }
  catch(error) { // no options provided in url, show multipage
    currentOptions = currentSearch.split("?")[0];
  }
  //currentOptions.shift(); // remove blank first element

  // console.log("currentUrl: " + currentUrl);
  // console.log("currentOptions: " + currentOptions);
  // console.log(breakdown)

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
      char: enabled_chars,
      singleCharPage: singleCharPage,
      multiCharPage: !singleCharPage,
      singleCharData: singleCharData,
      sfw: sfw
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
