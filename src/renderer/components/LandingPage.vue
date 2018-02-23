<template>
  <audio-player :html5="true" :sources="audioSources"></audio-player>
</template>

<script>
  import AudioPlayer from './AudioPlayer.vue';

  export default {
    name: 'landing-page',
    components: { AudioPlayer },
    beforeMount() {
      this.$http
        .post('https://soundpump.net/download', {
          uri: 'https://soundcloud.com/ahmed_abo_elmakarem/hq-cairokee-elnsheed',
        })
        .then(({ data: { downloadUrl: url } }) => {
          this.$electron.ipcRenderer.send('download', url);
        });

      this.$electron.ipcRenderer.on('data', console.log);
      this.$electron.ipcRenderer.on('downloaded', console.dir);
    },
    data() {
      return {
        audioSources: [
          'static/main.mp3',
        ],
      };
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
</style>
