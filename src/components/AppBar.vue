<template>
    <v-app-bar
        app
        clipped-left
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>XENPHIRA</v-toolbar-title>
    </v-app-bar>

</template>

<script>
export default {
  name: 'AppBar',

  data: () => ({
    //
  }),
};
</script>
