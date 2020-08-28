<template>
  <div class="home">
    <div class="sign-box" v-if="!user">

      <div class="signin-box" v-show="signinView">
        <v-icon x-large>
          mdi-account-circle
        </v-icon>
        <h1>Welcome Back,</h1>
        <p>Please Sign in using your account to get started.</p>
        <br>
        <v-form
          ref="signinform"
          v-model="signin.valid"
          class="sign-in-form">
          <v-text-field
            v-model="signin.email"
            :rules="rules.email"
            prepend-icon="mdi-email"
            label="E-mail"
            required
          />
          <v-text-field
            v-model="signin.password"
            prepend-icon="mdi-lock"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            class="input-group--focused"
            @click:append="showPass = !showPass"
          />
          <br>
          <v-btn
            tile
            dark
            min-width="150px"
            @click="submitSignInForm"
          >
            Sign In
          </v-btn>
        </v-form>
        <p class="account-exist" @click="toggleSignView">
          Don't have an account?
        </p>
      </div>

      <div class="signup-box" v-show="signupView">
        <v-icon x-large>
          mdi-clipboard-account
        </v-icon>
        <h1>Greetings,</h1>
        <p>Please Sign up to get started into making life easier.</p>
        <br>
        <v-form
          ref="signupform"
          v-model="signup.valid"
          class="sign-up-form">
          <v-text-field
            v-model="signup.name"
            prepend-icon="mdi-account-circle"
            :counter="15"
            :rules="rules.name"
            label="Name"
            required
          />
          <v-text-field
            v-model="signup.email"
            :rules="rules.email"
            prepend-icon="mdi-email"
            label="E-mail"
            required
          />
          <v-text-field
            v-model="signup.password"
            prepend-icon="mdi-lock"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            class="input-group--focused"
            @click:append="showPass = !showPass"
          />
          <br>
          <v-btn
            tile
            dark
            min-width="150px"
            @click="submitSignUpForm"
          >
            Sign Up
          </v-btn>
        </v-form>
        <p class="account-exist" @click="toggleSignView">
          Already have an account?
        </p>
      </div>
    </div>
    <Todo v-if="user" />
    <div v-if="user">
      <v-bottom-navigation
        absolute
        bottom
        dark
      >
        <h2 style="margin: 0.7rem">{{ user.name }}</h2>
        <v-spacer />
        <v-btn @click="signout">
          <h3>SignOut</h3>
        </v-btn>
      </v-bottom-navigation>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Todo from '../components/Todo'
export default {
  name: 'Home',
  components: {
    Todo
  },
  data () {
    return {
      signin: {
        email: '',
        password: '',
        valid: true
      },
      signup: {
        name: '',
        email: '',
        password: '',
        valid: true
      },
      showPass: false,
      rules: {
        name: [v => !!v || 'Name is required', v => (v && v.length <= 15) || 'Name must be less than 15 characters'],
        email: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
        password: [v => !!v || 'Required.', v => v.length >= 6 || 'Min 6 characters']
      },
      signupView: true,
      signinView: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    submitSignInForm () {
      this.$refs.signinform.validate()
      if (this.signin.valid) {
        this.$store.dispatch('submitSignInForm', {
          email: this.signin.email,
          password: this.signin.password
        })
      }
    },
    submitSignUpForm () {
      this.$refs.signupform.validate()
      if (this.signup.valid) {
        this.$store.dispatch('submitSignUpForm', {
          name: this.signup.name,
          email: this.signup.email,
          password: this.signup.password
        })
      }
    },
    toggleSignView () {
      this.signupView = !this.signupView
      this.signinView = !this.signinView
    },
    signout () {
      this.$store.dispatch('signout')
    }
  }
}
</script>

<style lang="scss">
.home {
  font-family: 'Montserrat', sans-serif;
  .sign-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .signin-box {
      text-align: center;
    }
    .signup-box {
      text-align: center;
    }
    .account-exist {
      margin: 1rem 0;
      cursor: pointer;
    }
  }
}
</style>
