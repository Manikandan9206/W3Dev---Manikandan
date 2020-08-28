<template>
  <v-app dark>
    <v-app-bar
      app
      height="100px"
      dark
    >
      <v-spacer />
      <div class="app-title">
        <h1>VueTo</h1>
        <p>Life Made Simpler</p>
      </div>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <router-view />
      <v-snackbar
        v-model="snack"
        timeout="2000"
      >
        {{ snackbar }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from './firebase'
export default {
  name: 'App',

  data: () => ({
    snack: false,
    snackbar: ''
  }),
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user.email)
      }
    })
    this.$store.watch(state => state.snackbar, () => {
      const msg = this.$store.state.snackbar
      if (msg !== '') {
        this.snack = true
        this.snackbar = this.$store.state.snackbar
        this.$store.commit('setSnackbar', '')
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/global.scss';

.app-title {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>
