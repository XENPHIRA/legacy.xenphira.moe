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
            <v-list-item class="v-list-item--active" link href="/data">
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
            <v-list-item link href="/ref">
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
            <v-list-item class="v-list-item--active" link href="/nsfw/">
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
            <v-list-item link href="/nsfw/ref">
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
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <h1 style="font-size:4em;">fa-stats</h1>
            <img src="https://raw.githubusercontent.com/XENPHIRA/fa-stats/master/graph.png" width="80%" />
          </v-col>
        </v-row>
        <v-row v-if="enableNSFWcontent" align="center" justify="center">
          <p></p>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; XENPHIRA {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

  var pathname = window.location.pathname.split("/");
  pathname.shift(); pathname.pop();
  var enableNSFWcontent = false;
  try {
    enableNSFWcontent = pathname[0].toUpperCase() === "NSFW";
  } catch (error) {
    enableNSFWcontent = false;
  }

  export default {
    components: {
      
    },

    data: () => ({
      drawer: null,
      enableNSFWcontent: enableNSFWcontent
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
