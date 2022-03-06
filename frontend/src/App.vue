<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/logout" v-if="this.$store.state.loggedIn == true">Logout</router-link>
    <router-link to="/register" v-if="this.$store.state.loggedIn == false">Sign up</router-link> |
    <router-link to="/chat" v-if="this.$store.state.loggedIn == true">Chat</router-link>
    <router-link to="/login" v-if="this.$store.state.loggedIn == false">Login</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import VueJwtDecode from 'vue-jwt-decode';


export default {
  name: "App",
  data() {
    return {
      user: {},
    }
  },
  methods: {
    checkAuth() {
      // get token from localstorage
      let token = localStorage.getItem("user");
      try {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
        let currentTime = Date.now().valueOf() / 1000;

        if(decoded.exp < currentTime)
        {
          localStorage.removeItem("user");
          throw 'Token expired.'
        }

        this.$store.state.loggedIn = true;
      } catch (error) {
        this.$store.state.loggedIn = false;
      }
    }
  },

  created()
  {
    this.checkAuth();
  }
}

</script>