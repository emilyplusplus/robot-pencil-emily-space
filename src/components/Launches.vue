<template>
  <div id="launches-table">
    <h1>SpaceX Launches</h1>
    <div id="launches-header">
    <input type="button" value="Refresh" />
    </div>
    <div v-bind:key="launch.flight_number" v-for="launch in launches" class="launches-row">
      <div class="patch"><img height="32" :src="(launch.links.mission_patch_small != null) ? launch.links.mission_patch_small : '../assets/placeholder.png'" /></div>
      <div>{{launch.rocket.rocket_name}}</div>
      <div>{{launch.rocket.rocket_type}}</div>
      <div>{{new Date(launch.launch_date_unix*1000).getMonth()+1 + '/' + new Date(launch.launch_date_unix*1000).getDate() + '/' + new Date(launch.launch_date_unix*1000).getFullYear()}}</div>
      <div class='details'>{{launch.details}}</div>
      <div>{{launch.flight_number}}</div>
      <div><a target="_blank" :href=launch.links.article_link ><img height='16' src='../assets/link.svg' /></a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Launches',
  async created () {
    // check to see if we're runnning on Heroku or local dev machine
    let devPrefix = (process.env.prod === 'true') ? '' : 'http://localhost:5000'

    fetch(devPrefix + '/api/all').then(raw => {
      return raw.json()
    }).then(data => {
      // console.log(data)
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
  flex: 0.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.launches-row div.patch img {
  display: block;
  margin: 15px auto 0 auto;
}

.launches-row div.details {
  flex: 0.4;
  padding: 0 40px;
}
</style>
