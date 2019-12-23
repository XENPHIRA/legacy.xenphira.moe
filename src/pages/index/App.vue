<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
    >
        <v-list dense>
            <v-list-item class="v-list-item--active" link href="/">
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
        <v-toolbar-title v-if="!enableNSFWcontent">XENPHIRA</v-toolbar-title>
        <v-toolbar-title v-if="enableNSFWcontent">XENPHIRA <span style="color: red;">(NSFW)</span></v-toolbar-title>
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
          <v-col class="shrink">
            <h1 style="font-size:4em;">I AM XENPHIRA</h1>
          </v-col>
        </v-row>
        <v-row v-if="enableNSFWcontent" align="center" justify="center">
          <p>Spicy Edition</p>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; XENPHIRA {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

  var enableNSFWcontent = window.location.hostname.split(".")[0].toUpperCase() === "AFTERDARK";
  var debug = window.location.pathname.split("/");
  debug.shift();
  debug.pop();

  export default {
    components: {
      
    },

    data: () => ({
      drawer: null,
      enableNSFWcontent: enableNSFWcontent,
      debug: debug
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
