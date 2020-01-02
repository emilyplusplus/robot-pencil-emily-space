<template>
  <div id="launches-table">
    <h1>SpaceX Launches</h1>
    <div id="launches-header">
    <input type="button" value="Refresh" />
    </div>
    <div v-for="launch in launches" class="launches-row">
      <div><img height="64" src='../assets/placeholder.png' /></div>
      <div>{{launch.rocket.rocket_name}}</div>
      <div>{{launch.rocket.rocket_type}}</div>
      <div>{{launch.launch_date_unix}}</div>
      <div>{{launch.details}}</div>
      <div>{{launch.flight_number}}</div>
      <div><a :href=launch.links.article_link ><img height='16' src='../assets/link.svg' /></a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Launches',
  async created() {
    fetch('/api/all').then(raw => {
      return raw.json()
    }).then(data => {
      //console.log(data)
      this.launches = data
    })
  },
  data () {
    return {
      launches: []
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
  color: #fff;
}

#launches-header {
  margin-bottom: 20px;
}

.launches-row {
  padding: 0;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #ffffffcc;
  height: 68px;
  line-height: 68px;
  display: flex;
  flex-direction: row;
}

.launches-row div {
  flex: 0.14;
}
</style>
