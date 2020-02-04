<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: url('./assets/background.jpg');
  background-attachment: fixed;
  background-position: center;
}

#app {
  width: 80%;
  max-width: 1200px;
  margin: auto;
}
</style>
