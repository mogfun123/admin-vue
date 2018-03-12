<template>
  <div id="app">
  <!--  <router-link :to="{ name: 'groupset' }">/groupset</router-link>
     <router-link :to="{ name: 'admin' }">/admin</router-link>
      <router-link :to="{ name: 'home' }">/home</router-link>
 -->

    <router-view ></router-view>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
   -webkit-tap-highlight-color: rgba(0,0,0,0);
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  min-width: 1400px;

}
</style>
