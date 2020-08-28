import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    todos: null,
    snackbar: ''
  },
  getters: {
    todos (state) {
      return state.todos
    }
  },
  mutations: {
    setUser (state, payload) { state.user = payload },
    setSnackbar (state, payload) { state.snackbar = payload },
    setTodos (state, payload) { state.todos = payload }
  },
  actions: {
    getTodosFromDB ({ commit }, payload) {
      commit('setSnackbar', 'Got all Todos')
      db.collection('users').doc(payload).get()
        .then(data => {
          // console.log(data.data())
          commit('setTodos', data.data().todos)
        })
        .catch(e => {
          // console.log(e)
          commit('setSnackbar', e)
        })
    },
    saveToDB ({ commit }, payload) {
      commit('setSnackbar', 'Todo Updated')
      db.collection('users').doc(payload.email).set({ todos: payload.todos }, { merge: true })
    },
    submitSignInForm ({ commit }, payload) {
      // console.log(payload)
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          // console.log(user)
          commit('setSnackbar', 'Welcome back, ' + user.user.name)
          return db.collection('users').doc(user.user.email).get()
        })
        .then((data) => {
          commit('setUser', data.data())
          commit('setSnackbar', 'User Updated')
        })
        .catch((e) => {
          // console.log(e)
          commit('setSnackbar', 'User Not Found. Check Email/ Password')
        })
    },
    submitSignUpForm ({ commit }, payload) {
      // console.log(payload)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          db.collection('users').doc(user.user.email).set({
            name: payload.name,
            email: user.user.email,
            uid: user.user.uid
          })
          commit('setUser', payload)
          commit('setSnackbar', 'Welcome, ' + payload.name)
        })
        .catch((e) => {
          // console.log('signup error' + error)
          commit('setSnackbar', e)
        })
    },
    autoSignIn ({ commit }, payload) {
      db.collection('users').doc(payload).get()
        .then((data) => {
          // console.log(data.data())
          commit('setUser', data.data())
          commit('setSnackbar', 'Welcome Back, ' + data.data().name)
        })
        .catch(e => commit('setSnackbar', e))
      // commit('setSnackbar', 'Error Signing In User.')
    },
    signout ({ commit }) {
      commit('setUser', null)
      auth.signOut()
      commit('setSnackbar', 'Good Bye, Hope to see you again')
    }
  },
  modules: {
  }
})
