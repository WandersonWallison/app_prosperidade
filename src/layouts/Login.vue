<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->
    <q-layout-footer>
    </q-layout-footer>
      <router-view />
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style>
</style>
