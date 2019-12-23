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
            <v-list-item class="v-list-item--active" link href="/social">
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
            <v-list-item link href="/nsfw/">
                <v-list-item-action>
                <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>HOME</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="v-list-item--active" link href="/nsfw/social">
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
          <h1>OFFICIAL XENPHIRA SOCIAL MEDIA ACCOUNTS</h1>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  href="https://twitter.com/xenphira"
                  icon
                  x-large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon x-large>mdi-twitter</v-icon>
                </v-btn>
              </template>
              <span>@XENPHIRA on Twitter</span>
            </v-tooltip>
          </v-col>
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  href="https://furaffinity.net/user/xenphira"
                  icon
                  x-large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon x-large>mdi-dog</v-icon>
                </v-btn>
              </template>
              <span>XENPHIRA on FurAffinity</span>
            </v-tooltip>
          </v-col>
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  href="https://t.me/xenphira"
                  icon
                  x-large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon x-large>mdi-telegram</v-icon>
                </v-btn>
              </template>
              <span>@XENPHIRA on Telegram</span>
            </v-tooltip>
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

  var pathname = window.location.pathname.split("/");
  pathname.shift(); pathname.pop();
  var enableNSFWcontent = false;
  try {
    enableNSFWcontent = pathname[0].toUpperCase() === "NSFW";
  } catch (error) {
    enableNSFWcontent = false;
  }

  export default {
    props: {
      //
    },

    components: {
      //
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
