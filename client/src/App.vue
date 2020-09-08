<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import appNavbar from "./components/navbar/index";
import appFooter from "./components/footer/index";

export default {
  name: "App",
  components: { appNavbar, appFooter },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a,
footer a {
  font-weight: bold;
  color: #2c3e50;
}

#nav .navbar-links a.router-link-exact-active {
  color: #42b983;
}
</style>
