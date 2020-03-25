<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
    >
        <v-list dense id="sfwNAV" v-if="!enableNSFWcontent">
            <v-list-item link href="/">
                <v-list-item-action>
                <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>HOME</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link href="/data">
                <v-list-item-action>
                <v-icon>mdi-database</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>DATA</v-list-item-title>
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
        <v-list dense id="nsfwNAV" v-if="enableNSFWcontent">
            <v-list-item link href="/nsfw/">
                <v-list-item-action>
                <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>HOME</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link href="/nsfw/data">
                <v-list-item-action>
                <v-icon>mdi-database</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>DATA</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link href="/nsfw/social">
                <v-list-item-action>
                <v-icon>mdi-internet-explorer</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>SOCIAL</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="v-list-item--active" link href="/nsfw/ref">
                <v-list-item-action>
                <v-icon>mdi-image-album</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>REFERENCES</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link href="/nsfw/waitlist">
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
        <v-toolbar-title>XENPHIRA <span v-if="enableNSFWcontent" style="color: red;">(NSFW)</span></v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
      
        <div
          v-if="singleCharPage"
        >
          <v-row align="center" justify="center">
            <a href="/ref" v-if="!enableNSFWcontent">&lt;-- Return to Character List</a>
            <a href="/nsfw/ref" v-if="enableNSFWcontent">&lt;-- Return to Character List</a>
          </v-row>
          <v-row align="center" justify="center">
            <span v-if="isThereNsfw(singleCharData)">
              <span v-if="rating == 'NSFW' && enableNSFWcontent">
                <a :href="'/nsfw/ref?char='+singleCharData.character">
                  !! Hide NSFW Art !!
                </a>
              </span>
              <span v-if="rating == 'SFW' && enableNSFWcontent">
                <a :href="'/nsfw/ref?char='+singleCharData.character+'&rating=nsfw'">
                  !! Show NSFW Art !!
                </a>
              </span>
            </span>
          </v-row>
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
          <v-row align="center" justify="center">
            <v-col align="center" cols=3>
              <table>
              <!-- <tr> -->
                <tr
                  v-for="color in singleCharData['character_data']['colors']"
                  v-bind:key="color"
                  :bgcolor="color.color"
                  style="text-shadow: 1px 1px #000000; 
                  text-align: center; 
                  vertical-align: center; 
                  padding: 2em;"
                >
                  {{ color.label }} <br> {{ color.color }}
                </tr>
              <!-- </tr> -->
              </table>
            </v-col>
          <!-- </v-row>
          <v-row align="center" justify="center"> -->
            <!-- <v-col align="center"
            v-if="likes">
              <h3>Likes</h3>
                <ul>
                  <li
                    v-for="like in singleCharData['character_data']['likes']"
                    v-bind:key="like"
                  >{{ like }}</li>
                </ul>
            </v-col>
            <v-col align="center"
            v-if="dislikes">
              <h3>Dislikes</h3>
              <ul>
                  <li
                    v-for="dislike in singleCharData['character_data']['dislikes']"
                    v-bind:key="dislike"
                  >{{ dislike }}</li>
              </ul>
            </v-col> -->
            <v-col>
              <img width="100%" :src="getImgRefSfw(singleCharData)" :alt="'Reference for ' + singleCharData['character']" />
            </v-col>
          </v-row>
          <!-- <v-row align="center" justify="center">
            <img width="100%" :src="getImgRefSfw(singleCharData)" :alt="'Reference for ' + singleCharData['character']" />
          </v-row> -->
          <v-row align="center" justify="center" v-if="singleCharData.character_data.adopted == true">
            <i>Adopted from {{ singleCharData.character_data.original_owner }} with love &lt;3</i>
          </v-row>

          <v-row align="center" justify="center">
            <div id="nsfw" v-if="singleCharData.nsfw_art && rating == 'NSFW' && enableNSFWcontent">
              <v-col
              v-for="art in singleCharData.nsfw_art"
              v-bind:key="art.path_to_art">
              <span v-if="okaytoshow(art)">
                <a :href="getImg(singleCharData.character, 
                'nsfw', art.artist, art.artist_platform, 
                art.path_to_art.split('/')[art.path_to_art.split('/').length-1])">
                  <img
                  width="200 em"
                  :src="getImg(singleCharData.character, 
                  'nsfw', art.artist, art.artist_platform, 
                  art.path_to_art.split('/')[art.path_to_art.split('/').length-1])"
                  >
                </a>
                <br />
                Artist(s):
                <a target="_blank" 
                :href="art.effective_artist_link">
                {{ art.artist }}
                </a>
              </span>
              </v-col>
            </div>
          </v-row>
          <v-row align="center" justify="center">
            <div id="sfw" v-if="singleCharData.sfw_art">
              <v-col
              v-for="art in singleCharData.sfw_art"
              v-bind:key="art.path_to_art">
              <span v-if="!art.isref">
                <a :href="getImg(singleCharData.character, 
                'sfw', art.artist, art.artist_platform, 
                art.path_to_art.split('/')[art.path_to_art.split('/').length-1])">
                  <img
                  width="200 em"
                  :src="getImg(singleCharData.character, 
                  'sfw', art.artist, art.artist_platform, 
                  art.path_to_art.split('/')[art.path_to_art.split('/').length-1])"
                  >
                </a>
                <br />
                Artist(s):
                <a target="_blank" 
                :href="art.effective_artist_link">
                {{ art.artist }}
                </a>
              </span>
              </v-col>
            </div>
          </v-row>

        </div>
        <div v-if="multiCharPage">
          <v-row
            align="center"
            justify="center"
            v-for="i in Math.ceil(char.length / 4)"
            v-bind:key="i"
          >
            <v-col
            v-for="character in char.slice((i - 1) * 4, i * 4)"
            v-bind:key="character['character']"
            >
              <a v-if="!enableNSFWcontent" :href="'/ref?char='+character['character']"><img width="250 em" :src="getImgThumb(character)" :alt="character['character']" /></a>
              <a v-if="enableNSFWcontent" :href="'/nsfw/ref?char='+character['character']"><img width="250 em" :src="getImgThumb(character)" :alt="character['character']" /></a>
            </v-col>
          </v-row>
        </div>
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
  // var enableNSFWcontent = window.location.hostname.split(".")[0].toUpperCase() === "AFTERDARK";

  var pathname = window.location.pathname.split("/");
  pathname.shift(); pathname.pop();
  var enableNSFWcontent = false;
  try {
    enableNSFWcontent = pathname[0].toUpperCase() === "NSFW";
  } catch (error) {
    enableNSFWcontent = false;
  }

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

    var rating = (breakdown) => {
      for (var i=0; i < breakdown.length; i++) {
        if(breakdown[i].key === "rating") {
          return breakdown[i].value.replace(/%20/g, " ");
        }
      }
      return "null";
    }

    charName = charName(breakdown);
    rating = rating(breakdown);
    if (rating.toUpperCase()=="NSFW") {
      rating = "NSFW";
    }
    else {
      rating = "SFW";
    }
    // console.log(charName);
    // console.log(rating);

    // get char data from list (Find the char first)
    var getCharData = (charName, charData) => {
      for(var i=0; i < charData["characters"].length; i++) {
        if(charData["characters"][i].character === charName && charData["characters"][i].enabled) {
          return charData["characters"][i];
        }
      }
      return "Whoops! No Data!";
    }

    singleCharData = getCharData(charName, chardata);

    var likes = singleCharData["character_data"]["likes"];
    if (likes) {
      if (likes.length <= 0) {
        likes = false;
      }
    }
    var dislikes = singleCharData["character_data"]["dislikes"];
    if (dislikes) {
      if (dislikes.length <= 0) {
        dislikes = false;
      }
    }

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
      getImgThumb: function(c){
        return require('../../assets/ref/characters/'+c["character"]+'/thumb.png');
      },
      getImgRefSfw: function(c){
        return require('../../assets/ref/characters/'+c["character"]+'/ref/sfw/ref.png');
      },
      getImgRefNsfw: function(c){
        return require('../../assets/ref/characters/'+c["character"]+'/ref/nsfw/ref.png');
      },
      getImg: function(character, rating, artist, platform, filename){
        return require('../../assets/ref/characters/'+character+"/art/"+
                      rating+"/"+artist+" ["+platform+"]/"+filename);
      },
      isThereNsfw: function(singleCharData) {
        if (singleCharData['art_types'].includes("NSFW")) {
          return true;
        }
        return false;
      },
      okaytoshow: function(art) {
        try {
          return !art.isref || art.path.toLowerCase().includes(".png") || art.path.toLowerCase().includes(".jpg") || art.path.toLowerCase().includes(".gif"); 
        }
        catch (error) {
          return false;
        }
      }
    },

    data: () => ({
      enableNSFWcontent: enableNSFWcontent,
      drawer: null,
      char: enabled_chars,
      singleCharPage: singleCharPage,
      multiCharPage: !singleCharPage,
      singleCharData: singleCharData,
      sfw: sfw,
      likes: likes,
      dislikes: dislikes,
      rating: rating
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
