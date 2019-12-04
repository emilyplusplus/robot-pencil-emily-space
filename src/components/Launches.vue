<template>
  <div id="launches-table">
    <h1>SpaceX Launches</h1>
    <div id="launches-header">
    <input type="button" value="Refresh" />
    </div>
    <div v-for="launch in launches" class="launches-row">
      {{launch.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Launches',
  data () {
    return {
      launches: [{'name': 'test1'},{'name': 'test2'}]
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Geomanist Regular';
  src: url('../assets/fonts/geomanist-regular-webfont.ttf'), url('../assets/fonts/geomanist-regular-webfont.eot'), url('../assets/fonts/geomanist-regular-webfont.svg'), url('../assets/fonts/geomanist-regular-webfont.woff'), url('../assets/fonts/geomanist-regular-webfont.woff2');
}

* {
  font-family: 'Geomanist Regular', sans-serif;
}

#launches-table {
  overflow: hidden;
}

h1 {
  text-align: center;
  font-weight: 300;
  font-size: 3em;
  word-spacing: 0.3em;
  letter-spacing: 0.1em;
}

#launches-header {
  margin-bottom: 20px;
}

.launches-row {
  margin-bottom: 20px;
}
</style>
