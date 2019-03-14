<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="faded"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Prosperidade

        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Configurações</q-list-header>
        <q-item>
          <q-btn push color="secondary" @click="noMessage">Sair</q-btn>
        </q-item>

      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
import axios from 'axios'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      loading7: false,
      percentage1: 0
    }
  },
  methods: {
    // openURL,
    logout () {
      window.localStorage.clear()
      axios.get('http://165.227.188.44:5555/' + 'logout')
        .then(response => {
          this.results = response.data
          this.$router.push('/')
        })
    },
    show (options) {
      this.$q.loading.show(options)
      setTimeout(() => {
        this.$q.loading.hide()
      }, 3000)
    },
    noMessage () {
      this.show()
      this.logout()
    }
  }
}
</script>

<style>
</style>
