<template>
  <div id="launches-table">
    <h1>SpaceX Launches</h1>
    <div id="launches-header">
      <div id="actions">
        <a v-on:click.stop="refresh" href="#"><img src="../assets/refresh.svg" /></a>
        <div id="filters">
        <input id="success" class="checkbox" v-model="landSuccess" type="checkbox" />
        <label for="success">Land Success</label>
        <input id="recycle" class="checkbox" v-model="reUsed" type="checkbox" />
        <label for="recycle">Reused</label>
        <input id="reddit" class="checkbox" v-model="withReddit" type="checkbox" />
        <label for="reddit">With Reddit</label>
        </div>
      </div>
      <div id="colNames">
        <div class="badgeHeader"><span>Badge</span></div>
        <div><span>Rocket Name</span></div>
        <div><span>Rocket Type</span></div>
        <div><span>Launch Date</span></div>
        <div class="details"><span>Details; More info on hover...</span></div>
        <div><span>ID</span></div>
        <div><span>Article</span></div>
      </div>
    </div>
    <div v-bind:key="launch.flight_number" v-for="launch in launches" class="launches-row">
      <div class="patch"><img height="32" :src="(launch.links.mission_patch_small != null) ? launch.links.mission_patch_small : '../assets/placeholder.png'" /></div>
      <div>{{launch.rocket.rocket_name}}</div>
      <div>{{launch.rocket.rocket_type}}</div>
      <div>{{new Date(launch.launch_date_unix*1000).getMonth()+1 + '/' + new Date(launch.launch_date_unix*1000).getDate() + '/' + new Date(launch.launch_date_unix*1000).getFullYear()}}</div>
      <div :title=launch.details class='details'>{{launch.details}}</div>
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
    let devPrefix = ''

    fetch(devPrefix + '/api/all').then(raw => {
      return raw.json()
    }).then(data => {
      // console.log(data)
      this.launches = data
    })
  },
  data () {
    return {
      launches: [],
      landSuccess: false,
      reUsed: false,
      withReddit: false
    }
  },
  methods: {
    refresh: function () {
      // check to see if we're runnning on Heroku or local dev machine
      let devPrefix = ''

      fetch(devPrefix + '/api/filtered?landSuccess=' + this.landSuccess + '&reUsed=' + this.reUsed + '&withReddit=' + this.withReddit).then(raw => {
        return raw.json()
      }).then(data => {
        console.log('refreshed')
        this.launches = data
      })
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

label {
  cursor: pointer;
  display: inline-block;
  position: relative;
  padding-left: 25px; /* 10 px padding right + 15px input type*/
  margin-right: 10px; /* margin between inputs types */
}

.checkbox {  
  display: none;  
}

label:before {
  content: "";
  width: 15px;
  height: 15px;
  position: absolute;  
  left: 0;
  border: 2px solid #ddd;
  margin-top: 2px;
}

.checkbox:checked + label:before {  
  background: url('../assets/checkmark.svg') left center no-repeat;  
} 

#launches-table {
  min-width: 700px;
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
  background: #ffffff33;
  border: #ddd solid 1px;
  border-radius: 5px;
  height: 160px;
  position: relative;
}

#actions {
  color: #fff;
}

#actions a {
  display: block;
  float: left;
  margin: 20px 0 0 20px;
  border: 2px solid #fff;
  border-radius: 99px;
  width: 36px;
  height:36px;
  transition: all 0.2s ease;
}

#actions a:hover {
  transform: rotate(60deg);
}

#filters {
  float: right;
  margin: 30px 20px 0 0;
  font-size: 1.1em;
  text-transform: uppercase;
}

#colNames {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #ffffffdd;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
}

#colNames div {
  flex: 0.1;
}

#colNames div span {
  font-weight: bold;
}

#colNames div.details {
  flex: 0.4;
  padding: 0 40px;
}

.badgeHeader {
  text-align: center;
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
